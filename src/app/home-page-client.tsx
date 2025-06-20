
'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Product } from '@/lib/types';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { ProductCard } from '@/components/product-card';
import { ImageBasedProductRecommender } from '@/components/image-based-product-recommender';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Loader2, Sparkles, ShoppingBag, Search as SearchIcon } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { SearchBar } from '@/components/search-bar';
import WelcomeLoader from '@/components/welcome-loader';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { cn } from '@/lib/utils';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { InstagramReelsSection } from '@/components/layout/instagram-reels-section';

interface HomePageClientProps {
  initialFeaturedProducts: Product[];
  initialAllProducts: Product[];
  errorFetchingInitialData: boolean;
}

const WISHLIST_STORAGE_KEY = 'aarambhDecorWishlist';

export default function HomePageClient({ initialFeaturedProducts, initialAllProducts, errorFetchingInitialData }: HomePageClientProps) {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>(initialFeaturedProducts);
  const [allProductsForSearch, setAllProductsForSearch] = useState<Product[]>(initialAllProducts);
  const [productsUnavailable, setProductsUnavailable] = useState(errorFetchingInitialData);
  const [wishlistItems, setWishlistItems] = useState<string[]>([]);
  const [confirmDialogState, setConfirmDialogState] = useState<{
    isOpen: boolean;
    productId: string | null;
    productName: string | null;
  }>({ isOpen: false, productId: null, productName: null });

  const { toast } = useToast();
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams(); 
  const pathname = usePathname();

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== 'undefined') {
      const storedWishlist = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (storedWishlist) {
        setWishlistItems(JSON.parse(storedWishlist));
      }
    }

    if (errorFetchingInitialData) {
        toast({ title: "Error", description: "Could not load initial products for the homepage. Some features might be limited.", variant: "destructive" });
        setProductsUnavailable(true);
    }
    setFeaturedProducts(initialFeaturedProducts);
    setAllProductsForSearch(initialAllProducts);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialFeaturedProducts, initialAllProducts, errorFetchingInitialData]);

  const handleToggleWishlist = (productId: string) => {
    if (!isClient) return;
    const product = featuredProducts.find(p => p.id === productId) || allProductsForSearch.find(p => p.id === productId);
    const productName = product?.name || "Product";

    if (wishlistItems.includes(productId)) {
      setConfirmDialogState({ isOpen: true, productId, productName });
    } else {
      const newWishlist = [...wishlistItems, productId];
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(newWishlist));
      setWishlistItems(newWishlist);
      toast({
        title: "Added to Wishlist",
        description: `${productName} has been added to your wishlist.`,
        variant: "default"
      });
      window.dispatchEvent(new StorageEvent('storage', { key: WISHLIST_STORAGE_KEY }));
    }
  };
  
  const handleConfirmRemove = () => {
    if (!confirmDialogState.productId || !confirmDialogState.productName) return;
    const { productId: idToRemove, productName } = confirmDialogState;

    const newWishlist = wishlistItems.filter(itemId => itemId !== idToRemove);
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(newWishlist));
    setWishlistItems(newWishlist);
    toast({
      title: "Removed from Wishlist",
      description: `${productName} has been removed from your wishlist.`,
      variant: "default"
    });
    window.dispatchEvent(new StorageEvent('storage', { key: WISHLIST_STORAGE_KEY }));
    setConfirmDialogState({ isOpen: false, productId: null, productName: null });
  };

  const handleCancelRemove = () => {
    setConfirmDialogState({ isOpen: false, productId: null, productName: null });
  };

  const handleHomepageSearch = (searchTerm: string) => {
    const trimmedSearchTerm = searchTerm.trim();

    if (!trimmedSearchTerm) {
      if (pathname.includes('/collections') && searchParams.has('search')) {
        router.push('/collections');
      }
      return;
    }

    const lowerSearchTerm = trimmedSearchTerm.toLowerCase();
    const uniqueProductCategories = Array.from(new Set(allProductsForSearch.map(p => p.category).filter(Boolean) as string[]));
    const matchedCategory = uniqueProductCategories.find(cat => cat.toLowerCase() === lowerSearchTerm);

    if (matchedCategory) {
      router.push(`/collections?category=${encodeURIComponent(matchedCategory)}&search=${encodeURIComponent(trimmedSearchTerm)}`);
    } else {
      router.push(`/collections?search=${encodeURIComponent(trimmedSearchTerm)}`);
    }
  };

  const handleAiAdvisorClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === '/') {
      e.preventDefault();
      const section = document.getElementById('ai-decor-advisor');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };
  
  const showLoadingOrNoProductsMessage = productsUnavailable || (!errorFetchingInitialData && featuredProducts.length === 0);


  return (
    <>
      {isClient && <WelcomeLoader />}
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-grow container mx-auto px-2 py-8 md:py-12">

          <section
            className="relative text-center bg-cover bg-fixed bg-center min-h-[60vh] md:min-h-[70vh] flex flex-col items-center justify-center"
            style={{
              backgroundImage:
                "url('https://instagram.fdel11-3.fna.fbcdn.net/v/t51.2885-15/506007921_17843711043510460_6632509365454219861_n.jpg?stp=dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0uaW1hZ2VfdXJsZ2VuLjE0NDB4MTQ0MC5zZHIuZjc1NzYxLmRlZmF1bHRfaW1hZ2UifQ&_nc_ht=instagram.fdel11-3.fna.fbcdn.net&_nc_cat=104&_nc_oc=Q6cZ2QG4C2z8WDV8_p4pCL47RpA8QF9BGc-5A7-ysOvygWrlG62kTRvpj1rV1l38g0Ez5vqrrxrc1huvIzmEHK_A0Tl7&_nc_ohc=pvzG9wUr7H8Q7kNvwEuFqZH&_nc_gid=nQjJp0gaIB6aSR60PMpgbQ&edm=APoiHPcBAAAA&ccb=7-5&ig_cache_key=MzY1NDY2MTM3MjI5NTY1NzkwMg%3D%3D.3-ccb7-5&oh=00_AfOAwg6OY-Sb3mBeStUs3WvIpLvil8-TLViMuLGFVhVnfg&oe=6854709F&_nc_sid=22de04')",
            }}
            aria-labelledby="hero-title"
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
            <div className="relative z-10 p-4">
              <h1 id="hero-title" className="text-5xl md:text-6xl font-headline text-white mb-6 animate-fade-in-down">
                Discover Your Signature Style
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-8 animate-fade-in-up">
                Explore Aarambh Decor's curated collection of home decor that tells a story.
                Find pieces that resonate with your soul and transform your space.
              </p>
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground animate-fade-in-up animation-delay-200">
                <Link href="/collections">
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Shop The Collection
                </Link>
              </Button>
            </div>
          </section>

          <Separator className="my-12 md:my-16 border-border/70" />

          <section id="homepage-search" aria-labelledby="homepage-search-title" className="py-8 md:py-12">
            <div className="flex flex-col items-center justify-center space-y-6 mb-10 md:mb-12 animate-fade-in-up animation-delay-200">
              <div className="flex flex-row items-center justify-center space-x-3">
                <SearchIcon className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 text-primary" />
                <h2 id="homepage-search-title" className="text-2xl sm:text-3xl md:text-4xl font-headline text-center text-foreground">
                  Find Your Perfect Piece
                </h2>
              </div>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto text-center">
                Search our collections by product name or category to quickly find what you're looking for.
              </p>
              <SearchBar
                onSearch={handleHomepageSearch}
                placeholder="Search products or categories..."
                className="mt-4"
                debounceDelay={500}
              />
            </div>
          </section>

          <Separator className="my-12 md:my-16 border-border/70" />

          <section id="featured-product-showcase" aria-labelledby="featured-product-showcase-title" className="py-8">
            <div className="flex items-center justify-center space-x-3 mb-10 md:mb-12 animate-fade-in-up animation-delay-200">
              <Sparkles className="h-10 w-10 text-accent" />
              <h2 id="featured-product-showcase-title" className="text-3xl md:text-4xl font-headline text-center text-foreground">
                Featured Products
              </h2>
            </div>
            {showLoadingOrNoProductsMessage ? (
              <div className="flex justify-center items-center h-64">
                {productsUnavailable && ! (featuredProducts.length > 0) ? (
                     <p className="text-center text-destructive text-lg">Featured products could not be loaded. Please try again later.</p>
                ) : (
                    <>
                     <Loader2 className="h-12 w-12 text-primary animate-spin" />
                     <p className="ml-4 text-lg text-muted-foreground">Loading featured items...</p>
                    </>
                )}
              </div>
            ) : featuredProducts.length > 0 ? (
              <Carousel
                opts={{
                  align: "start",
                  loop: featuredProducts.length > 3,
                }}
                className="w-full max-w-5xl mx-auto animate-fade-in-up animation-delay-400 group"
              >
                <CarouselContent className="-ml-4">
                  {featuredProducts.map((product) => (
                    <CarouselItem key={product.id} className="pl-4 basis-1/2 md:basis-1/3">
                      <div className="p-1 h-full flex">
                        <ProductCard
                          product={product}
                          isWishlisted={wishlistItems.includes(product.id)} 
                          onToggleWishlist={handleToggleWishlist}
                          className="w-full flex flex-col"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                 <CarouselPrevious
                    variant="ghost"
                    className={cn(
                      "absolute left-[-10px] top-1/2 -translate-y-1/2 z-10",
                      "h-10 w-10 rounded-full",
                      "bg-background/70 text-foreground/70",
                      "hover:bg-background/90 hover:text-primary",
                      "shadow-md",
                      "opacity-0 group-hover:opacity-100 focus-visible:opacity-100",
                      "transition-opacity duration-200 ease-in-out",
                      "md:left-[-20px]",
                      "disabled:opacity-30 disabled:cursor-not-allowed"
                    )}
                />
                <CarouselNext
                    variant="ghost"
                    className={cn(
                      "absolute right-[-10px] top-1/2 -translate-y-1/2 z-10",
                      "h-10 w-10 rounded-full",
                      "bg-background/70 text-foreground/70",
                      "hover:bg-background/90 hover:text-primary",
                      "shadow-md",
                      "opacity-0 group-hover:opacity-100 focus-visible:opacity-100",
                      "transition-opacity duration-200 ease-in-out",
                      "md:right-[-20px]",
                      "disabled:opacity-30 disabled:cursor-not-allowed"
                    )}
                />
              </Carousel>
            ) : (
              <p className="text-center text-muted-foreground text-lg">No featured products to display at the moment. Please check back soon!</p>
            )}
            <div className="text-center mt-12 animate-fade-in-up">
              <Button asChild variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10">
                <Link href="/collections">View All Collections</Link>
              </Button>
            </div>
          </section>

          <Separator className="my-12 md:my-20 border-border/70" />

          <section id="ai-decor-advisor" aria-labelledby="ai-decor-advisor-title" className="py-8">
            <div className="flex items-center justify-center space-x-3 mb-10 md:mb-12 animate-fade-in-up animation-delay-200">
              <h2 id="ai-decor-advisor-title" className="text-3xl md:text-4xl font-headline text-center text-foreground">
                Need Inspiration?<br />Try Our AI Advisor!
              </h2>
            </div>
            <div className="animate-fade-in-up animation-delay-400">
              <ImageBasedProductRecommender />
            </div>
          </section>
        </main>
        <InstagramReelsSection />
        <Footer />
      </div>
      <AlertDialog open={confirmDialogState.isOpen} onOpenChange={(open) => { if (!open) handleCancelRemove(); }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Removal</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove "{confirmDialogState.productName || 'this item'}" from your wishlist?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancelRemove}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmRemove} className="bg-destructive hover:bg-destructive/90">Remove</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
