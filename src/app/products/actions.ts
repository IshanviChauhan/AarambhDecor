
'use server';

import { db } from '@/lib/firebase';
import { collection, doc, getDoc, getDocs, query, where, limit, orderBy, setDoc, writeBatch } from 'firebase/firestore';
import type { Product, Review, ProductImage } from '@/lib/types';
import { MOCK_PRODUCTS } from '@/lib/mock-data';

interface SeedResult {
  success: boolean;
  message: string;
  count?: number;
}

export async function seedProductsToFirestore(): Promise<SeedResult> {
  if (MOCK_PRODUCTS.length === 0) {
    return { success: false, message: "No mock products found to seed." };
  }

  const batch = writeBatch(db);
  let seededCount = 0;

  MOCK_PRODUCTS.forEach(product => {
    const productDocRef = doc(db, 'products', product.id);
    const productData: Omit<Product, 'id'> = {
      name: product.name,
      description: product.description,
      careInstructions: product.careInstructions,
      imageUrls: product.imageUrls.map(img => ({ url: img.url, dataAiHint: img.dataAiHint } as ProductImage)),
      price: product.price,
      category: product.category,
      isLatest: product.isLatest || false,
      sizeAndDimensions: product.sizeAndDimensions,
      material: product.material,
      reviews: product.reviews ? product.reviews.map(r => ({ ...r } as Review)) : [],
    };
    batch.set(productDocRef, productData);
    seededCount++;
  });

  try {
    await batch.commit();
    return { success: true, message: `Successfully seeded ${seededCount} products to Firestore.`, count: seededCount };
  } catch (error) {
    console.error("Error seeding products to Firestore:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred during seeding.";
    return { success: false, message: `Failed to seed products: ${errorMessage}` };
  }
}

export async function getProducts(): Promise<Product[]> {
  try {
    const productsColRef = collection(db, 'products');
    let productsSnap = await getDocs(productsColRef);
    
    if (productsSnap.empty) {
      console.log('No products found in Firestore. Attempting to seed database with mock data...');
      const seedResult = await seedProductsToFirestore();
      if (seedResult.success) {
        console.log(`Seeding successful: ${seedResult.message}. Re-fetching products.`);
        productsSnap = await getDocs(productsColRef); // Re-fetch after seeding
      } else {
        console.error(`Seeding failed: ${seedResult.message}. Returning empty product list.`);
        return []; // Return empty if seeding failed
      }
    }
    
    const products: Product[] = productsSnap.docs.map(docSnap => {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        name: data.name || '',
        description: data.description || '',
        careInstructions: data.careInstructions || '',
        imageUrls: data.imageUrls && data.imageUrls.length > 0 ? data.imageUrls : [{ url: 'https://placehold.co/600x400.png', dataAiHint: 'placeholder image' }],
        price: data.price || 'Rs. 0',
        category: data.category || 'Uncategorized',
        isLatest: data.isLatest || false,
        sizeAndDimensions: data.sizeAndDimensions || 'N/A',
        material: data.material || 'N/A',
        reviews: data.reviews || [],
      } as Product;
    });
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  try {
    const productDocRef = doc(db, 'products', id);
    const productSnap = await getDoc(productDocRef);

    if (productSnap.exists()) {
      const data = productSnap.data();
      return {
        id: productSnap.id,
        name: data.name || '',
        description: data.description || '',
        careInstructions: data.careInstructions || '',
        imageUrls: data.imageUrls && data.imageUrls.length > 0 ? data.imageUrls : [{ url: 'https://placehold.co/600x400.png', dataAiHint: 'placeholder image' }],
        price: data.price || 'Rs. 0',
        category: data.category || 'Uncategorized',
        isLatest: data.isLatest || false,
        sizeAndDimensions: data.sizeAndDimensions || 'N/A',
        material: data.material || 'N/A',
        reviews: data.reviews || [],
      } as Product;
    } else {
      console.log(`Product with ID ${id} not found.`);
      return null;
    }
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    return null;
  }
}

export async function getLatestProducts(count: number): Promise<Product[]> {
  try {
    const productsColRef = collection(db, 'products');
    // Assuming products might have a 'createdAt' timestamp field for more robust latest sorting
    // For now, using 'isLatest' and limiting. If you add 'createdAt', order by that.
    let q = query(productsColRef, where('isLatest', '==', true), limit(count));
    let productsSnap = await getDocs(q);

    if (productsSnap.empty) {
        console.log("'isLatest' query returned no results or collection is empty. Falling back to general query for latest products.");
        // Fallback if no products are marked 'isLatest' or if collection is empty
        const allProductsQuery = query(productsColRef, orderBy('name'), limit(count)); // Example fallback: order by name
        const fallbackSnap = await getDocs(allProductsQuery);
        if (fallbackSnap.empty) {
          console.log("Fallback query for latest products also returned no results. Seeding might be needed or collection is truly empty.");
          // Potentially call getProducts() here to trigger seeding if absolutely no products are found
          // However, to avoid circular calls or too much magic, let's assume getProducts will be called elsewhere first
          return [];
        }
        productsSnap = fallbackSnap; // Use fallback results
    }
    
    const products: Product[] = productsSnap.docs.map(docSnap => {
       const data = docSnap.data();
      return {
        id: docSnap.id,
        name: data.name || '',
        description: data.description || '',
        careInstructions: data.careInstructions || '',
        imageUrls: data.imageUrls && data.imageUrls.length > 0 ? data.imageUrls : [{ url: 'https://placehold.co/600x400.png', dataAiHint: 'placeholder image' }],
        price: data.price || 'Rs. 0',
        category: data.category || 'Uncategorized',
        isLatest: data.isLatest || false,
        sizeAndDimensions: data.sizeAndDimensions || 'N/A',
        material: data.material || 'N/A',
        reviews: data.reviews || [],
      } as Product;
    });
    return products;
  } catch (error) {
    console.error("Error fetching latest products:", error);
    return [];
  }
}

