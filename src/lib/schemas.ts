
import { z } from 'zod';

export const SignUpSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long.' }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match.",
  path: ['confirmPassword'],
});

export type SignUpInput = z.infer<typeof SignUpSchema>;

export const SignInSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z.string().min(1, { message: 'Password is required.' }),
});

export type SignInInput = z.infer<typeof SignInSchema>;

export const UserProfileSchema = z.object({
  name: z.string().min(1, { message: 'Name cannot be empty.' }).max(100, { message: 'Name is too long.' }).optional(),
  // Email is not part of the form for profile update, it's fixed.
});

export type UserProfileInput = z.infer<typeof UserProfileSchema>;

export const AddressSchema = z.object({
  id: z.string().optional(), // For identifying address to update/delete
  fullName: z.string().min(1, 'Full name is required.').max(100),
  addressLine1: z.string().min(1, 'Address line 1 is required.').max(200),
  addressLine2: z.string().max(200).optional().or(z.literal('')),
  city: z.string().min(1, 'City is required.').max(100),
  state: z.string().min(1, 'State/Province is required.').max(100),
  postalCode: z.string().min(1, 'Postal code is required.').max(20),
  country: z.string().min(1, 'Country is required.').max(100),
  phoneNumber: z.string().max(20).optional().or(z.literal('')),
});

export type AddressInput = z.infer<typeof AddressSchema>;
