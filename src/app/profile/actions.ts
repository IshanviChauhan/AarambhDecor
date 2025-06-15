
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

export async function createUserProfileDocument(uid: string, email: string, firstName: string, lastName: string, phoneNumber?: string): Promise<void> {
  const profileDocRef = doc(db, 'userProfiles', uid);
  const newProfileData: UserProfile = { 
    uid: uid,
    email: email,
    firstName: firstName,
    lastName: lastName,
    phoneNumber: phoneNumber || null,
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
    let phoneNumber = data.phoneNumber;

    if (userToQuery.email === 'ishanvi.chauhan@gmail.com') {
      firstName = firstName || 'Ishanvi'; 
      lastName = lastName || 'Chauhan';
      // phoneNumber will be whatever is in DB or null/undefined. No specific default phone for Ishanvi here.
    }
    
    return { 
        uid: userToQuery.uid, 
        email: userToQuery.email || '', 
        firstName: firstName || null, 
        lastName: lastName || null,
        phoneNumber: phoneNumber || null,
    } as UserProfile;
  } else {
    // New user, create profile document
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
    
    // For a brand new profile, phoneNumber will be null unless provided during signup (which it isn't currently)
    const newProfileData: UserProfile = { 
        uid: userToQuery.uid, 
        email: userToQuery.email || '', 
        firstName: newFirstName || null, 
        lastName: newLastName || null,
        phoneNumber: null, // Default to null for new profiles
    };
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
    const dataToUpdate: Partial<Pick<UserProfile, 'firstName' | 'lastName' | 'phoneNumber'>> = {};

    let firstNameToSet = validation.data.firstName;
    let lastNameToSet = validation.data.lastName;
    // PhoneNumber can be an empty string (to clear it) or a valid number
    const phoneNumberToSet = validation.data.phoneNumber;


    if (user.email === 'ishanvi.chauhan@gmail.com') {
      firstNameToSet = firstNameToSet === '' ? 'Ishanvi' : (firstNameToSet || 'Ishanvi'); 
      lastNameToSet = lastNameToSet === '' ? 'Chauhan' : (lastNameToSet || 'Chauhan');   
    }
    
    if (firstNameToSet !== undefined) dataToUpdate.firstName = firstNameToSet;
    if (lastNameToSet !== undefined) dataToUpdate.lastName = lastNameToSet;
    if (phoneNumberToSet !== undefined) dataToUpdate.phoneNumber = phoneNumberToSet === '' ? null : phoneNumberToSet;


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
    const { id, ...addressDataFromSchema } = validation.data; 
    
    const payload: Omit<Address, 'id'> = {
        fullName: addressDataFromSchema.fullName,
        addressLine1: addressDataFromSchema.addressLine1,
        addressLine2: addressDataFromSchema.addressLine2 || null,
        city: addressDataFromSchema.city,
        state: addressDataFromSchema.state,
        postalCode: addressDataFromSchema.postalCode,
        country: addressDataFromSchema.country,
        phoneNumber: addressDataFromSchema.phoneNumber || null,
    };

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

  const { id: addressId, ...addressDataFromSchema } = validation.data;

  if (!addressId) {
    return { message: 'Address ID is missing for update.', success: false, errors: { _form: ['Address ID is missing.'] } };
  }

  try {
    const addressDocRef = doc(db, 'userProfiles', user.uid, 'shippingAddresses', addressId);

    const payload: Omit<Address, 'id'> = {
        fullName: addressDataFromSchema.fullName,
        addressLine1: addressDataFromSchema.addressLine1,
        addressLine2: addressDataFromSchema.addressLine2 || null,
        city: addressDataFromSchema.city,
        state: addressDataFromSchema.state,
        postalCode: addressDataFromSchema.postalCode,
        country: addressDataFromSchema.country,
        phoneNumber: addressDataFromSchema.phoneNumber || null,
    };

    await updateDoc(addressDocRef, payload);
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

// --- Order History Actions ---
export async function getOrderHistory(): Promise<Order[]> {
  const user = auth.currentUser;
  if (!user) return [];
  
  // This is a placeholder. In a real application, you would query a 'orders' collection
  // filtered by userId and ordered by date.
  // For example:
  // const ordersColRef = collection(db, 'orders');
  // const q = query(ordersColRef, where('userId', '==', user.uid), orderBy('orderDate', 'desc'));
  // const ordersSnap = await getDocs(q);
  // return ordersSnap.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() } as Order));

  console.warn("getOrderHistory is a placeholder and does not fetch real order data yet.");
  
  // Mock some order data for UI demonstration purposes
  const mockOrders: Order[] = [
    // {
    //   id: 'mockOrder123',
    //   userId: user.uid,
    //   orderDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    //   items: [
    //     { productId: 'p1', productName: 'Floral Wall Art Set', quantity: 1, price: 'Rs. 1850' },
    //     { productId: 'p2', productName: 'Gold Sunburst Wall Décor Set', quantity: 2, price: 'Rs. 1299' },
    //   ],
    //   totalAmount: 1850 + (1299 * 2),
    //   shippingAddress: { fullName: 'Test User', addressLine1: '123 Mock St', city: 'Mockville', state: 'MS', postalCode: '00000', country: 'India' },
    //   status: 'Delivered',
    // },
    // {
    //   id: 'mockOrder456',
    //   userId: user.uid,
    //   orderDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
    //   items: [
    //     { productId: 'p5', productName: 'Rectangular Wall Mirror', quantity: 1, price: 'Rs. 2250' },
    //   ],
    //   totalAmount: 2250,
    //   shippingAddress: { fullName: 'Test User', addressLine1: '123 Mock St', city: 'Mockville', state: 'MS', postalCode: '00000', country: 'India' },
    //   status: 'Shipped',
    // },
  ];
  // return Promise.resolve(mockOrders); // Uncomment to show mock data
  return Promise.resolve([]); // Default to no orders
}

