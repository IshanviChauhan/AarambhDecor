
'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import type { Product, CartItem } from '@/lib/types';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { ProductCard } from '@/components/product-card';
import { Button } from '@/components/ui/button';
import { Loader2, Filter, Search } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { MOCK_PRODUCTS } from '@/lib/mock-data';
import { parsePrice } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/auth-context';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { SearchBar } from '@/components/search-bar';

const MIN_PRICE_DEFAULT = 0;
const MAX_PRICE_DEFAULT = 10000;

function CollectionsPageContent() {
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [minProductPrice, setMinProductPrice] = useState(MIN_PRICE_DEFAULT);
  const [maxProductPrice, setMaxProductPrice] = useState(MAX_PRICE_DEFAULT);
  const [priceRange, setPriceRange] = useState<[number, number]>([MIN_PRICE_DEFAULT, MAX_PRICE_DEFAULT]);
  
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');

  const { toast } = useToast();
  const [isClient, setIsClient] = useState(false);
  const { user } = useAuth();

  const categories = useMemo(() => {
    const uniqueCategories = new Set(allProducts.map(p => p.category).filter(Boolean) as string[]);
    return ['All', ...Array.from(uniqueCategories).sort()];
  }, [allProducts]);
  
  useEffect(() => {
    setIsClient(true);
    // Set searchTerm from URL on initial load or if URL changes directly
    const currentSearch = searchParams.get('search') || '';
    if (currentSearch !== searchTerm) {
        setSearchTerm(currentSearch);
    }
    
    const timer = setTimeout(() => {
      setAllProducts(MOCK_PRODUCTS);
      
      const prices = MOCK_PRODUCTS.map(p => parsePrice(p.price)).filter(p => p > 0);
      const minP = prices.length > 0 ? Math.min(...prices) : MIN_PRICE_DEFAULT;
      const maxP = prices.length > 0 ? Math.max(...prices) : MAX_PRICE_DEFAULT;
      setMinProductPrice(minP);
      setMaxProductPrice(maxP);
      setPriceRange([minP, maxP]);

      setIsLoadingProducts(false);
    }, 500); 
    return () => clearTimeout(timer);
  }, [searchParams]); // Rerun if searchParams change

  // Effect to synchronize selectedCategory with URL, and validate it
  useEffect(() => {
    if (isLoadingProducts || !isClient) return; // Wait for products to load, so `categories` list is accurate

    const categoryFromUrl = searchParams.get('category');

    if (categoryFromUrl) {
      if (categories.includes(categoryFromUrl)) {
        // Valid category from URL
        if (categoryFromUrl !== selectedCategory) { 
            setSelectedCategory(categoryFromUrl);
        }
      } else {
        // Category in URL is invalid
        if (selectedCategory !== null) { 
            setSelectedCategory(null); 
        }
        // Clean up the URL
        const currentParams = new URLSearchParams(Array.from(searchParams.entries()));
        currentParams.delete('category');
        router.replace(`${pathname}?${currentParams.toString()}`, { scroll: false });
      }
    } else {
      // No category in URL
      if (selectedCategory !== null) { 
          setSelectedCategory(null); 
      }
    }
  }, [searchParams, categories, isLoadingProducts, selectedCategory, router, pathname, isClient]);


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
    let products = allProducts;

    if (selectedCategory && selectedCategory !== 'All') {
      products = products.filter(p => p.category === selectedCategory);
    }

    products = products.filter(p => {
      const price = parsePrice(p.price);
      return price >= priceRange[0] && price <= priceRange[1];
    });

    if (searchTerm.trim()) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      products = products.filter(p => 
        p.name.toLowerCase().includes(lowerSearchTerm) ||
        p.description.toLowerCase().includes(lowerSearchTerm) ||
        (p.category && p.category.toLowerCase().includes(lowerSearchTerm))
      );
    }

    setFilteredProducts(products);
  }, [selectedCategory, allProducts, priceRange, searchTerm]);

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

  const handleCategoryFilter = (categoryValue: string) => {
    const newSelectedCategory = categoryValue === 'All' ? null : categoryValue;
    setSelectedCategory(newSelectedCategory);
  
    const currentParams = new URLSearchParams(Array.from(searchParams.entries()));
    if (newSelectedCategory) {
      currentParams.set('category', newSelectedCategory);
    } else {
      currentParams.delete('category');
    }
    router.push(`${pathname}?${currentParams.toString()}`, { scroll: false });
  };

  const handlePriceChange = (newRange: [number, number]) => {
    setPriceRange(newRange);
  };

  const handleCollectionSearch = (term: string) => {
    setSearchTerm(term);
    const currentParams = new URLSearchParams(Array.from(searchParams.entries())); 
    if (term.trim()) {
      currentParams.set('search', term.trim());
    } else {
      currentParams.delete('search');
    }
    router.push(`${pathname}?${currentParams.toString()}`, { scroll: false });
  };


  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-2 py-8 md:py-12">
        <section className="text-center mb-10 md:mb-12 animate-fade-in-down">
           <div className="flex items-center justify-center space-x-3 mb-4">
            <Filter className="h-10 w-10 text-primary" />
            <h1 className="text-4xl md:text-5xl font-headline text-primary">
              Our Collections
            </h1>
          </div>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Browse through our diverse range of handcrafted decor items. Filter by category and price to find exactly what you're looking for.
          </p>
        </section>
        
        <div className="grid grid-cols-1 md:grid-cols-4 xl:grid-cols-5 md:gap-8">
          <aside className="md:col-span-1 xl:col-span-1 mb-8 md:mb-0 animate-fade-in-down animation-delay-200">
            <Card className="p-4 shadow-md rounded-lg border-border/70 sticky top-24">
              <CardHeader className="p-0 mb-4">
                <div className="flex items-center space-x-2">
                  <Filter className="h-5 w-5 text-primary" />
                  <CardTitle className="font-headline text-xl text-primary">Filters</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-0 space-y-6">
                <div>
                  <h3 className="text-md font-semibold mb-2 text-foreground">Category</h3>
                  <Select
                    onValueChange={handleCategoryFilter}
                    value={selectedCategory || 'All'} // Controlled component
                  >
                    <SelectTrigger className="w-full text-base">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category} className="text-base">
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <h3 className="text-md font-semibold mb-2 text-foreground">Price Range</h3>
                  <Slider
                    value={priceRange}
                    onValueChange={handlePriceChange}
                    min={minProductPrice}
                    max={maxProductPrice}
                    step={50}
                    minStepsBetweenThumbs={1}
                    className="my-4"
                    aria-label="Price range slider"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Rs. {priceRange[0].toLocaleString()}</span>
                    <span>Rs. {priceRange[1].toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>

          <section id="product-listing" aria-labelledby="product-listing-title" className="md:col-span-3 xl:col-span-4 animate-fade-in-up animation-delay-400">
            <div className="mb-8">
                <SearchBar 
                  onSearch={handleCollectionSearch} 
                  placeholder="Search products in this collection..."
                  initialValue={searchTerm}
                />
            </div>
            {isLoadingProducts && !allProducts.length ? ( // Show loader only if products are truly not yet available
              <div className="flex justify-center items-center h-64">
                <Loader2 className="h-12 w-12 text-primary animate-spin" />
                <p className="ml-4 text-lg text-muted-foreground">Loading collection...</p>
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="flex flex-wrap justify-center gap-6 md:gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isWishlisted={isClient && user ? wishlist.has(product.id) : false}
                    onToggleWishlist={handleToggleWishlist}
                    onAddToCart={handleAddToCart}
                    isProductInCart={isProductInCart(product.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center text-muted-foreground text-lg py-10">
                 <Search className="h-12 w-12 text-primary mx-auto mb-4 opacity-70" />
                <p className="font-semibold text-xl mb-2">No Products Found</p>
                <p>
                {(searchTerm || selectedCategory) ? 
                  `Your filters for "${searchTerm || ''}${searchTerm && selectedCategory ? ' in ' : ''}${selectedCategory || ''}" did not match any products.`
                  : "There are no products in this collection yet."
                }
                </p>
                <p>Try adjusting your search or filters, or check back later!</p>
              </div>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}


export default function CollectionsPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-screen"><Loader2 className="h-12 w-12 text-primary animate-spin" /><p className="ml-4 text-lg">Loading...</p></div>}> {/* Suspense for useSearchParams */}
      <CollectionsPageContent />
    </Suspense>
  )
}
