'use server';

/**
 * @fileOverview AI-powered decor style suggestions based on the showcased products.
 *
 * - generateStyleSuggestions - A function that generates decor style suggestions.
 * - GenerateStyleSuggestionsInput - The input type for the generateStyleSuggestions function.
 * - GenerateStyleSuggestionsOutput - The return type for the generateStyleSuggestions function.
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
  return generateStyleSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateStyleSuggestionsPrompt',
  input: {schema: GenerateStyleSuggestionsInputSchema},
  output: {schema: GenerateStyleSuggestionsOutputSchema},
  prompt: `You are an interior design expert specializing in Aarambh Decor products.

You will provide decor style suggestions based on the showcased products.

Product Details: {{{productDetails}}}`,
});

const generateStyleSuggestionsFlow = ai.defineFlow(
  {
    name: 'generateStyleSuggestionsFlow',
    inputSchema: GenerateStyleSuggestionsInputSchema,
    outputSchema: GenerateStyleSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
