
'use server';

import { db } from '@/lib/firebase';
import { doc, updateDoc, collection, addDoc, getDoc, getDocs, query, orderBy, serverTimestamp, deleteDoc } from 'firebase/firestore'; // Removed 'where' as it's not used currently
import type { UserProfile, UserAddress, Order } from '@/lib/types';
import { UserProfileUpdateSchema, AddressSchema, type UserProfileUpdateInput, type AddressInput } from '@/lib/schemas';
import { revalidatePath } from 'next/cache';

export interface FormState {
  message: string | null;
  errors?: Partial<Record<string, string[] | undefined>> & { _form?: string[] };
  success: boolean;
  data?: any; // For potentially passing back data like userId or addressId
}

const featureDisabledMessage = "This specific profile feature is currently under development or disabled.";
const authNeededMessage = "User ID is required for this action. Please ensure you are logged in.";
const genericErrorMessage = "An unexpected error occurred. Please try again.";

// --- Profile Update Action ---
export async function updateUserProfileAction(prevState: FormState, formData: FormData): Promise<FormState> {
  const rawFormData = {
    userId: formData.get('userId'), // userId is passed as a hidden input in the form
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    phoneNumber: formData.get('phoneNumber'),
  };

  const validation = UserProfileUpdateSchema.safeParse(rawFormData);

  if (!validation.success) {
    return {
      errors: validation.error.flatten().fieldErrors,
      message: 'Invalid profile data. Please check your input.',
      success: false,
    };
  }

  const { userId, ...profileDataToUpdate } = validation.data;

  if (!userId) { // Should always be present if form includes it
    return { message: authNeededMessage, success: false, errors: { _form: [authNeededMessage] } };
  }

  try {
    const userProfileRef = doc(db, 'userProfile', userId);
    const profileSnap = await getDoc(userProfileRef);
    if (!profileSnap.exists()) {
        return { message: "User profile not found. Cannot update.", success: false, errors: { _form: ["User profile not found."] } };
    }

    // Prepare only the fields that are part of UserProfileUpdateSchema for update
    const updateData: Partial<Pick<UserProfile, 'firstName' | 'lastName' | 'phoneNumber'>> = {
        firstName: profileDataToUpdate.firstName,
        lastName: profileDataToUpdate.lastName,
        phoneNumber: profileDataToUpdate.phoneNumber || null, // Store null if empty
    };

    await updateDoc(userProfileRef, updateData);
    revalidatePath('/profile'); // Revalidate the profile page to show updated data
    return { message: 'Profile updated successfully!', success: true, data: { userId } };
  } catch (error) {
    console.error('Error updating user profile:', error);
    const errorMessage = error instanceof Error ? error.message : genericErrorMessage;
    return { message: `Failed to update profile: ${errorMessage}`, success: false, errors: { _form: [errorMessage] } };
  }
}

// --- Add Shipping Address Action ---
export async function addShippingAddressAction(prevState: FormState, formData: FormData): Promise<FormState> {
  const rawFormData = {
    userId: formData.get('userId'), // userId is passed as a hidden input
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
      message: 'Invalid address data. Please check your input.',
      success: false,
    };
  }

  const { userId, ...addressData } = validation.data;

  if (!userId) {
     return { message: authNeededMessage, success: false, errors: { _form: [authNeededMessage] } };
  }

  try {
    const addressesColRef = collection(db, 'userProfile', userId, 'addresses');
    // Exclude addressId for new addresses as it's not part of the form for adding
    // It would be relevant for an update action
    const { addressId: _addressId, ...newAddressData } = addressData; 

    const dataToSave: Omit<UserAddress, 'id' | 'createdAt'> & { createdAt: any } = {
        ...newAddressData,
        phoneNumber: newAddressData.phoneNumber || null, // Store null if empty
        createdAt: serverTimestamp(),
        isDefault: false, // New addresses are not default by default
    };
    await addDoc(addressesColRef, dataToSave);
    revalidatePath('/profile'); // Revalidate to show the new address
    return { message: 'Shipping address added successfully!', success: true, data: { userId } };
  } catch (error) {
    console.error('Error adding shipping address:', error);
    const errorMessage = error instanceof Error ? error.message : genericErrorMessage;
    return { message: `Failed to add address: ${errorMessage}`, success: false, errors: { _form: [errorMessage] } };
  }
}

