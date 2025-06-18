
'use server';

import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ProductFormSchema, type ProductFormInput } from '@/lib/schemas';
import type { Product, Review } from '@/lib/types'; // Assuming Review might be added later or is optional
import { revalidatePath } from 'next/cache';

export interface AddProductFormState {
  message: string | null;
  errors?: Partial<Record<keyof ProductFormInput | '_form', string[]>>;
  success: boolean;
}

export async function addProduct(prevState: AddProductFormState, formData: FormData): Promise<AddProductFormState> {
  const rawFormData = {
    name: formData.get('name'),
    description: formData.get('description'),
    careInstructions: formData.get('careInstructions'),
    price: formData.get('price'),
    category: formData.get('category'),
    isLatest: formData.get('isLatest') === 'true', // Convert string "true" to boolean
    sizeAndDimensions: formData.get('sizeAndDimensions'),
    material: formData.get('material'),
    // Image URLs are more complex as they are an array of objects
    imageUrls: [] as { url: string; dataAiHint: string }[],
  };

  // Extract and parse imageUrls from FormData
  // Assuming they are submitted as imageUrls[0].url, imageUrls[0].dataAiHint, etc.
  let i = 0;
  while (formData.has(`imageUrls[${i}].url`)) {
    const url = formData.get(`imageUrls[${i}].url`) as string;
    const dataAiHint = formData.get(`imageUrls[${i}].dataAiHint`) as string;
    if (url) { // Ensure URL is present
        rawFormData.imageUrls.push({ url, dataAiHint: dataAiHint || '' });
    }
    i++;
  }

  const validation = ProductFormSchema.safeParse(rawFormData);

  if (!validation.success) {
    console.error("Validation errors:", validation.error.flatten().fieldErrors);
    return {
      errors: validation.error.flatten().fieldErrors,
      message: 'Invalid product data. Please check your input.',
      success: false,
    };
  }

  const { name, description, careInstructions, price, category, isLatest, sizeAndDimensions, material, imageUrls } = validation.data;

  try {
    const newProductData: Omit<Product, 'id' | 'reviews'> & { createdAt?: any } = {
      name,
      description,
      careInstructions: careInstructions || '',
      imageUrls,
      price,
      category,
      isLatest: isLatest || false,
      sizeAndDimensions: sizeAndDimensions || '',
      material: material || '',
      // reviews: [], // Initialize with empty reviews array if not making it optional in type
      createdAt: serverTimestamp(), // Optional: add a timestamp
    };

    const productsColRef = collection(db, 'products');
    await addDoc(productsColRef, newProductData);

    revalidatePath('/collections'); // Revalidate collections page
    revalidatePath('/'); // Revalidate homepage (if it shows latest products)
    
    return { message: 'Product added successfully!', success: true };
  } catch (error) {
    console.error('Error adding product to Firestore:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown server error occurred.';
    return { message: `Failed to add product: ${errorMessage}`, success: false, errors: { _form: [`Failed to add product: ${errorMessage}`] } };
  }
}
