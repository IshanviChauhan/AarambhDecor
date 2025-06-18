
'use server';

import { db } from '@/lib/firebase';
import { doc, updateDoc, collection, addDoc, getDoc, getDocs, query, where, serverTimestamp } from 'firebase/firestore';
import type { UserProfile, UserAddress, Order } from '@/lib/types';
import { UserProfileUpdateSchema, AddressSchema, type UserProfileUpdateInput, type AddressInput } from '@/lib/schemas';
import { revalidatePath } from 'next/cache';

export interface FormState {
  message: string | null;
  errors?: Partial<Record<string, string[] | undefined>> & { _form?: string[] };
  success: boolean;
  data?: any;
}

const featureDisabledMessage = "This specific profile feature is currently under development or disabled.";
const authNeededMessage = "User authentication context is required for this action and is not fully implemented.";

// --- Profile Update Action ---
export async function updateUserProfileAction(prevState: FormState, formData: FormData): Promise<FormState> {
  const rawFormData = {
    userId: formData.get('userId'), // Expecting userId from a hidden field (TEMPORARY/INSECURE)
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    phoneNumber: formData.get('phoneNumber'),
  };

  const validation = UserProfileUpdateSchema.safeParse(rawFormData);

  if (!validation.success) {
    return {
      errors: validation.error.flatten().fieldErrors,
      message: 'Invalid profile data.',
      success: false,
    };
  }
  
  const { userId, ...profileData } = validation.data;

  if (!userId) {
    return { message: authNeededMessage, success: false, errors: { _form: [authNeededMessage] } };
  }

  try {
    const userProfileRef = doc(db, 'userProfile', userId);
    // Check if profile exists before updating
    const profileSnap = await getDoc(userProfileRef);
    if (!profileSnap.exists()) {
        return { message: "User profile not found. Cannot update.", success: false, errors: { _form: ["User profile not found."] } };
    }

    await updateDoc(userProfileRef, {
        ...profileData,
        phoneNumber: profileData.phoneNumber || null, // Ensure empty string becomes null
    });
    revalidatePath('/profile');
    return { message: 'Profile updated successfully!', success: true };
  } catch (error) {
    console.error('Error updating user profile:', error);
    const errorMessage = error instanceof Error ? error.message : 'Server error during profile update.';
    return { message: `Failed to update profile: ${errorMessage}`, success: false, errors: { _form: [errorMessage] } };
  }
}

// --- Add Shipping Address Action ---
export async function addShippingAddressAction(prevState: FormState, formData: FormData): Promise<FormState> {
  const rawFormData = {
    userId: formData.get('userId'), // Expecting userId from a hidden field (TEMPORARY/INSECURE)
    fullName: formData.get('fullName'),
    street: formData.get('street'),
    city: formData.get('city'),
    state: formData.get('state'),
    postalCode: formData.get('postalCode'),
    country: formData.get('country'),
    phoneNumber: formData.get('phoneNumber'),
  };

  const validation = AddressSchema.safeParse(rawFormData);

  if (!validation.success) {
    return {
      errors: validation.error.flatten().fieldErrors,
      message: 'Invalid address data.',
      success: false,
    };
  }
  
  const { userId, ...addressData } = validation.data;

  if (!userId) {
     return { message: authNeededMessage, success: false, errors: { _form: [authNeededMessage] } };
  }

  try {
    const addressesColRef = collection(db, 'userProfile', userId, 'addresses');
    await addDoc(addressesColRef, {
        ...addressData,
        phoneNumber: addressData.phoneNumber || null,
        createdAt: serverTimestamp(),
    });
    revalidatePath('/profile'); // Revalidate to show new address if listing was implemented
    return { message: 'Shipping address added successfully!', success: true };
  } catch (error) {
    console.error('Error adding shipping address:', error);
    const errorMessage = error instanceof Error ? error.message : 'Server error when adding address.';
    return { message: `Failed to add address: ${errorMessage}`, success: false, errors: { _form: [errorMessage] } };
  }
}


// --- Placeholder/Disabled Actions ---
export async function getUserProfile(userId?: string): Promise<UserProfile | null> {
  console.warn("getUserProfile called. Full implementation depends on auth context.");
  if (!userId) {
    console.error("getUserProfile: userId is required.");
    return null;
  }
  try {
    const userProfileRef = doc(db, 'userProfile', userId);
    const docSnap = await getDoc(userProfileRef);
    if (docSnap.exists()) {
      return { uid: docSnap.id, ...docSnap.data() } as UserProfile;
    }
    return null;
  } catch (error) {
    console.error("Error fetching user profile in action:", error);
    return null;
  }
}

export async function getShippingAddresses(userId?: string): Promise<UserAddress[]> {
  console.warn("getShippingAddresses called. Full implementation depends on auth context.");
   if (!userId) {
    console.error("getShippingAddresses: userId is required.");
    return [];
  }
  try {
    const addressesColRef = collection(db, 'userProfile', userId, 'addresses');
    const snapshot = await getDocs(query(addressesColRef, where("userId", "==", userId))); // Should not need where if subcollection
    const addresses: UserAddress[] = [];
    snapshot.forEach(doc => addresses.push({ id: doc.id, ...doc.data() } as UserAddress));
    return addresses;
  } catch (error) {
    console.error("Error fetching shipping addresses in action:", error);
    return [];
  }
}

export async function updateShippingAddress(prevState: FormState, formData: FormData): Promise<FormState> {
  console.warn("updateShippingAddress called, but feature is under development.");
  return { message: featureDisabledMessage, success: false, errors: { _form: [featureDisabledMessage] } };
}

export async function deleteShippingAddress(userId: string, addressId: string): Promise<FormState> {
  console.warn("deleteShippingAddress called, but feature is under development.");
  // In a real scenario, this would be:
  // if (!userId || !addressId) return { message: "User and Address ID required.", success: false };
  // const addressRef = doc(db, 'userProfile', userId, 'addresses', addressId);
  // await deleteDoc(addressRef);
  // return { message: "Address deleted.", success: true };
  return { message: featureDisabledMessage, success: false };
}

export async function getOrderHistory(userId?: string): Promise<Order[]> {
  console.warn("getOrderHistory called. Full implementation depends on auth context.");
   if (!userId) {
    console.error("getOrderHistory: userId is required.");
    return [];
  }
  // Example: const ordersColRef = collection(db, 'orders');
  // const q = query(ordersColRef, where("userId", "==", userId), orderBy("orderDate", "desc"));
  // ... fetch and map orders
  return [];
}
