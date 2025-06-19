
'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Product } from '@/lib/types';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { ProductCard } from '@/components/product-card';
import { Button } from '@/components/ui/button';
import { Loader2, Heart, Info } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { getProducts } from '@/app/products/actions';

const WISHLIST_STORAGE_KEY = 'aarambhDecorWishlist';

export default function WishlistPage() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [wishlistedProducts, setWishlistedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [currentWishlistIds, setCurrentWishlistIds] = useState<string[]>([]);

  const { toast } = useToast();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const loadWishlist = useCallback(async () => {
    if (!isClient) return;
    setIsLoading(true);
    try {
      const productsFromSource = await getProducts();
      setAllProducts(productsFromSource);

      const storedWishlist = localStorage.getItem(WISHLIST_STORAGE_KEY);
      const ids = storedWishlist ? JSON.parse(storedWishlist) : [];
      setCurrentWishlistIds(ids);

      if (productsFromSource.length > 0 && ids.length > 0) {
        const filtered = productsFromSource.filter(p => ids.includes(p.id));
        setWishlistedProducts(filtered);
      } else {
        setWishlistedProducts([]);
      }
       if (productsFromSource.length === 0) {
         toast({ title: "Error", description: "Could not load product data for wishlist.", variant: "destructive" });
      }

    } catch (error) {
      console.error("WishlistPage: Failed to fetch products or load wishlist:", error);
      toast({ title: "Error", description: "Could not load your wishlist.", variant: "destructive" });
      setWishlistedProducts([]);
      setAllProducts([]);
    } finally {
      setIsLoading(false);
    }
  }, [isClient, toast]);

  useEffect(() => {
    loadWishlist();
  }, [loadWishlist]);

  // Listen for storage changes to update wishlist in real-time if changed in another tab
  useEffect(() => {
    if (!isClient) return;

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === WISHLIST_STORAGE_KEY) {
        loadWishlist(); // Reload wishlist if the storage key changed
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [isClient, loadWishlist]);


  const handleToggleWishlist = (productId: string) => {
    if (!isClient) return;

    const product = allProducts.find(p => p.id === productId);
    const productName = product?.name || "Product";
    let newWishlistIds: string[];

    if (currentWishlistIds.includes(productId)) {
      newWishlistIds = currentWishlistIds.filter(id => id !== productId);
      toast({
        title: "Removed from Wishlist",
        description: `${productName} has been removed from your wishlist.`,
        variant: "default"
      });
    } else {
      newWishlistIds = [...currentWishlistIds, productId];
      toast({
        title: "Added to Wishlist",
        description: `${productName} has been added to your wishlist.`,
        variant: "default"
      });
    }

    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(newWishlistIds));
    setCurrentWishlistIds(newWishlistIds); // Update current IDs
    
    // Update displayed products
    if (allProducts.length > 0) {
        setWishlistedProducts(allProducts.filter(p => newWishlistIds.includes(p.id)));
    } else {
        // This case implies allProducts might not have loaded yet, edge case
        loadWishlist(); // Re-evaluate displayed products
    }
     // Force header update for wishlist icon fill (if header doesn't auto-update)
     // This is a common pattern. If your header listens to 'storage' event, this might not be needed.
     // Forcing a storage event to ensure header updates:
     window.dispatchEvent(new StorageEvent('storage', { key: WISHLIST_STORAGE_KEY }));
  };


  if (!isClient) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-grow container mx-auto px-2 py-8 md:py-12 flex justify-center items-center">
          <Loader2 className="h-12 w-12 text-primary animate-spin" />
           <p className="ml-4 text-lg text-muted-foreground">Loading wishlist...</p>
        </main>
        <Footer />
      </div>
    );
  }


  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-2 py-8 md:py-12">
        <section className="text-center mb-10 md:mb-12 animate-fade-in-down">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Heart className="h-10 w-10 text-primary fill-primary" />
            <h1 className="text-4xl md:text-5xl font-headline text-primary">
              Your Wishlist
            </h1>
          </div>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Here are the beautiful items you've saved.
          </p>
        </section>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-12 w-12 text-primary animate-spin" />
            <p className="ml-4 text-lg text-muted-foreground">Loading your saved items...</p>
          </div>
        ) : wishlistedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8 animate-fade-in-up animation-delay-200">
            {wishlistedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isWishlisted={currentWishlistIds.includes(product.id)}
                onToggleWishlist={handleToggleWishlist}
                className="w-full" // Ensure cards take full width of their grid cell
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-10 animate-fade-in-up animation-delay-200">
            <Info className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-headline text-primary mb-2">Your Wishlist is Empty</h2>
            <p className="text-xl text-muted-foreground mb-6">
              Looks like you haven't added any favorites yet. Explore our collections!
            </p>
            <Button asChild size="lg">
              <Link href="/collections">Start Shopping</Link>
            </Button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
