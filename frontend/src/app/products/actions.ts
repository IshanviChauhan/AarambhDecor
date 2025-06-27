'use server';

import type { Product } from '../../lib/types';
import { MOCK_PRODUCTS } from '../../lib/mock-data';

/**
 * Retrieves all products from the local mock data.
 * @returns A promise that resolves to an array of all products.
 */
export async function getProducts(): Promise<Product[]> {
  console.log("getProducts: Returning products from local mock data.");
  return MOCK_PRODUCTS;
}

/**
 * Retrieves a single product by its ID from the local mock data.
 * @param id The ID of the product to retrieve.
 * @returns A promise that resolves to the product object or null if not found.
 */
export async function getProductById(id: string): Promise<Product | null> {
  console.log(`getProductById: Searching for product with ID ${id} in local mock data.`);
  const product = MOCK_PRODUCTS.find(p => p.id === id) || null;
  if (product) {
    console.log(`getProductById: Found product ${id}.`);
  } else {
    console.warn(`getProductById: Product with ID ${id} not found in local mock data.`);
  }
  return product;
}

/**
 * Retrieves featured products from the local mock data.
 * @param count The number of featured products to retrieve.
 * @returns A promise that resolves to an array of featured products.
 */
export async function getFeaturedProducts(count: number): Promise<Product[]> {
  console.log(`getFeaturedProducts: Returning ${count} featured products from local mock data.`);
  const featured = MOCK_PRODUCTS.filter(p => p.featured).slice(0, count);
  return featured;
}
