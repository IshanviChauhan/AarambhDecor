
import { Suspense } from 'react';
import HomePageClient from './home-page-client'; // The refactored client part
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Loader2 } from 'lucide-react';
import { getProducts, getFeaturedProducts } from '@/app/products/actions'; // Changed from getLatestProducts
import type { Product } from '@/lib/types';

const FEATURED_PRODUCTS_COUNT = 6;

// This is the new Server Component entry for the `/` route
export default async function Page() {
  // Fetch data on the server
  let initialFeaturedProducts: Product[] = [];
  let initialAllProducts: Product[] = [];
  let errorFetchingInitialData = false;

  try {
    // Using Promise.all to fetch data concurrently
    const [featuredResult, allResult] = await Promise.allSettled([
      getFeaturedProducts(FEATURED_PRODUCTS_COUNT), // Changed from getLatestProducts
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

