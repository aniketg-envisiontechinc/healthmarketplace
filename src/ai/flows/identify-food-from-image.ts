"use server";
/**
 * @fileOverview Identifies food items from an image, estimates portion sizes, and provides nutritional information for each, refining the values with Gemini.
 *
 * - identifyFoodFromImage - A function that handles the food identification process.
 * - IdentifyFoodFromImageInput - The input type for the identifyFoodFromImage function.
 * - IdentifyFoodFromImageOutput - The return type for the identifyFoodFromImage function.
 */

import { ai } from "@/ai/ai-instance";
import { z } from "genkit";
import { getNutrition } from "@/services/openfoodfacts";
import { refineNutritionData } from "@/ai/flows/refine-nutrition-data";

const IdentifyFoodFromImageInputSchema = z.object({
  photoUrl: z.string().describe("The URL of the food image."),
});
export type IdentifyFoodFromImageInput = z.infer<
  typeof IdentifyFoodFromImageInputSchema
>;

const FoodItemSchema = z.object({
  name: z.string().describe("The identified food item name."),
  portionSize: z.string().describe("Estimated portion size of the food item."),
  nutrition: z
    .optional(z.any())
    .describe("Nutritional information for the identified food item."),
});

const IdentifyFoodFromImageOutputSchema = z.object({
  foodItems: z
    .array(FoodItemSchema)
    .describe(
      "A list of identified food items with their portion sizes and nutritional information.",
    ),
});
export type IdentifyFoodFromImageOutput = z.infer<
  typeof IdentifyFoodFromImageOutputSchema
>;

export async function identifyFoodFromImage(
  input: IdentifyFoodFromImageInput,
): Promise<IdentifyFoodFromImageOutput> {
  return identifyFoodFromImageFlow(input);
}

const identifyFoodPrompt = ai.definePrompt({
  name: "identifyFoodPrompt",
  input: {
    schema: z.object({
      photoUrl: z.string().describe("The URL of the food image."),
    }),
  },
  output: {
    schema: z.object({
      foodItems: z
        .array(
          z.object({
            name: z.string().describe("The identified food item name."),
            portionSize: z
              .string()
              .describe(
                'Estimated portion size of the food item (e.g., "1 cup", "1 slice", "100g").',
              ),
          }),
        )
        .describe(
          "A list of identified food items with estimated portion sizes.",
        ),
    }),
  },
  prompt: `You are an expert food identifier and nutritionist. Based on the image provided, identify each food item in the image and estimate its portion size. Provide the food name and portion size for each item. Be as comprehensive as possible.

Image: {{media url=photoUrl}}

Return the output as a JSON array of objects, where each object has a "name" and a "portionSize" field.`,
});

const identifyFoodFromImageFlow = ai.defineFlow<
  typeof IdentifyFoodFromImageInputSchema,
  typeof IdentifyFoodFromImageOutputSchema
>(
  {
    name: "identifyFoodFromImageFlow",
    inputSchema: IdentifyFoodFromImageInputSchema,
    outputSchema: IdentifyFoodFromImageOutputSchema,
  },
  async (input) => {
    const { output } = await identifyFoodPrompt(input);
    const foodItems = output!.foodItems;

    const foodItemsWithNutrition = await Promise.all(
      foodItems.map(async (item) => {
        try {
          const nutrition = await getNutrition(item.name);

          const refinedNutrition = await refineNutritionData({
            foodName: item.name,
            calories: nutrition.calories,
            protein: nutrition.protein,
            carbohydrates: nutrition.carbohydrates,
            fat: nutrition.fat,
          });

          return {
            name: item.name,
            portionSize: item.portionSize,
            nutrition: {
              calories: refinedNutrition.refinedCalories,
              protein: refinedNutrition.refinedProtein,
              carbohydrates: refinedNutrition.refinedCarbohydrates,
              fat: refinedNutrition.refinedFat,
            },
          };
        } catch (e) {
          console.error(`Failed to get nutrition info for ${item.name}: ${e}`);
          return {
            name: item.name,
            portionSize: item.portionSize,
            nutrition: null,
          };
        }
      }),
    );

    return {
      foodItems: foodItemsWithNutrition,
    };
  },
);
