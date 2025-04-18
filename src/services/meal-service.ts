import { format, startOfDay, endOfDay } from "date-fns";

export interface Meal {
  id: string;
  name: string;
  description: string;
  date: string;
  foodItems: {
    name: string;
    portionSize: string;
    nutrition: {
      calories: number;
      protein: number;
      carbohydrates: number;
      fat: number;
    };
    confidence: number;
  }[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  imageUrl?: string;
}

export interface DailyNutrition {
  date: string;
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  meals: Meal[];
}

class MealService {
  private readonly STORAGE_KEY = "meals";
  private readonly MAX_MEALS = 50; // Reduced limit
  private readonly MAX_RETRIES = 3;

  private compressMeal(meal: Meal): any {
    return {
      i: meal.id,
      n: meal.name,
      d: meal.date,
      desc: meal.description,
      f: meal.foodItems.map((item) => ({
        n: item.name,
        p: item.portionSize,
        c: item.confidence,
        v: [
          item.nutrition.calories,
          item.nutrition.protein,
          item.nutrition.carbohydrates,
          item.nutrition.fat,
        ],
      })),
      t: [
        meal.totalCalories,
        meal.totalProtein,
        meal.totalCarbs,
        meal.totalFat,
      ],
    };
  }

  private decompressMeal(compressed: any): Meal {
    return {
      id: compressed.i,
      name: compressed.n,
      date: compressed.d,
      description: compressed.desc,
      foodItems: compressed.f.map((item: any) => ({
        name: item.n,
        portionSize: item.p,
        confidence: item.c,
        nutrition: {
          calories: item.v[0],
          protein: item.v[1],
          carbohydrates: item.v[2],
          fat: item.v[3],
        },
      })),
      totalCalories: compressed.t[0],
      totalProtein: compressed.t[1],
      totalCarbs: compressed.t[2],
      totalFat: compressed.t[3],
    };
  }

  saveMeal(meal: Omit<Meal, "id">): Meal {
    const meals = this.getAllMeals();
    const newMeal: Meal = {
      ...meal,
      id: crypto.randomUUID(),
    };

    // Add new meal
    meals.push(newMeal);

    // Sort meals by date (newest first)
    meals.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );

    let currentLimit = this.MAX_MEALS;
    let retryCount = 0;

    while (retryCount < this.MAX_RETRIES) {
      try {
        // Keep only the most recent meals
        const trimmedMeals = meals.slice(0, currentLimit);
        const compressedMeals = trimmedMeals.map((meal) =>
          this.compressMeal(meal),
        );
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(compressedMeals));
        return newMeal;
      } catch (error) {
        if (
          error instanceof DOMException &&
          error.name === "QuotaExceededError"
        ) {
          retryCount++;
          currentLimit = Math.floor(currentLimit / 2);
          if (currentLimit < 10) {
            throw new Error("Storage quota exceeded even with minimal data");
          }
        } else {
          throw error;
        }
      }
    }

    throw new Error("Failed to save meal after multiple attempts");
  }

  getAllMeals(): Meal[] {
    const mealsJson = localStorage.getItem(this.STORAGE_KEY);
    if (!mealsJson) return [];

    try {
      const compressedMeals = JSON.parse(mealsJson);
      return compressedMeals.map((compressed: any) =>
        this.decompressMeal(compressed),
      );
    } catch (error) {
      console.error("Error parsing meals:", error);
      return [];
    }
  }

  getMealById(id: string): Meal | undefined {
    return this.getAllMeals().find((meal) => meal.id === id);
  }

  getMealsByDate(date: Date): Meal[] {
    const start = startOfDay(date);
    const end = endOfDay(date);
    return this.getAllMeals().filter((meal) => {
      const mealDate = new Date(meal.date);
      return mealDate >= start && mealDate <= end;
    });
  }

  getDailyNutrition(date: Date): DailyNutrition {
    const meals = this.getMealsByDate(date);
    const totals = meals.reduce(
      (acc, meal) => ({
        totalCalories: acc.totalCalories + meal.totalCalories,
        totalProtein: acc.totalProtein + meal.totalProtein,
        totalCarbs: acc.totalCarbs + meal.totalCarbs,
        totalFat: acc.totalFat + meal.totalFat,
      }),
      {
        totalCalories: 0,
        totalProtein: 0,
        totalCarbs: 0,
        totalFat: 0,
      },
    );

    return {
      date: format(date, "yyyy-MM-dd"),
      ...totals,
      meals,
    };
  }

  getNutritionSummary(startDate: Date, endDate: Date): DailyNutrition[] {
    const allMeals = this.getAllMeals();
    const summary: { [date: string]: DailyNutrition } = {};

    allMeals.forEach((meal) => {
      const mealDate = new Date(meal.date);
      if (mealDate >= startDate && mealDate <= endDate) {
        const dateKey = format(mealDate, "yyyy-MM-dd");
        if (!summary[dateKey]) {
          summary[dateKey] = {
            date: dateKey,
            totalCalories: 0,
            totalProtein: 0,
            totalCarbs: 0,
            totalFat: 0,
            meals: [],
          };
        }

        summary[dateKey].totalCalories += meal.totalCalories;
        summary[dateKey].totalProtein += meal.totalProtein;
        summary[dateKey].totalCarbs += meal.totalCarbs;
        summary[dateKey].totalFat += meal.totalFat;
        summary[dateKey].meals.push(meal);
      }
    });

    return Object.values(summary).sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
  }
}

export const mealService = new MealService();
