
import { z } from 'zod';

// Schema for updating user profile details
export const UserProfileUpdateSchema = z.object({
  userId: z.string().min(1, "User ID is required."), // Temporary for actions without proper session
  firstName: z.string().min(1, { message: 'First name cannot be empty.' }).max(50, { message: 'First name is too long.' }),
  lastName: z.string().min(1, { message: 'Last name cannot be empty.' }).max(50, { message: 'Last name is too long.' }),
  phoneNumber: z.string()
    .max(20, { message: 'Phone number must be 20 characters or less.' })
    .regex(/^$|^(\+?[1-9]\d{1,14})$/, { message: "Invalid phone number format. Should be empty or like +1234567890" })
    .optional().or(z.literal('')),
});
export type UserProfileUpdateInput = z.infer<typeof UserProfileUpdateSchema>;

// Schema for adding/editing a shipping address
export const AddressSchema = z.object({
  userId: z.string().min(1, "User ID is required."), // Temporary for actions without proper session
  addressId: z.string().optional(), // For updates
  fullName: z.string().min(1, 'Full name is required.').max(100, 'Full name is too long.'),
  street: z.string().min(1, 'Street address is required.').max(200, 'Street address is too long.'),
  city: z.string().min(1, 'City is required.').max(100, 'City name is too long.'),
  state: z.string().min(1, 'State/Province is required.').max(100, 'State/Province name is too long.'),
  postalCode: z.string().min(1, 'Postal code is required.').max(20, 'Postal code is too long.'),
  country: z.string().min(1, 'Country is required.').max(100, 'Country name is too long.'),
  phoneNumber: z.string().max(20, 'Phone number must be 20 characters or less.')
    .regex(/^$|^(\+?[1-9]\d{1,14})$/, { message: "Invalid phone number format. Should be empty or like +1234567890" })
    .optional().or(z.literal('')),
  // isDefault: z.boolean().optional(), // If you want a default address flag
});
export type AddressInput = z.infer<typeof AddressSchema>;


// --- Product Form Schema (Remains active) ---
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
  isLatest: z.boolean().optional(),
  sizeAndDimensions: z.string().max(100, "Size/dimensions info too long.").optional().or(z.literal('')),
  material: z.string().max(100, "Material info too long.").optional().or(z.literal('')),
  imageUrls: z.array(ProductImageSchema).min(1, "At least one image is required."),
});

export type ProductFormInput = z.infer<typeof ProductFormSchema>;


// --- Registration Schema ---
export const SignUpSchemaWithAddress = z.object({
  firstName: z.string().min(1, { message: 'First name is required.' }).max(50, { message: 'First name is too long.' }),
  lastName: z.string().min(1, { message: 'Last name is required.' }).max(50, { message: 'Last name is too long.' }),
  email: z.string().email({ message: 'Invalid email address.' }),
  phoneNumber: z.string()
    .max(20, { message: 'Phone number must be 20 characters or less.' })
    .regex(/^$|^(\+?[1-9]\d{1,14})$/, { message: "Invalid phone number format. Should be empty or like +1234567890" })
    .optional().or(z.literal('')),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long.' }),
  confirmPassword: z.string(),
  addressStreet: z.string().min(1, 'Street address is required.').max(200, 'Street address is too long.'),
  addressCity: z.string().min(1, 'City is required.').max(100, 'City name is too long.'),
  addressState: z.string().min(1, 'State/Province is required.').max(100, 'State/Province name is too long.'),
  addressPostalCode: z.string().min(1, 'Postal code is required.').max(20, 'Postal code is too long.'),
  addressCountry: z.string().min(1, 'Country is required.').max(100, 'Country name is too long.'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match.",
  path: ['confirmPassword'],
});
export type SignUpWithAddressInput = z.infer<typeof SignUpSchemaWithAddress>;

// --- SignIn Schema ---
export const SignInSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z.string().min(1, { message: 'Password is required.' }),
});
export type SignInInput = z.infer<typeof SignInSchema>;
