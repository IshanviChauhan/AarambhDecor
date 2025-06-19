
import { Suspense } from 'react';
import HomePageClient from './home-page-client'; // The refactored client part
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Loader2 } from 'lucide-react';
import { getProducts, getFeaturedProducts, seedProductsToFirestore } from '@/app/products/actions'; // Added seedProductsToFirestore
import type { Product } from '@/lib/types';

const FEATURED_PRODUCTS_COUNT = 6;

// This is the new Server Component entry for the `/` route
export default async function Page() {
  // --- ADDED FOR SEEDING/UPDATING PRODUCTS ---
  // This will seed products from products.json (via MOCK_PRODUCTS) into Firestore.
  // If a product ID already exists, it will be overwritten with the data from products.json.
  // This effectively "makes changes in the database for existing products".
  // Consider moving this to a more controlled environment for production (e.g., a specific admin action).
  console.log("Homepage: Attempting to seed/update products from products.json...");
  const seedResult = await seedProductsToFirestore();
  if (seedResult.success) {
    console.log("Homepage: Product seeding/update successful:", seedResult.message);
  } else {
    console.error("Homepage: Product seeding/update failed:", seedResult.message);
  }
  // --- END SEEDING/UPDATING CALL ---

  // Fetch data on the server
  let initialFeaturedProducts: Product[] = [];
  let initialAllProducts: Product[] = [];
  let errorFetchingInitialData = false;

  try {
    // Using Promise.all to fetch data concurrently
    const [featuredResult, allResult] = await Promise.allSettled([
      getFeaturedProducts(FEATURED_PRODUCTS_COUNT),
      getProducts()
    ]);

    if (featuredResult.status === 'fulfilled') {
      initialFeaturedProducts = featuredResult.value;
    } else {
      console.error("Failed to fetch featured products for homepage (server):", featuredResult.reason);
      errorFetchingInitialData = true;
    }

    if (allResult.status === 'fulfilled') {
      initialAllProducts = allResult.value;
    } else {
      console.error("Failed to fetch all products for homepage (server):", allResult.reason);
      errorFetchingInitialData = true;
    }

  } catch (error) { 
    console.error("Unexpected error fetching products for homepage (server):", error);
    errorFetchingInitialData = true;
  }

  return (
    <Suspense fallback={
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-grow container mx-auto px-2 py-8 md:py-12 flex justify-center items-center">
          <Loader2 className="h-12 w-12 text-primary animate-spin" />
          <p className="ml-4 text-lg text-muted-foreground">Loading Aarambh Decor...</p>
        </main>
        <Footer />
      </div>
    }>
      <HomePageClient 
        initialFeaturedProducts={initialFeaturedProducts} 
        initialAllProducts={initialAllProducts}
        errorFetchingInitialData={errorFetchingInitialData}
      />
    </Suspense>
  );
}
