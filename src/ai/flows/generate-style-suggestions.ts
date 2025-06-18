
'use server';

/**
 * @fileOverview This file is DEPRECATED and no longer used.
 * The AI style suggestion functionality has been replaced by an image-based product recommender.
 * See recommend-products-from-image-flow.ts for the new implementation.
 * This file can be safely deleted.
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
  console.warn("generateStyleSuggestionsFlow is DEPRECATED and should not be used. It will return a static message.");
  return { styleSuggestions: "This feature is deprecated and no longer available. Please use the image-based product recommender on the homepage." };
}

// Define a dummy prompt and flow to avoid errors if something still tries to import/call them,
// but they will effectively do nothing useful.
const prompt = ai.definePrompt({
  name: 'deprecatedGenerateStyleSuggestionsPrompt',
  input: {schema: GenerateStyleSuggestionsInputSchema},
  output: {schema: GenerateStyleSuggestionsOutputSchema},
  prompt: `This prompt is deprecated and should not be used.`,
});

const generateStyleSuggestionsFlow = ai.defineFlow(
  {
    name: 'deprecatedGenerateStyleSuggestionsFlow',
    inputSchema: GenerateStyleSuggestionsInputSchema,
    outputSchema: GenerateStyleSuggestionsOutputSchema,
  },
  async input => {
    return { styleSuggestions: "This feature is deprecated. Please use the image-based AI advisor on the homepage." };
  }
);
