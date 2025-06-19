
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
  console.log(`seedProductsToFirestore: Attempting to seed ${MOCK_PRODUCTS.length} products...`);

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
      featured: product.featured || false, // Changed from isLatest
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
    console.log('getProducts: Attempting to fetch products from Firestore...');
    const productsColRef = collection(db, 'products');
    let productsSnap = await getDocs(productsColRef);

    if (productsSnap.empty) {
      console.log('getProducts: Firestore is empty. Attempting to seed database with mock data from products.json...');
      const seedResult = await seedProductsToFirestore();
      if (seedResult.success && seedResult.count && seedResult.count > 0) {
        console.log(`getProducts: Seeding successful: ${seedResult.message}. Re-fetching products from Firestore.`);
        productsSnap = await getDocs(productsColRef);
        if (productsSnap.empty) {
          console.warn("getProducts: Firestore is still empty after successful seeding and re-fetch. This might indicate an issue with data propagation or Firestore rules. Falling back to MOCK_PRODUCTS (from products.json).");
          return MOCK_PRODUCTS;
        }
      } else {
        console.error(`getProducts: Seeding failed or yielded no products: ${seedResult.message}. Falling back to MOCK_PRODUCTS (from products.json).`);
        return MOCK_PRODUCTS;
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
        featured: data.featured || false, // Changed from isLatest
        sizeAndDimensions: data.sizeAndDimensions || 'N/A',
        material: data.material || 'N/A',
        reviews: data.reviews || [],
      } as Product;
    });
    console.log(`getProducts: Successfully fetched ${products.length} products from Firestore.`);
    return products;
  } catch (error) {
    console.error("getProducts: Error during Firestore operation:", error, "Falling back to MOCK_PRODUCTS (from products.json).");
    return MOCK_PRODUCTS;
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  try {
    console.log(`getProductById: Attempting to fetch product with ID ${id} from Firestore...`);
    const productDocRef = doc(db, 'products', id);
    const productSnap = await getDoc(productDocRef);

    if (productSnap.exists()) {
      console.log(`getProductById: Product ${id} found in Firestore.`);
      const data = productSnap.data();
      return {
        id: productSnap.id,
        name: data.name || '',
        description: data.description || '',
        careInstructions: data.careInstructions || '',
        imageUrls: data.imageUrls && data.imageUrls.length > 0 ? data.imageUrls : [{ url: 'https://placehold.co/600x400.png', dataAiHint: 'placeholder image' }],
        price: data.price || 'Rs. 0',
        category: data.category || 'Uncategorized',
        featured: data.featured || false, // Changed from isLatest
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
            console.log(`getProductById: Seeding successful after ${id} not found. Re-fetching product ${id}.`);
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
                featured: data.featured || false, // Changed from isLatest
                sizeAndDimensions: data.sizeAndDimensions || 'N/A',
                material: data.material || 'N/A',
                reviews: data.reviews || [],
              } as Product;
            } else {
              console.log(`getProductById: Product ${id} still not found after attempting to seed. Returning null.`);
              return null;
            }
        } else {
             console.error(`getProductById: Seeding failed or yielded no products when trying to find ${id}: ${seedResult.message}. Returning null.`);
             return null;
        }
      }
      console.log(`getProductById: Product ${id} not found and collection was not empty or seeding did not find it. Returning null.`);
      return null;
    }
  } catch (error) {
    console.error(`getProductById: Error fetching product with ID ${id}:`, error, "Returning null.");
    return null;
  }
}

export async function getFeaturedProducts(count: number): Promise<Product[]> { // Renamed from getLatestProducts
  try {
    console.log(`getFeaturedProducts: Attempting to fetch ${count} featured products from Firestore...`);
    const productsColRef = collection(db, 'products');
    let featuredProductsQuery = query(productsColRef, where('featured', '==', true), limit(count)); // Changed from isLatest
    let productsSnap = await getDocs(featuredProductsQuery);

    let productsToReturn: Product[] = [];

    if (productsSnap.empty) {
      console.log("getFeaturedProducts: 'featured' query returned no results. Checking if entire collection is empty for seeding...");
      const allProductsCheckQuery = query(productsColRef, limit(1));
      const anyProductSnap = await getDocs(allProductsCheckQuery);

      if (anyProductSnap.empty) {
        console.log('getFeaturedProducts: Products collection is entirely empty. Attempting to seed database with mock data...');
        const seedResult = await seedProductsToFirestore();
        if (seedResult.success && seedResult.count && seedResult.count > 0) {
          console.log(`getFeaturedProducts: Seeding successful: ${seedResult.message}. Re-fetching featured products.`);
          productsSnap = await getDocs(featuredProductsQuery);
          if (productsSnap.empty) {
              console.warn("getFeaturedProducts: 'featured' query still empty after successful seed.");
          }
        } else {
          console.error(`getFeaturedProducts: Seeding failed or yielded no products: ${seedResult.message}.`);
        }
      }
      
      if (productsSnap.empty) { 
         console.log("getFeaturedProducts: No 'featured' products found. Falling back to a general query for any products.");
         const fallbackQuery = query(productsColRef, orderBy('name'), limit(count)); 
         productsSnap = await getDocs(fallbackQuery);
         if (productsSnap.empty) {
           console.log("getFeaturedProducts: Fallback query also returned no results. The collection might be truly empty or seeding failed. Falling back to MOCK_PRODUCTS.");
           return MOCK_PRODUCTS.slice(0, count); 
         }
      }
    }
    
    productsToReturn = productsSnap.docs.map(docSnap => {
       const data = docSnap.data();
      return {
        id: docSnap.id,
        name: data.name || '',
        description: data.description || '',
        careInstructions: data.careInstructions || '',
        imageUrls: data.imageUrls && data.imageUrls.length > 0 ? data.imageUrls : [{ url: 'https://placehold.co/600x400.png', dataAiHint: 'placeholder image' }],
        price: data.price || 'Rs. 0',
        category: data.category || 'Uncategorized',
        featured: data.featured || false, // Changed from isLatest
        sizeAndDimensions: data.sizeAndDimensions || 'N/A',
        material: data.material || 'N/A',
        reviews: data.reviews || [],
      } as Product;
    });

    if (productsToReturn.length === 0 && MOCK_PRODUCTS.length > 0) {
        console.warn("getFeaturedProducts: All Firestore fetches resulted in no products. Falling back to MOCK_PRODUCTS for featured products.");
        return MOCK_PRODUCTS.filter(p => p.featured).slice(0, count); // Changed from isLatest
    }
    
    console.log(`getFeaturedProducts: Fetched ${productsToReturn.length} products.`);
    return productsToReturn;

  } catch (error) {
    console.error("getFeaturedProducts: Error fetching featured products:", error, "Falling back to MOCK_PRODUCTS.");
    return MOCK_PRODUCTS.filter(p => p.featured).slice(0, count); // Changed from isLatest
  }
}