// --- Data Fetching Functions (Not Server Actions for useActionState) ---
// These are called directly from the ProfilePage client component

export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  if (!userId) {
    console.error("getUserProfile: userId is required.");
    return null;
  }
  try {
    const userProfileRef = doc(db, 'userProfile', userId);
    const docSnap = await getDoc(userProfileRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      // Ensure all expected fields are present, providing defaults if necessary
      // This mapping ensures the client gets a consistently structured object.
      return {
        uid: docSnap.id,
        email: data.email || '',
        firstName: data.firstName || '',
        lastName: data.lastName || '',
        phoneNumber: data.phoneNumber === undefined ? null : data.phoneNumber, // Handle undefined as null
        address: data.address ? { // Primary address from registration
          street: data.address.street || '',
          city: data.address.city || '',
          state: data.address.state || '',
          postalCode: data.address.postalCode || '',
          country: data.address.country || '',
        } : undefined,
        createdAt: data.createdAt || null, // Firestore timestamp or null
      } as UserProfile;
    }
    console.warn(`User profile not found for UID: ${userId}`);
    return null;
  } catch (error) {
    console.error("Error fetching user profile in action:", error);
    return null; // Return null on error to be handled by the client
  }
}

export async function getShippingAddresses(userId: string): Promise<UserAddress[]> {
   if (!userId) {
    console.error("getShippingAddresses: userId is required.");
    return [];
  }
  try {
    const addressesColRef = collection(db, 'userProfile', userId, 'addresses');
    const snapshot = await getDocs(query(addressesColRef, orderBy("createdAt", "desc")));
    const addresses: UserAddress[] = [];
    snapshot.forEach(docSnap => {
        const data = docSnap.data();
        addresses.push({ 
            id: docSnap.id, // This is the document ID of the address in the subcollection
            street: data.street || '',
            city: data.city || '',
            state: data.state || '',
            postalCode: data.postalCode || '',
            country: data.country || '',
            fullName: data.fullName || '', // Recipient name for this address
            phoneNumber: data.phoneNumber === undefined ? null : data.phoneNumber,
            isDefault: data.isDefault || false,
            createdAt: data.createdAt || null,
        } as UserAddress)
    });
    return addresses;
  } catch (error) {
    console.error("Error fetching shipping addresses in action:", error);
    return []; // Return empty array on error
  }
}

export async function getOrderHistory(userId: string): Promise<Order[]> {
   if (!userId) {
    console.error("getOrderHistory: userId is required.");
    return [];
  }
  try {
    // This remains a placeholder as order system is not implemented
    console.warn("getOrderHistory called, but actual order fetching is not implemented yet.");
    return []; 
  } catch (error) {
     console.error("Error fetching order history in action:", error);
    return [];
  }
}

// --- Placeholder/Disabled Actions for future implementation ---
export async function updateShippingAddressAction(prevState: FormState, formData: FormData): Promise<FormState> {
  console.warn("updateShippingAddressAction called, but feature is under development/disabled.");
  return { message: featureDisabledMessage, success: false, errors: { _form: [featureDisabledMessage] } };
}

export async function deleteShippingAddressAction(userId: string, addressId: string): Promise<FormState> {
  console.warn("deleteShippingAddressAction called. Feature under development/disabled.");
  if (!userId || !addressId) {
    return { message: "User ID and Address ID are required.", success: false, errors: { _form: ["User ID and Address ID are required."] } };
  }
  // Actual deletion logic would be here:
  // try {
  //   const addressRef = doc(db, 'userProfile', userId, 'addresses', addressId);
  //   await deleteDoc(addressRef);
  //   revalidatePath('/profile');
  //   return { message: "Address deleted successfully!", success: true, data: { userId, addressId } };
  // } catch (error) {
  //   console.error('Error deleting shipping address:', error);
  //   const errorMessage = error instanceof Error ? error.message : genericErrorMessage;
  //   return { message: `Failed to delete address: ${errorMessage}`, success: false, errors: { _form: [errorMessage] } };
  // }
  return { message: featureDisabledMessage, success: false, errors: { _form: [featureDisabledMessage] } };
}
