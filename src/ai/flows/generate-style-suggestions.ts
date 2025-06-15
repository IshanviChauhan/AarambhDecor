
'use server';

/**
 * @fileOverview This file is deprecated and no longer used.
 * The AI style suggestion functionality has been replaced by an image-based product recommender.
 * See recommend-products-from-image-flow.ts for the new implementation.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateStyleSuggestionsInputSchema = z.object({
  productDetails: z
    .string()
    .describe('Details of the showcased Aarambh Decor products.'),
});
export type GenerateStyleSuggestionsInput = z.infer<
  typeof GenerateStyleSuggestionsInputSchema
>;

const GenerateStyleSuggestionsOutputSchema = z.object({
  styleSuggestions: z
    .string()
    .describe(
      'AI-powered decor style suggestions based on the showcased products.'
    ),
});
export type GenerateStyleSuggestionsOutput = z.infer<
  typeof GenerateStyleSuggestionsOutputSchema
>;

export async function generateStyleSuggestions(
  input: GenerateStyleSuggestionsInput
): Promise<GenerateStyleSuggestionsOutput> {
  // This flow is deprecated.
  // Consider removing calls to this function or updating them to the new flow.
  console.warn("generateStyleSuggestionsFlow is deprecated and should not be used.");
  return { styleSuggestions: "This feature is no longer available. Please use the image-based product recommender." };
}

const prompt = ai.definePrompt({
  name: 'generateStyleSuggestionsPrompt',
  input: {schema: GenerateStyleSuggestionsInputSchema},
  output: {schema: GenerateStyleSuggestionsOutputSchema},
  prompt: `This prompt is deprecated.`,
});

const generateStyleSuggestionsFlow = ai.defineFlow(
  {
    name: 'generateStyleSuggestionsFlow',
    inputSchema: GenerateStyleSuggestionsInputSchema,
    outputSchema: GenerateStyleSuggestionsOutputSchema,
  },
  async input => {
    // const {output} = await prompt(input);
    // return output!;
    return { styleSuggestions: "This feature is no longer available." };
  }
);
