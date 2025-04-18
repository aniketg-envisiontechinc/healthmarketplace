'use client';

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { mealService } from "@/services/meal-service";
import { useEffect, useState } from "react";
import { Meal } from "@/services/meal-service";

export function AnalysisClient({ id }: { id: string }) {
  const router = useRouter();
  const [meal, setMeal] = useState<Meal | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMeal = async () => {
      try {
        const loadedMeal = await mealService.getMealById(id);
        if (!loadedMeal) {
          router.push('/dashboard');
          return;
        }
        setMeal(loadedMeal);
      } catch (error) {
        console.error('Error loading meal:', error);
        router.push('/dashboard');
      } finally {
        setLoading(false);
      }
    };

    loadMeal();
  }, [id, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!meal) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-start min-h-screen py-4 gap-4">
      <h1 className="text-4xl font-bold mb-2">Meal Analysis</h1>

      <Card className="w-full max-w-md p-4">
        <CardHeader>
          <CardTitle>{meal.name}</CardTitle>
          <CardDescription>{meal.description}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="space-y-2">
            <h3 className="font-semibold">Nutrition Summary</h3>
            <p>Total Calories: {meal.totalCalories}</p>
            <p>Protein: {meal.totalProtein}g</p>
            <p>Carbohydrates: {meal.totalCarbs}g</p>
            <p>Fat: {meal.totalFat}g</p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Food Items</h3>
            {meal.foodItems.map((item, index) => (
              <div key={index} className="border p-2 rounded">
                <p className="font-medium">{item.name}</p>
                <p>Portion: {item.portionSize}</p>
                <div className="text-sm text-gray-600">
                  <p>Calories: {item.nutrition.calories}</p>
                  <p>Protein: {item.nutrition.protein}g</p>
                  <p>Carbs: {item.nutrition.carbohydrates}g</p>
                  <p>Fat: {item.nutrition.fat}g</p>
                </div>
              </div>
            ))}
          </div>

          <Button onClick={() => router.push('/dashboard')}>Back to Dashboard</Button>
        </CardContent>
      </Card>
    </div>
  );
} 