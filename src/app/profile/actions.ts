
'use server';

// This file's functionality has been removed as user profiles are no longer part of the application.

export interface FormState {
  message: string | null;
  errors?: Record<string, string[] | undefined>;
  success: boolean;
  data?: any;
}

const featureRemovedMessage = "User profile functionality has been removed.";

export async function updateUserProfileAction(prevState: FormState, formData: FormData): Promise<FormState> {
  console.warn("updateUserProfileAction called, but profile functionality has been removed.");
  return { message: featureRemovedMessage, success: false, errors: { _form: [featureRemovedMessage] } };
}

export async function addShippingAddressAction(prevState: FormState, formData: FormData): Promise<FormState> {
  console.warn("addShippingAddressAction called, but profile functionality has been removed.");
  return { message: featureRemovedMessage, success: false, errors: { _form: [featureRemovedMessage] } };
}

// Data fetching functions are also removed as they relate to user profiles.
export async function getUserProfile(userId: string): Promise<null> {
  console.warn("getUserProfile called, but profile functionality has been removed.");
  return null;
}

export async function getShippingAddresses(userId: string): Promise<[]> {
  console.warn("getShippingAddresses called, but profile functionality has been removed.");
  return [];
}

export async function getOrderHistory(userId: string): Promise<[]> {
  console.warn("getOrderHistory called, but profile functionality has been removed.");
  return [];
}

export async function updateShippingAddressAction(prevState: FormState, formData: FormData): Promise<FormState> {
  console.warn("updateShippingAddressAction called, but profile functionality has been removed.");
  return { message: featureRemovedMessage, success: false, errors: { _form: [featureRemovedMessage] } };
}

export async function deleteShippingAddressAction(userId: string, addressId: string): Promise<FormState> {
  console.warn("deleteShippingAddressAction called, but profile functionality has been removed.");
  return { message: featureRemovedMessage, success: false, errors: { _form: [featureRemovedMessage] } };
}
