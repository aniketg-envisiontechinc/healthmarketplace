/**
 * Asynchronously retrieves nutritional information for a given food item name using the Open Food Facts API.
 *
 * @param foodName The name of the food item to retrieve nutritional information for.
 * @returns A promise that resolves to a Nutrition object containing calorie and macro information.
 */
export async function getNutrition(foodName: string): Promise<Nutrition> {
  try {
    const encodedSearchTerm = encodeURIComponent(foodName);
    const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodedSearchTerm}&fields=product_name,nutriments&json=1&page_size=1`;

    const response = await fetch(url);

    if (!response.ok) {
      console.error(
        "Error fetching nutrition data from Open Food Facts:",
        response.status,
        response.statusText,
      );
      return {
        calories: 0,
        protein: 0,
        carbohydrates: 0,
        fat: 0,
      };
    }

    const data = await response.json();

    if (data.products && data.products.length > 0) {
      const product = data.products[0];
      const nutriments = product.nutriments;

      // Use optional chaining to safely access nested properties
      const calories =
        nutriments["energy-kcal_100g"] !== undefined
          ? nutriments["energy-kcal_100g"]
          : 0;
      const protein =
        nutriments["proteins_100g"] !== undefined
          ? nutriments["proteins_100g"]
          : 0;
      const carbohydrates =
        nutriments["carbohydrates_100g"] !== undefined
          ? nutriments["carbohydrates_100g"]
          : 0;
      const fat =
        nutriments["fat_100g"] !== undefined ? nutriments["fat_100g"] : 0;

      return {
        calories: calories,
        protein: protein,
        carbohydrates: carbohydrates,
        fat: fat,
      };
    } else {
      console.warn(
        "No food data found for",
        foodName,
        "using Open Food Facts API",
      );
      return {
        calories: 0,
        protein: 0,
        carbohydrates: 0,
        fat: 0,
      };
    }
  } catch (error: any) {
    console.error(
      "Failed to fetch nutrition information from Open Food Facts:",
      error.message,
    );
    return {
      calories: 0,
      protein: 0,
      carbohydrates: 0,
      fat: 0,
    };
  }
}

export interface Nutrition {
  calories: number;
  protein: number;
  carbohydrates: number;
  fat: number;
}
