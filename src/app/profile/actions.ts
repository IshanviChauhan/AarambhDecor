
'use server';

import type { User } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { UserProfileSchema, AddressSchema } from '@/lib/schemas';
import type { UserProfile, Address, Order } from '@/lib/types';
import { doc, getDoc, setDoc, updateDoc, collection, addDoc, getDocs, deleteDoc, query, orderBy } from 'firebase/firestore';
import { revalidatePath } from 'next/cache';

export interface FormState {
  message: string | null;
  errors?: Record<string, string[] | undefined> & { _form?: string[] };
  success: boolean;
  data?: any;
}

// --- User Profile Actions ---

export async function createUserProfileDocument(uid: string, email: string, firstName: string, lastName: string): Promise<void> {
  const profileDocRef = doc(db, 'userProfiles', uid);
  const newProfileData: UserProfile = { 
    uid: uid,
    email: email,
    firstName: firstName,
    lastName: lastName,
  };
  await setDoc(profileDocRef, newProfileData, { merge: true }); 
}


export async function getUserProfile(authenticatedUser?: User | null): Promise<UserProfile | null> {
  const userToQuery = authenticatedUser || auth.currentUser; 
  if (!userToQuery) return null;

  const profileDocRef = doc(db, 'userProfiles', userToQuery.uid);
  const profileSnap = await getDoc(profileDocRef);

  if (profileSnap.exists()) {
    const data = profileSnap.data() as Partial<UserProfile>; 
    let firstName = data.firstName;
    let lastName = data.lastName;

    if (userToQuery.email === 'ishanvi.chauhan@gmail.com') {
      firstName = firstName || 'Ishanvi'; 
      lastName = lastName || 'Chauhan';   
    }
    
    return { 
        uid: userToQuery.uid, 
        email: userToQuery.email || '', 
        firstName: firstName || null, 
        lastName: lastName || null  
    } as UserProfile;
  } else {
    let newFirstName = '';
    let newLastName = '';
    if (userToQuery.email === 'ishanvi.chauhan@gmail.com') {
      newFirstName = 'Ishanvi';
      newLastName = 'Chauhan';
    } else if (userToQuery.displayName) {
        const nameParts = userToQuery.displayName.split(' ');
        newFirstName = nameParts[0] || '';
        newLastName = nameParts.slice(1).join(' ') || '';
    }
    
    const newProfileData: UserProfile = { uid: userToQuery.uid, email: userToQuery.email || '', firstName: newFirstName || null, lastName: newLastName || null };
    await setDoc(profileDocRef, newProfileData);
    return newProfileData;
  }
}

export async function updateUserProfile(prevState: FormState, formData: FormData): Promise<FormState> {
  const user = auth.currentUser;
  if (!user) {
    return { message: 'User not authenticated.', success: false, errors: { _form: ['User not authenticated.'] } };
  }

  const rawFormData = Object.fromEntries(formData.entries());
  const validation = UserProfileSchema.safeParse(rawFormData);

  if (!validation.success) {
    return {
      errors: validation.error.flatten().fieldErrors,
      message: 'Invalid data. Please check your input.',
      success: false,
    };
  }

  try {
    const profileDocRef = doc(db, 'userProfiles', user.uid);
    const dataToUpdate: Partial<Pick<UserProfile, 'firstName' | 'lastName'>> = {};


    let firstNameToSet = validation.data.firstName;
    let lastNameToSet = validation.data.lastName;

    if (user.email === 'ishanvi.chauhan@gmail.com') {
      firstNameToSet = firstNameToSet || 'Ishanvi'; 
      lastNameToSet = lastNameToSet || 'Chauhan';   
    }
    
    if (firstNameToSet) dataToUpdate.firstName = firstNameToSet;
    if (lastNameToSet) dataToUpdate.lastName = lastNameToSet;


    const profileSnap = await getDoc(profileDocRef);
    if (profileSnap.exists()) {
        await updateDoc(profileDocRef, dataToUpdate);
    } else {
        await setDoc(profileDocRef, { 
            email: user.email || '', 
            ...dataToUpdate 
        });
    }

    revalidatePath('/profile');
    return { message: 'Profile updated successfully!', success: true };
  } catch (error) {
    console.error('Error updating profile:', error);
    return { message: 'Failed to update profile.', success: false, errors: { _form: ['Failed to update profile.'] } };
  }
}


