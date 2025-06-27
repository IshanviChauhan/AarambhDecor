
import { z } from 'zod';

// UserProfileUpdateSchema, AddressSchema, SignUpSchemaWithAddress, SignInSchema are removed
// as authentication and user profiles are no longer part of the application.

// --- Product Form Schema (Remains active for /add-product page) ---
const ProductImageSchema = z.object({
  url: z.string().url({ message: "Invalid image URL." }),
  dataAiHint: z.string().max(50, { message: "AI hint too long." }).optional().or(z.literal('')),
});

export const ProductFormSchema = z.object({
  name: z.string().min(1, "Product name is required.").max(100, "Product name is too long."),
  description: z.string().min(1, "Description is required.").max(5000, "Description is too long."),
  careInstructions: z.string().max(1000, "Care instructions too long.").optional().or(z.literal('')),
  price: z.string().min(1, "Price is required.").regex(/^\s*Rs\.\s*\d+(\.\d{1,2})?\s*$/, { message: "Price must be in format 'Rs. 123.45'" }),
  category: z.string().min(1, "Category is required.").max(50, "Category name too long."),
  featured: z.boolean().optional(), 
  sizeAndDimensions: z.string().max(100, "Size/dimensions info too long.").optional().or(z.literal('')),
  material: z.string().max(100, "Material info too long.").optional().or(z.literal('')),
  imageUrls: z.array(ProductImageSchema).min(1, "At least one image is required."),
});

export type ProductFormInput = z.infer<typeof ProductFormSchema>;
