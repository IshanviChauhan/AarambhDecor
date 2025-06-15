
import { z } from 'zod';

export const SignUpSchema = z.object({
  firstName: z.string().min(1, { message: 'First name is required.' }).max(50, { message: 'First name is too long.' }),
  lastName: z.string().min(1, { message: 'Last name is required.' }).max(50, { message: 'Last name is too long.' }),
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
  firstName: z.string().min(1, { message: 'First name cannot be empty.' }).max(50, { message: 'First name is too long.' }).optional().or(z.literal('')),
  lastName: z.string().min(1, { message: 'Last name cannot be empty.' }).max(50, { message: 'Last name is too long.' }).optional().or(z.literal('')),
  // Email is not part of the form for profile update, it's fixed.
});

export type UserProfileInput = z.infer<typeof UserProfileSchema>;

export const AddressSchema = z.object({
  id: z.string().optional(), // For identifying address to update/delete
  fullName: z.string().min(1, 'Full name is required.').max(100, 'Full name is too long.'),
  addressLine1: z.string().min(1, 'Address line 1 is required.').max(200, 'Address line 1 is too long.'),
  addressLine2: z.string().max(200, 'Address line 2 is too long.').optional().or(z.literal('')), // Optional, can be empty string
  city: z.string().min(1, 'City is required.').max(100, 'City name is too long.'),
  state: z.string().min(1, 'State/Province is required.').max(100, 'State/Province is too long.'),
  postalCode: z.string().min(1, 'Postal code is required.').max(20, 'Postal code is too long.'),
  country: z.string().min(1, 'Country is required.').max(100, 'Country name is too long.'),
  phoneNumber: z.string().max(20, 'Phone number is too long.').optional().or(z.literal('')), // Optional, can be empty string
});

export type AddressInput = z.infer<typeof AddressSchema>;