// --- Shipping Address Actions ---
export async function getShippingAddresses(): Promise<Address[]> {
  const user = auth.currentUser;
  if (!user) return [];

  const addressesColRef = collection(db, 'userProfiles', user.uid, 'shippingAddresses');
  const addressesSnap = await getDocs(addressesColRef);
  
  return addressesSnap.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() } as Address));
}

export async function addShippingAddress(prevState: FormState, formData: FormData): Promise<FormState> {
  const user = auth.currentUser;
  if (!user) {
    return { message: 'User not authenticated.', success: false, errors: { _form: ['User not authenticated.'] } };
  }

  const rawFormData = Object.fromEntries(formData.entries());
  const validation = AddressSchema.safeParse(rawFormData);

  if (!validation.success) {
    return {
      errors: validation.error.flatten().fieldErrors,
      message: 'Invalid address data. Please check your input.',
      success: false,
    };
  }

  try {
    const addressesColRef = collection(db, 'userProfiles', user.uid, 'shippingAddresses');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...addressData } = validation.data; 
    
    const payload: Record<string, any> = {};
    for (const key in addressData) {
        if (Object.prototype.hasOwnProperty.call(addressData, key)) {
            const typedKey = key as keyof typeof addressData;
            if (addressData[typedKey] !== undefined) { 
                 payload[typedKey] = addressData[typedKey];
            }
        }
    }

    await addDoc(addressesColRef, payload);
    revalidatePath('/profile');
    return { message: 'Shipping address added successfully!', success: true };
  } catch (error) {
    console.error('Error adding address:', error);
    return { message: 'Failed to add shipping address.', success: false, errors: { _form: ['Failed to add shipping address.'] } };
  }
}

export async function updateShippingAddress(prevState: FormState, formData: FormData): Promise<FormState> {
  const user = auth.currentUser;
  if (!user) {
    return { message: 'User not authenticated.', success: false, errors: { _form: ['User not authenticated.'] } };
  }

  const rawFormData = Object.fromEntries(formData.entries());
  const validation = AddressSchema.safeParse(rawFormData);
  
  if (!validation.success) {
    return {
      errors: validation.error.flatten().fieldErrors,
      message: 'Invalid address data. Please check your input.',
      success: false,
    };
  }

  const { id: addressId, ...addressData } = validation.data;

  if (!addressId) {
    return { message: 'Address ID is missing for update.', success: false, errors: { _form: ['Address ID is missing.'] } };
  }

  try {
    const addressDocRef = doc(db, 'userProfiles', user.uid, 'shippingAddresses', addressId);

    const payload: Record<string, any> = {};
    for (const key in addressData) {
        if (Object.prototype.hasOwnProperty.call(addressData, key)) {
            const typedKey = key as keyof typeof addressData;
             if (addressData[typedKey] !== undefined) { 
                 payload[typedKey] = addressData[typedKey];
            }
        }
    }
    if (Object.keys(payload).length > 0) {
        await updateDoc(addressDocRef, payload);
    }
    revalidatePath('/profile');
    return { message: 'Shipping address updated successfully!', success: true };
  } catch (error) {
    console.error('Error updating address:', error);
    return { message: 'Failed to update shipping address.', success: false, errors: { _form: ['Failed to update shipping address.'] } };
  }
}

export async function deleteShippingAddress(addressId: string): Promise<FormState> {
  const user = auth.currentUser;
  if (!user) {
    return { message: 'User not authenticated.', success: false };
  }
  if (!addressId) {
     return { message: 'Address ID is missing for deletion.', success: false };
  }

  try {
    const addressDocRef = doc(db, 'userProfiles', user.uid, 'shippingAddresses', addressId);
    await deleteDoc(addressDocRef);
    revalidatePath('/profile');
    return { message: 'Shipping address deleted successfully!', success: true };
  } catch (error) {
    console.error('Error deleting address:', error);
    return { message: 'Failed to delete shipping address.', success: false };
  }
}

// --- Order History Actions (Placeholder) ---
export async function getOrderHistory(): Promise<Order[]> {
  const user = auth.currentUser;
  if (!user) return [];
  
  console.warn("getOrderHistory is a placeholder and does not fetch real order data yet.");
  return Promise.resolve([]); 
}
