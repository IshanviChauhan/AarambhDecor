
'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Product, CartItem } from '@/lib/types';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { ProductCard } from '@/components/product-card';
import { ImageBasedProductRecommender } from '@/components/image-based-product-recommender';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Loader2, Sparkles, ShoppingBag, Search as SearchIcon, Star } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/auth-context';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { SearchBar } from '@/components/search-bar';
import WelcomeLoader from '@/components/welcome-loader';
import { getProducts } from '@/app/products/actions';
import { MOCK_PRODUCTS } from '@/lib/mock-data';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { cn } from '@/lib/utils';

const FEATURED_PRODUCTS_COUNT = 6;

export default function HomePage() {
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [allProductsForSearch, setAllProductsForSearch] = useState<Product[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const { toast } = useToast();
  const [isClient, setIsClient] = useState(false);
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  useEffect(() => {
    setIsClient(true);
    async function fetchInitialData() {
      setIsLoadingProducts(true);
      try {
        const latestMockProducts = MOCK_PRODUCTS.filter(p => p.isLatest === true).slice(0, FEATURED_PRODUCTS_COUNT);
        setFeaturedProducts(latestMockProducts);

        const all = await getProducts();
        setAllProductsForSearch(all);

      } catch (error) {
        console.error("Failed to fetch all products for search:", error);
        toast({ title: "Error", description: "Could not load all products for search.", variant: "destructive" });
        setAllProductsForSearch([]);
      } finally {
        setIsLoadingProducts(false);
      }
    }
    fetchInitialData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isClient) return;
    if (user) {
      const storedWishlist = localStorage.getItem(`aarambhWishlist_${user.uid}`);
      if (storedWishlist) {
        try {
          setWishlist(new Set(JSON.parse(storedWishlist)));
        } catch (e) {
          console.error("Failed to parse wishlist from localStorage", e);
        }
      }
      const storedCart = localStorage.getItem(`aarambhCart_${user.uid}`);
      if (storedCart) {
        try {
          setCartItems(JSON.parse(storedCart));
        } catch (e) {
          console.error("Failed to parse cart from localStorage", e);
        }
      }
    } else {
      setWishlist(new Set());
      setCartItems([]);
    }
  }, [isClient, user]);

  useEffect(() => {
    if (!isClient || !user) return;
    localStorage.setItem(`aarambhWishlist_${user.uid}`, JSON.stringify(Array.from(wishlist)));
  }, [wishlist, isClient, user]);

  useEffect(() => {
    if (!isClient || !user) return;
    localStorage.setItem(`aarambhCart_${user.uid}`, JSON.stringify(cartItems));
    window.dispatchEvent(new CustomEvent('aarambhCartUpdated'));
  }, [cartItems, isClient, user]);

  useEffect(() => {
    if (isClient) {
      const welcomeMessage = searchParams.get('welcome_message');
      if (welcomeMessage) {
        toast({
          title: "Login Successful",
          description: decodeURIComponent(welcomeMessage),
        });
        const newPath = window.location.pathname;
        router.replace(newPath, { scroll: false });
      }
    }
  }, [isClient, searchParams, router, toast]);

  const handleToggleWishlist = (productId: string) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to manage your wishlist.",
        variant: "destructive",
      });
      router.push('/signin');
      return;
    }
    setWishlist((prevWishlist) => {
      const newWishlist = new Set(prevWishlist);
      if (newWishlist.has(productId)) {
        newWishlist.delete(productId);
      } else {
        newWishlist.add(productId);
      }
      return newWishlist;
    });
  };

  const handleAddToCart = (product: Product) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to add items to your cart.",
        variant: "destructive",
      });
      router.push('/signin');
      return;
    }
    setCartItems((prevCartItems) => {
      const existingItem = prevCartItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevCartItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCartItems, { ...product, quantity: 1 }];
    });
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const isProductInCart = (productId: string) => {
    if (!isClient || !user) return false;
    return cartItems.some(item => item.id === productId);
  };

  const handleHomepageSearch = (searchTerm: string) => {
    const trimmedSearchTerm = searchTerm.trim();

    if (!trimmedSearchTerm) {
      if (window.location.pathname.includes('/collections') && window.location.search.includes('search=')) {
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

  return (
    <>
      {isClient && <WelcomeLoader />}
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-grow container mx-auto px-2 py-8 md:py-12">

          <section className="text-center pt-8 pb-12 md:pt-12 md:pb-16">
            <h1 className="text-5xl md:text-6xl font-headline text-primary mb-6 animate-fade-in-down">
              Discover Your Signature Style
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8 animate-fade-in-up">
              Explore Aarambh Decor's curated collection of home decor that tells a story.
              Find pieces that resonate with your soul and transform your space.
            </p>
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground animate-fade-in-up animation-delay-200">
              <Link href="/collections">
                <ShoppingBag className="mr-2 h-5 w-5" />
                Shop The Collection
              </Link>
            </Button>
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
              <Star className="h-10 w-10 text-accent" />
              <h2 id="featured-product-showcase-title" className="text-3xl md:text-4xl font-headline text-center text-foreground">
                Featured Products
              </h2>
            </div>
            {isLoadingProducts && !featuredProducts.length ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="h-12 w-12 text-primary animate-spin" />
                <p className="ml-4 text-lg text-muted-foreground">Loading featured items...</p>
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
                          isWishlisted={isClient && user ? wishlist.has(product.id) : false}
                          onToggleWishlist={handleToggleWishlist}
                          onAddToCart={handleAddToCart}
                          isProductInCart={isProductInCart(product.id)}
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
        <Footer />
      </div>
    </>
  );
}

    