
'use server';

import { db } from '@/lib/firebase';
import { doc, updateDoc, collection, addDoc, getDoc, getDocs, query, where, serverTimestamp, deleteDoc } from 'firebase/firestore';
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
const authNeededMessage = "User ID is required for this action. Please ensure you are logged in.";


// --- Profile Update Action ---
export async function updateUserProfileAction(prevState: FormState, formData: FormData): Promise<FormState> {
  const rawFormData = {
    userId: formData.get('userId'),
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
    const profileSnap = await getDoc(userProfileRef);
    if (!profileSnap.exists()) {
        return { message: "User profile not found. Cannot update.", success: false, errors: { _form: ["User profile not found."] } };
    }

    // Prepare data for update, ensuring optional fields are handled
    const updateData: Partial<Pick<UserProfile, 'firstName' | 'lastName' | 'phoneNumber'>> = {
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        phoneNumber: profileData.phoneNumber || null, // Store empty string as null
    };

    await updateDoc(userProfileRef, updateData);
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
    userId: formData.get('userId'),
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
    // Ensure addressId is not part of the data being added for a new address
    const { addressId, ...newAddressData } = addressData;

    const dataToSave: Omit<UserAddress, 'id' | 'createdAt'> & { createdAt: any } = {
        ...newAddressData,
        phoneNumber: newAddressData.phoneNumber || null,
        createdAt: serverTimestamp(),
    };
    await addDoc(addressesColRef, dataToSave);
    revalidatePath('/profile');
    return { message: 'Shipping address added successfully!', success: true };
  } catch (error) {
    console.error('Error adding shipping address:', error);
    const errorMessage = error instanceof Error ? error.message : 'Server error when adding address.';
    return { message: `Failed to add address: ${errorMessage}`, success: false, errors: { _form: [errorMessage] } };
  }
}


// --- Placeholder/Disabled/Future Actions ---
export async function getUserProfile(userId?: string): Promise<UserProfile | null> {
  console.warn("getUserProfile called. User identification should be secure.");
  if (!userId) {
    console.error("getUserProfile: userId is required.");
    return null;
  }
  try {
    const userProfileRef = doc(db, 'userProfile', userId);
    const docSnap = await getDoc(userProfileRef);
    if (docSnap.exists()) {
      // Ensure the 'address' field is handled correctly if it exists (it's part of UserProfile type but might not always be on top level)
      const data = docSnap.data();
      return { uid: docSnap.id, ...data } as UserProfile;
    }
    return null;
  } catch (error) {
    console.error("Error fetching user profile in action:", error);
    return null;
  }
}

export async function getShippingAddresses(userId?: string): Promise<UserAddress[]> {
  console.warn("getShippingAddresses called. User identification should be secure.");
   if (!userId) {
    console.error("getShippingAddresses: userId is required.");
    return [];
  }
  try {
    const addressesColRef = collection(db, 'userProfile', userId, 'addresses');
    // No 'where' clause needed for subcollection direct query
    const snapshot = await getDocs(query(addressesColRef, orderBy("createdAt", "desc")));
    const addresses: UserAddress[] = [];
    snapshot.forEach(doc => addresses.push({ id: doc.id, ...doc.data() } as UserAddress));
    return addresses;
  } catch (error) {
    console.error("Error fetching shipping addresses in action:", error);
    return [];
  }
}

export async function updateShippingAddressAction(prevState: FormState, formData: FormData): Promise<FormState> {
  console.warn("updateShippingAddressAction called, but feature is under development.");
  // Implementation would be similar to add, but use updateDoc and an addressId
  return { message: featureDisabledMessage, success: false, errors: { _form: [featureDisabledMessage] } };
}

export async function deleteShippingAddressAction(userId: string, addressId: string): Promise<FormState> {
  console.warn("deleteShippingAddressAction called, but feature is under development.");
  if (!userId || !addressId) return { message: authNeededMessage, success: false };
  try {
    // const addressRef = doc(db, 'userProfile', userId, 'addresses', addressId);
    // await deleteDoc(addressRef);
    // revalidatePath('/profile');
    // return { message: "Address deleted.", success: true };
    return { message: featureDisabledMessage, success: false, errors: { _form: [featureDisabledMessage] } };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Server error when deleting address.';
    return { message: `Failed to delete address: ${errorMessage}`, success: false, errors: { _form: [errorMessage] } };
  }
}

export async function getOrderHistory(userId?: string): Promise<Order[]> {
  console.warn("getOrderHistory called. User identification should be secure.");
   if (!userId) {
    console.error("getOrderHistory: userId is required.");
    return [];
  }
  try {
    // const ordersColRef = collection(db, 'orders');
    // const q = query(ordersColRef, where("userId", "==", userId), orderBy("orderDate", "desc"));
    // ... fetch and map orders
    return []; // Placeholder
  } catch (error) {
     console.error("Error fetching order history in action:", error);
    return [];
  }
}
