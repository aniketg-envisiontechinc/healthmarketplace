// src/ai/flows/suggest-healthy-alternative.ts
'use server';

/**
 * @fileOverview Suggests healthier alternatives for a given food item.
 *
 * - suggestHealthyAlternative - A function that suggests healthier alternatives.
 * - SuggestHealthyAlternativeInput - The input type for the suggestHealthyAlternative function.
 * - SuggestHealthyAlternativeOutput - The return type for the suggestHealthyAlternative function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';
import {getNutrition, Nutrition} from '@/services/nutritionix';

const SuggestHealthyAlternativeInputSchema = z.object({
  foodName: z.string().describe('The name of the food item to find alternatives for.'),
});
export type SuggestHealthyAlternativeInput = z.infer<
  typeof SuggestHealthyAlternativeInputSchema
>;

const SuggestHealthyAlternativeOutputSchema = z.object({
  alternatives: z
    .array(z.string())
    .describe('A list of healthier alternatives for the food item.'),
  nutrition: z.record(z.string(), z.number()).describe('Nutritional information for the original food item.'),
});
export type SuggestHealthyAlternativeOutput = z.infer<
  typeof SuggestHealthyAlternativeOutputSchema
>;

export async function suggestHealthyAlternative(
  input: SuggestHealthyAlternativeInput
): Promise<SuggestHealthyAlternativeOutput> {
  return suggestHealthyAlternativeFlow(input);
}

const suggestHealthyAlternativePrompt = ai.definePrompt({
  name: 'suggestHealthyAlternativePrompt',
  input: {
    schema: z.object({
      foodName: z.string().describe('The name of the food item.'),
      nutritionInfo: z
        .record(z.string(), z.number())
        .describe('Nutritional information for the food item.'),
    }),
  },
  output: {
    schema: z.object({
      alternatives: z
        .array(z.string())
        .describe('A list of healthier alternatives for the food item.'),
    }),
  },
  prompt: `Suggest healthier alternatives for {{foodName}}. Consider its nutritional values:

  {{#each nutritionInfo}}
    {{@key}}: {{this}}
  {{/each}}

  Return a list of alternative food items that are healthier and have similar taste profiles.
  `,
});

const suggestHealthyAlternativeFlow = ai.defineFlow<
  typeof SuggestHealthyAlternativeInputSchema,
  typeof SuggestHealthyAlternativeOutputSchema
>({
  name: 'suggestHealthyAlternativeFlow',
  inputSchema: SuggestHealthyAlternativeInputSchema,
  outputSchema: SuggestHealthyAlternativeOutputSchema,
},
async input => {
  const nutrition = await getNutrition(input.foodName);
  const nutritionInfo: Record<string, number> = {
    calories: nutrition.calories,
    protein: nutrition.protein,
    carbohydrates: nutrition.carbohydrates,
    fat: nutrition.fat,
  };
  const {output} = await suggestHealthyAlternativePrompt({
    foodName: input.foodName,
    nutritionInfo,
  });
  return {
    alternatives: output!.alternatives,
    nutrition: nutritionInfo,
  };
});
