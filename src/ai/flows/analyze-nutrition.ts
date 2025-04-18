"use server";

import { ai } from "@/ai/ai-instance";
import { z } from "genkit";

const AnalyzeNutritionInputSchema = z.object({
  foodName: z.string().describe("The name of the food item."),
  portionSize: z.string().describe("The portion size of the food item."),
});
export type AnalyzeNutritionInput = z.infer<typeof AnalyzeNutritionInputSchema>;

const AnalyzeNutritionOutputSchema = z.object({
  calories: z.number().describe("The calorie count of the food item."),
  protein: z
    .number()
    .describe("The protein content of the food item in grams."),
  carbohydrates: z
    .number()
    .describe("The carbohydrate content of the food item in grams."),
  fat: z.number().describe("The fat content of the food item in grams."),
  confidence: z
    .number()
    .describe("The confidence level of the analysis (0-1)."),
});
export type AnalyzeNutritionOutput = z.infer<
  typeof AnalyzeNutritionOutputSchema
>;

export async function analyzeNutrition(
  input: AnalyzeNutritionInput,
): Promise<AnalyzeNutritionOutput> {
  return analyzeNutritionFlow(input);
}

const analyzeNutritionPrompt = ai.definePrompt({
  name: "analyzeNutritionPrompt",
  input: {
    schema: z.object({
      foodName: z.string().describe("The name of the food item."),
      portionSize: z.string().describe("The portion size of the food item."),
    }),
  },
  output: {
    schema: z.object({
      calories: z.number().describe("The calorie count of the food item."),
      protein: z
        .number()
        .describe("The protein content of the food item in grams."),
      carbohydrates: z
        .number()
        .describe("The carbohydrate content of the food item in grams."),
      fat: z.number().describe("The fat content of the food item in grams."),
      confidence: z
        .number()
        .describe("The confidence level of the analysis (0-1)."),
    }),
  },
  prompt: `You are an expert nutritionist and food scientist. Your task is to analyze the nutritional content of a food item based on its name and portion size.

For the given food item, provide accurate nutritional information including:
1. Total calories
2. Protein content in grams
3. Carbohydrate content in grams
4. Fat content in grams
5. Confidence level in your analysis (0-1)

Consider the following factors:
- Common preparation methods
- Typical ingredients and their proportions
- Cooking methods and their impact on nutrition
- Standard portion sizes and their variations
- Regional variations in recipes
- Common additives or condiments

Food Item: {{foodName}}
Portion Size: {{portionSize}}

Provide your analysis in a JSON format with the following structure:
{
  "calories": number,
  "protein": number,
  "carbohydrates": number,
  "fat": number,
  "confidence": number
}

Ensure that:
1. All values are realistic and consistent with known nutritional data
2. The calorie count aligns with the macronutrient values (1g protein = 4 calories, 1g carbs = 4 calories, 1g fat = 9 calories)
3. The confidence level reflects your certainty about the analysis
4. Values are provided per the specified portion size`,
});

const analyzeNutritionFlow = ai.defineFlow<
  typeof AnalyzeNutritionInputSchema,
  typeof AnalyzeNutritionOutputSchema
>(
  {
    name: "analyzeNutritionFlow",
    inputSchema: AnalyzeNutritionInputSchema,
    outputSchema: AnalyzeNutritionOutputSchema,
  },
  async (input) => {
    const { output } = await analyzeNutritionPrompt(input);
    return {
      calories: output!.calories,
      protein: output!.protein,
      carbohydrates: output!.carbohydrates,
      fat: output!.fat,
      confidence: output!.confidence,
    };
  },
);
