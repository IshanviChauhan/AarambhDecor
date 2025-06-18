
'use server';

// All actions in this file are deprecated as authentication is removed.
// They will return error states if called.

import type { User } from 'firebase/auth';
import type { UserProfile, Address, Order } from '@/lib/types';

export interface FormState {
  message: string | null;
  errors?: Record<string, string[] | undefined> & { _form?: string[] };
  success: boolean;
  data?: any;
}

const disabledMessage = "User profile functionality is disabled as authentication has been removed.";

export async function createUserProfileDocument(uid: string, email: string, firstName: string, lastName: string, phoneNumber?: string): Promise<void> {
  console.warn("createUserProfileDocument called, but authentication is disabled.");
  // This function might still be called by a stubbed signup. Silently do nothing or throw.
  // For now, just log.
}

export async function getUserProfile(authenticatedUser?: User | null): Promise<UserProfile | null> {
  console.warn("getUserProfile called, but authentication is disabled.");
  return null;
}

export async function updateUserProfile(prevState: FormState, formData: FormData): Promise<FormState> {
  console.warn("updateUserProfile called, but authentication is disabled.");
  return { message: disabledMessage, success: false, errors: { _form: [disabledMessage] } };
}

export async function getShippingAddresses(): Promise<Address[]> {
  console.warn("getShippingAddresses called, but authentication is disabled.");
  return [];
}

export async function addShippingAddress(prevState: FormState, formData: FormData): Promise<FormState> {
  console.warn("addShippingAddress called, but authentication is disabled.");
  return { message: disabledMessage, success: false, errors: { _form: [disabledMessage] } };
}

export async function updateShippingAddress(prevState: FormState, formData: FormData): Promise<FormState> {
  console.warn("updateShippingAddress called, but authentication is disabled.");
  return { message: disabledMessage, success: false, errors: { _form: [disabledMessage] } };
}

export async function deleteShippingAddress(addressId: string): Promise<FormState> {
  console.warn("deleteShippingAddress called, but authentication is disabled.");
  return { message: disabledMessage, success: false };
}

export async function getOrderHistory(): Promise<Order[]> {
  console.warn("getOrderHistory called, but authentication is disabled.");
  return [];
}
