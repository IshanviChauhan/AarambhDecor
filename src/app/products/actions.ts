
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
    console.warn("seedProductsToFirestore: No mock products found to seed.");
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
    console.log(`seedProductsToFirestore: Successfully seeded ${seededCount} products.`);
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
      console.log('getProducts: No products found in Firestore. Attempting to seed database with mock data...');
      const seedResult = await seedProductsToFirestore();
      if (seedResult.success && seedResult.count && seedResult.count > 0) {
        console.log(`getProducts: Seeding successful: ${seedResult.message}. Re-fetching products.`);
        productsSnap = await getDocs(productsColRef); 
        if (productsSnap.empty) {
            console.warn("getProducts: Firestore is still empty after successful seeding and re-fetch. This might indicate an issue with data propagation or rules.");
        }
      } else {
        console.error(`getProducts: Seeding failed or yielded no products: ${seedResult.message}. Returning empty product list.`);
        return []; 
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
    console.log(`getProducts: Fetched ${products.length} products.`);
    return products;
  } catch (error) {
    console.error("getProducts: Error fetching products:", error);
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
      console.log(`getProductById: Product with ID ${id} not found in Firestore.`);
      const productsColRef = collection(db, 'products');
      const quickCheckSnap = await getDocs(query(productsColRef, limit(1)));
      if (quickCheckSnap.empty) {
        console.log(`getProductById: Product ${id} not found, and products collection seems empty. Attempting to seed...`);
        const seedResult = await seedProductsToFirestore();
         if (seedResult.success && seedResult.count && seedResult.count > 0) {
            const productSnapAfterSeed = await getDoc(productDocRef);
            if (productSnapAfterSeed.exists()) {
              console.log(`getProductById: Product ${id} found after seeding.`);
              const data = productSnapAfterSeed.data();
              return {
                id: productSnapAfterSeed.id,
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
              console.log(`getProductById: Product ${id} still not found after attempting to seed.`);
            }
        } else {
             console.error(`getProductById: Seeding failed or yielded no products when trying to find ${id}: ${seedResult.message}.`);
        }
      }
      return null;
    }
  } catch (error) {
    console.error(`getProductById: Error fetching product with ID ${id}:`, error);
    return null;
  }
}

export async function getLatestProducts(count: number): Promise<Product[]> {
  try {
    const productsColRef = collection(db, 'products');
    let latestProductsQuery = query(productsColRef, where('isLatest', '==', true), limit(count));
    let productsSnap = await getDocs(latestProductsQuery);

    if (productsSnap.empty) {
      console.log("getLatestProducts: 'isLatest' query returned no results. Checking if entire collection is empty for seeding...");
      const allProductsCheckQuery = query(productsColRef, limit(1));
      const anyProductSnap = await getDocs(allProductsCheckQuery);

      if (anyProductSnap.empty) {
        console.log('getLatestProducts: Products collection is entirely empty. Attempting to seed database with mock data...');
        const seedResult = await seedProductsToFirestore();
        if (seedResult.success && seedResult.count && seedResult.count > 0) {
          console.log(`getLatestProducts: Seeding successful: ${seedResult.message}. Re-fetching latest products.`);
          productsSnap = await getDocs(latestProductsQuery); 
          if (productsSnap.empty) {
              console.warn("getLatestProducts: 'isLatest' query still empty after successful seed. Falling back.");
          }
        } else {
          console.error(`getLatestProducts: Seeding failed or yielded no products: ${seedResult.message}.`);
          // No immediate return [], will fall through to fallback if productsSnap remains empty
        }
      }
      
      if (productsSnap.empty) {
         console.log("getLatestProducts: No 'isLatest' products found (even after potential seed). Falling back to a general query for latest products.");
         const fallbackQuery = query(productsColRef, orderBy('name'), limit(count)); 
         productsSnap = await getDocs(fallbackQuery);
         if (productsSnap.empty) {
           console.log("getLatestProducts: Fallback query also returned no results. The collection might be truly empty.");
           return []; 
         }
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
    console.log(`getLatestProducts: Fetched ${products.length} products.`);
    return products;
  } catch (error) {
    console.error("getLatestProducts: Error fetching latest products:", error);
    return [];
  }
}
