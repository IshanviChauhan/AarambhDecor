
import type { Product } from '@/lib/types';
import productsData from '@/lib/data/products.json';

// The MOCK_PRODUCTS array is now sourced from the imported JSON data.
// This allows for easier management of product data in a separate file.
export const MOCK_PRODUCTS: Product[] = productsData as Product[];

    