"use server";

/**
 * @fileOverview Refines nutritional data using Gemini to correct any anomalies, comparing with typical values.
 *
 * - refineNutritionData - A function that refines nutritional data.
 * - RefineNutritionDataInput - The input type for the refineNutritionData function.
 * - RefineNutritionDataOutput - The return type for the refineNutritionData function.
 */

import { ai } from "@/ai/ai-instance";
import { z } from "genkit";

const RefineNutritionDataInputSchema = z.object({
  foodName: z.string().describe("The name of the food item."),
  calories: z.number().describe("The calorie count of the food item."),
  protein: z.number().describe("The protein content of the food item."),
  carbohydrates: z
    .number()
    .describe("The carbohydrate content of the food item."),
  fat: z.number().describe("The fat content of the food item."),
});
export type RefineNutritionDataInput = z.infer<
  typeof RefineNutritionDataInputSchema
>;

const RefineNutritionDataOutputSchema = z.object({
  refinedCalories: z
    .number()
    .describe("The refined calorie count of the food item."),
  refinedProtein: z
    .number()
    .describe("The refined protein content of the food item."),
  refinedCarbohydrates: z
    .number()
    .describe("The refined carbohydrate content of the food item."),
  refinedFat: z.number().describe("The refined fat content of the food item."),
});
export type RefineNutritionDataOutput = z.infer<
  typeof RefineNutritionDataOutputSchema
>;

export async function refineNutritionData(
  input: RefineNutritionDataInput,
): Promise<RefineNutritionDataOutput> {
  return refineNutritionDataFlow(input);
}

const refineNutritionDataPrompt = ai.definePrompt({
  name: "refineNutritionDataPrompt",
  input: {
    schema: z.object({
      foodName: z.string().describe("The name of the food item."),
      calories: z.number().describe("The calorie count of the food item."),
      protein: z.number().describe("The protein content of the food item."),
      carbohydrates: z
        .number()
        .describe("The carbohydrate content of the food item."),
      fat: z.number().describe("The fat content of the food item."),
    }),
  },
  output: {
    schema: z.object({
      refinedCalories: z
        .number()
        .describe("The refined calorie count of the food item."),
      refinedProtein: z
        .number()
        .describe("The refined protein content of the food item."),
      refinedCarbohydrates: z
        .number()
        .describe("The refined carbohydrate content of the food item."),
      refinedFat: z
        .number()
        .describe("The refined fat content of the food item."),
    }),
  },
  prompt: `You are an expert nutritionist. You will be given the name of a food item and its nutritional information.
You will use your expertise to refine the nutritional information, ensuring that the calorie count is accurate and consistent with the other nutritional values.

The nutritional values you've provided for the dishes differ significantly from standard nutritional data. It's important to note that actual nutritional content can vary based on specific recipes, ingredients used, and preparation methods. Here is a guide.

If the calorie count is excessively higher then the average value, the food item may be deep fried or contains high fat content or is a high calorie density food.
If the calorie count is excessively lower then the average value, the food item may be misidentified or is a very low calorie density food.

You will adjust the calorie count so that it makes more sense based on the description and if there are errors - please refine it. You will output the new calorie count based on these inputs.
Also you will output the new protein content based on these inputs.
Also you will output the new carbohydrate content based on these inputs.
Also you will output the new fat content based on these inputs.

Do not make drastic changes to the individual values, and only adjust it to what the average normal range should be.
Food Item: {{foodName}}
Calories: {{calories}}
Protein: {{protein}}
Carbohydrates: {{carbohydrates}}
Fat: {{fat}}

Return a JSON object with the following keys and values:
"refinedCalories": refined calorie count of the food item, must be a number
"refinedProtein": refined protein content of the food item, must be a number
"refinedCarbohydrates": refined carbohydrate content of the food item, must be a number
"refinedFat": refined fat content of the food item, must be a number`,
});

const refineNutritionDataFlow = ai.defineFlow<
  typeof RefineNutritionDataInputSchema,
  typeof RefineNutritionDataOutputSchema
>(
  {
    name: "refineNutritionDataFlow",
    inputSchema: RefineNutritionDataInputSchema,
    outputSchema: RefineNutritionDataOutputSchema,
  },
  async (input) => {
    const { output } = await refineNutritionDataPrompt(input);
    return {
      refinedCalories: output!.refinedCalories,
      refinedProtein: output!.refinedProtein,
      refinedCarbohydrates: output!.refinedCarbohydrates,
      refinedFat: output!.refinedFat,
    };
  },
);
