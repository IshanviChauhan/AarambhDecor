
'use server';
/**
 * @fileOverview AI-powered product recommendations based on an uploaded image of a user's space
 * and a list of available products.
 *
 * - recommendProductsFromImage - A function that recommends products.
 * - RecommendProductsFromImageInput - The input type for the function.
 * - RecommendProductsFromImageOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Define a schema for simplified product information to be passed to the AI
const SimplifiedProductInfoSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  category: z.string().optional(),
});

const RecommendProductsFromImageInputSchema = z.object({
  imageDataUri: z
    .string()
    .describe(
      "A photo of the user's space, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  availableProductsJson: z
    .string()
    .describe(
      'A JSON string representing an array of available products. Each product object should include at least id, name, and description.'
    ),
});
export type RecommendProductsFromImageInput = z.infer<
  typeof RecommendProductsFromImageInputSchema
>;

const RecommendedProductSchema = z.object({
  productId: z.string().describe('The ID of the recommended product.'),
  productName: z.string().describe('The name of the recommended product.'),
  reason: z
    .string()
    .describe('A brief explanation why this product is a good fit for the space in the image.'),
});

const RecommendProductsFromImageOutputSchema = z.object({
  recommendations: z
    .array(RecommendedProductSchema)
    .describe('A list of recommended products with reasons.'),
  overallFeedback: z.string().optional().describe('General feedback or observations about the space in the image, if any.')
});
export type RecommendProductsFromImageOutput = z.infer<
  typeof RecommendProductsFromImageOutputSchema
>;
export type RecommendedProduct = z.infer<typeof RecommendedProductSchema>;


export async function recommendProductsFromImage(
  input: RecommendProductsFromImageInput
): Promise<RecommendProductsFromImageOutput> {
  return recommendProductsFromImageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendProductsFromImagePrompt',
  input: {schema: RecommendProductsFromImageInputSchema},
  output: {schema: RecommendProductsFromImageOutputSchema},
  prompt: `You are an expert interior design consultant for 'Aarambh Decor', specializing in home decor.
A user has uploaded an image of a space they wish to decorate. Your task is to analyze this image:
User's Space: {{media url=imageDataUri}}

Based on the style, colors, lighting, existing elements, and overall ambiance in the image, recommend up to 3-5 products from the following list that would complement or enhance the space. For each recommended product, provide a concise reason (1-2 sentences) why it's a good fit.

Available Aarambh Decor products (JSON format):
{{{availableProductsJson}}}

Focus on how the products would visually and stylistically integrate into the user's uploaded image.
If the image is unclear or not a room, state that you cannot provide recommendations based on the image.
Provide some brief overall feedback or observations about the user's space if you have any, separate from the product recommendations.
Return your recommendations as a list of objects, each containing 'productId', 'productName', and 'reason'.
Ensure 'productId' and 'productName' exactly match the provided product list.
`,
});

const recommendProductsFromImageFlow = ai.defineFlow(
  {
    name: 'recommendProductsFromImageFlow',
    inputSchema: RecommendProductsFromImageInputSchema,
    outputSchema: RecommendProductsFromImageOutputSchema,
  },
  async input => {
    try {
      JSON.parse(input.availableProductsJson); // Validate JSON
    } catch (e) {
      throw new Error("Invalid JSON format for availableProductsJson.");
    }
    const {output} = await prompt(input);
    if (!output) {
        throw new Error("AI failed to generate recommendations.");
    }
    return output;
  }
);
