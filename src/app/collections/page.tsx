
'use client';

import { useState, useEffect, useMemo, Suspense, useCallback } from 'react';
import type { Product } from '@/lib/types'; 
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { ProductCard } from '@/components/product-card';
import { Button } from '@/components/ui/button';
import { Loader2, Filter, Search, Layers, ChevronLeft, ChevronRight } from 'lucide-react';
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
import { parsePrice } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { SearchBar } from '@/components/search-bar';
import { getProducts } from '@/app/products/actions';


const MIN_PRICE_DEFAULT = 0;
const MAX_PRICE_DEFAULT = 10000;
const PRODUCTS_PER_PAGE = 10;
const WISHLIST_STORAGE_KEY = 'aarambhDecorWishlist';

function CollectionsPageContent() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [currentPage, setCurrentPage] = useState(1);
  const [wishlistItems, setWishlistItems] = useState<string[]>([]);

  const { toast } = useToast();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== 'undefined') {
      const storedWishlist = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (storedWishlist) {
        setWishlistItems(JSON.parse(storedWishlist));
      }
    }
    async function fetchInitialProducts() {
      console.log("CollectionsPage: Fetching initial products...");
      setIsLoadingProducts(true);
      try {
        const productsFromSource = await getProducts();
        console.log(`CollectionsPage: Fetched ${productsFromSource.length} products.`);
        setAllProducts(productsFromSource);
         if (productsFromSource.length === 0) {
          console.warn("CollectionsPage: No products were loaded from any source.");
           toast({ title: "No Products", description: "Could not load any products at this time.", variant: "default" });
        }
      } catch (error) {
        console.error("CollectionsPage: Failed to fetch products:", error);
        toast({ title: "Error", description: "Could not load products.", variant: "destructive" });
        setAllProducts([]);
      } finally {
        setIsLoadingProducts(false);
        console.log("CollectionsPage: Finished fetching initial products.");
      }
    }
    fetchInitialProducts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const categories = useMemo(() => {
    if (isLoadingProducts || allProducts.length === 0) return ['All'];
    const uniqueCategories = new Set(allProducts.map(p => p.category).filter(Boolean) as string[]);
    return ['All', ...Array.from(uniqueCategories).sort()];
  }, [allProducts, isLoadingProducts]);
  
  useEffect(() => {
    const currentSearchFromUrl = searchParams.get('search') || '';
    if (currentSearchFromUrl !== searchTerm) {
      setSearchTerm(currentSearchFromUrl);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const { minProductPrice: derivedMinPrice, maxProductPrice: derivedMaxPrice } = useMemo(() => {
    if (allProducts.length === 0 || isLoadingProducts) {
        return { minProductPrice: MIN_PRICE_DEFAULT, maxProductPrice: MAX_PRICE_DEFAULT };
    }
    const prices = allProducts.map(p => parsePrice(p.price)).filter(p => p > 0 && !isNaN(p));
    const minP = prices.length > 0 ? Math.min(...prices) : MIN_PRICE_DEFAULT;
    const maxP = prices.length > 0 ? Math.max(...prices) : MAX_PRICE_DEFAULT;
    return { minProductPrice: minP, maxProductPrice: maxP };
  }, [allProducts, isLoadingProducts]);

  const [priceRange, setPriceRange] = useState<[number, number]>(() => {
    const urlMinPriceStr = searchParams.get('minPrice');
    const urlMaxPriceStr = searchParams.get('maxPrice');
    const initialMinFromUrl = urlMinPriceStr ? parseInt(urlMinPriceStr, 10) : undefined;
    const initialMaxFromUrl = urlMaxPriceStr ? parseInt(urlMaxPriceStr, 10) : undefined;
    
    return [
        initialMinFromUrl ?? MIN_PRICE_DEFAULT, 
        initialMaxFromUrl ?? MAX_PRICE_DEFAULT
    ];
  });

  useEffect(() => {
    if (isLoadingProducts || allProducts.length === 0) return;

    const urlMinPriceStr = searchParams.get('minPrice');
    const urlMaxPriceStr = searchParams.get('maxPrice');

    let newMin = urlMinPriceStr ? parseInt(urlMinPriceStr, 10) : derivedMinPrice;
    let newMax = urlMaxPriceStr ? parseInt(urlMaxPriceStr, 10) : derivedMaxPrice;

    newMin = isNaN(newMin) ? derivedMinPrice : newMin;
    newMax = isNaN(newMax) ? derivedMaxPrice : newMax;

    newMin = Math.max(derivedMinPrice, Math.min(derivedMaxPrice, newMin));
    newMax = Math.max(derivedMinPrice, Math.min(derivedMaxPrice, newMax));

    if (newMin > newMax) newMin = newMax;
    
    if (priceRange[0] !== newMin || priceRange[1] !== newMax) {
        setPriceRange([newMin, newMax]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, [searchParams, derivedMinPrice, derivedMaxPrice, isLoadingProducts, allProducts.length]);


  useEffect(() => {
    if (isLoadingProducts || !isClient) return;

    const categoryFromUrl = searchParams.get('category');

    if (categoryFromUrl) {
      if (categories.includes(categoryFromUrl)) {
        if (categoryFromUrl !== selectedCategory) { 
            setSelectedCategory(categoryFromUrl);
        }
      } else {
        if (selectedCategory !== null) { 
            setSelectedCategory(null); 
        }
        if (!isLoadingProducts && categories.length > 1) {
            const currentParams = new URLSearchParams(Array.from(searchParams.entries()));
            currentParams.delete('category');
            router.replace(`${pathname}?${currentParams.toString()}`, { scroll: false });
        }
      }
    } else {
      if (selectedCategory !== null) { 
          setSelectedCategory(null); 
      }
    }
  }, [searchParams, categories, isLoadingProducts, selectedCategory, router, pathname, isClient]);


  const filteredProducts = useMemo(() => {
    if (isLoadingProducts) {
        return [];
    }
    let productsToFilter = [...allProducts];

    if (selectedCategory && selectedCategory !== 'All') {
      productsToFilter = productsToFilter.filter(p => p.category === selectedCategory);
    }

    productsToFilter = productsToFilter.filter(p => {
      const price = parsePrice(p.price);
      return price >= priceRange[0] && price <= priceRange[1];
    });

    if (searchTerm.trim()) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      productsToFilter = productsToFilter.filter(p => 
        p.name.toLowerCase().includes(lowerSearchTerm) ||
        p.description.toLowerCase().includes(lowerSearchTerm) ||
        (p.category && p.category.toLowerCase().includes(lowerSearchTerm))
      );
    }
    return productsToFilter;
  }, [isLoadingProducts, allProducts, selectedCategory, priceRange, searchTerm]);

  const totalPages = useMemo(() => {
    return Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE) || 1;
  }, [filteredProducts.length]);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  useEffect(() => {
    if (isLoadingProducts || !isClient) return;

    const pageFromUrlString = searchParams.get('page');
    let pageNum = 1;
    if (pageFromUrlString) {
        const parsed = parseInt(pageFromUrlString, 10);
        if (!isNaN(parsed) && parsed > 0) {
            pageNum = parsed;
        }
    }
    
    const newTotalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE) || 1;
    const validPage = Math.max(1, Math.min(pageNum, newTotalPages));
    
    if (currentPage !== validPage) {
      setCurrentPage(validPage);
    }
  }, [searchParams, isLoadingProducts, isClient, filteredProducts.length, currentPage, setCurrentPage]);


  const handleToggleWishlist = (productId: string) => {
    if (!isClient) return;
    const product = allProducts.find(p => p.id === productId);
    const productName = product?.name || "Product";

    setWishlistItems(prev => {
      const newWishlist = prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId];
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(newWishlist));
      toast({
        title: prev.includes(productId) ? "Removed from Wishlist" : "Added to Wishlist",
        description: `${productName} has been ${prev.includes(productId) ? 'removed from' : 'added to'} your wishlist.`,
        variant: "default"
      });
      return newWishlist;
    });
  };

  // Add to Cart functionality removed
  // const handleAddToCart = (product: Product) => { ... };
  
  const updateUrlParamsAndResetPage = (newParams: URLSearchParams) => {
    newParams.delete('page'); 
    router.push(`${pathname}?${newParams.toString()}`, { scroll: false });
  };

  const handleCategoryFilter = (categoryValue: string) => {
    const newSelectedCategory = categoryValue === 'All' ? null : categoryValue;
    const currentParams = new URLSearchParams(Array.from(searchParams.entries()));
    if (newSelectedCategory) {
      currentParams.set('category', newSelectedCategory);
    } else {
      currentParams.delete('category');
    }
    updateUrlParamsAndResetPage(currentParams);
  };

  const handlePriceChange = (newRange: [number, number]) => {
    setPriceRange(newRange); 
    const currentParams = new URLSearchParams(Array.from(searchParams.entries()));
    currentParams.set('minPrice', newRange[0].toString());
    currentParams.set('maxPrice', newRange[1].toString());
    updateUrlParamsAndResetPage(currentParams);
  };
  
  const handleCollectionSearch = useCallback((newSearchTerm: string) => {
    setSearchTerm(newSearchTerm); 
    const currentParams = new URLSearchParams(Array.from(searchParams.entries())); 
    if (newSearchTerm.trim()) {
      currentParams.set('search', newSearchTerm.trim());
    } else {
      currentParams.delete('search');
    }
    updateUrlParamsAndResetPage(currentParams);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, pathname, searchParams]);

  const handlePageNavigation = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
        const currentParams = new URLSearchParams(Array.from(searchParams.entries()));
        if (newPage === 1) {
            currentParams.delete('page');
        } else {
            currentParams.set('page', newPage.toString());
        }
        router.push(`${pathname}?${currentParams.toString()}`, { scroll: false });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-2 py-8 md:py-12">
        <section className="text-center mb-10 md:mb-12 animate-fade-in-down">
           <div className="flex items-center justify-center space-x-3 mb-4">
            <Layers className="h-10 w-10 text-primary" />
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
                    value={selectedCategory || searchParams.get('category') || 'All'}
                    disabled={isLoadingProducts || categories.length <=1}
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
                    min={derivedMinPrice}
                    max={derivedMaxPrice}
                    step={50}
                    minStepsBetweenThumbs={1}
                    className="my-4"
                    aria-label="Price range slider"
                    disabled={isLoadingProducts || allProducts.length === 0}
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
                  debounceDelay={300} 
                />
            </div>
            {isLoadingProducts ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="h-12 w-12 text-primary animate-spin" />
                <p className="ml-4 text-lg text-muted-foreground">Loading collection...</p>
              </div>
            ) : paginatedProducts.length > 0 ? (
              <>
                <div className="flex flex-wrap justify-center gap-6 md:gap-8">
                  {paginatedProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      isWishlisted={wishlistItems.includes(product.id)} 
                      onToggleWishlist={handleToggleWishlist}
                    />
                  ))}
                </div>
                {totalPages > 1 && (
                  <div className="mt-12 flex items-center justify-center space-x-2 sm:space-x-4">
                    <Button
                      variant="outline"
                      onClick={() => handlePageNavigation(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-3 py-2 sm:px-4"
                    >
                      <ChevronLeft className="h-5 w-5 sm:mr-1" />
                      <span className="hidden sm:inline">Previous</span>
                    </Button>
                    <span className="text-sm text-muted-foreground whitespace-nowrap">
                      Page {currentPage} of {totalPages}
                    </span>
                    <Button
                      variant="outline"
                      onClick={() => handlePageNavigation(currentPage + 1)}
                      disabled={currentPage === totalPages}
                       className="px-3 py-2 sm:px-4"
                    >
                      <span className="hidden sm:inline">Next</span>
                      <ChevronRight className="h-5 w-5 sm:ml-1" />
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center text-muted-foreground text-lg py-10">
                 <Search className="h-12 w-12 text-primary mx-auto mb-4 opacity-70" />
                <p className="font-semibold text-xl mb-2">No Products Found</p>
                <p>
                {(searchTerm || selectedCategory || searchParams.get('minPrice') || searchParams.get('maxPrice')) ? 
                  `Your filters did not match any products.`
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
    <Suspense fallback={<div className="flex justify-center items-center min-h-screen"><Loader2 className="h-12 w-12 text-primary animate-spin" /><p className="ml-4 text-lg">Loading...</p></div>}>
      <CollectionsPageContent />
    </Suspense>
  )
}
