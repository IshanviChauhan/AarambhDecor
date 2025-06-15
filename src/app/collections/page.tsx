
'use client';

import { useState, useEffect, useMemo } from 'react';
import type { Product, CartItem } from '@/lib/types';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { ProductCard } from '@/components/product-card';
import { Button } from '@/components/ui/button';
import { Loader2, LayoutGrid } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MOCK_PRODUCTS } from '@/lib/mock-data';


export default function CollectionsPage() {
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { toast } = useToast();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const timer = setTimeout(() => {
      setAllProducts(MOCK_PRODUCTS);
      setIsLoadingProducts(false);
    }, 500); 
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    const storedWishlist = localStorage.getItem('aarambhWishlist');
    if (storedWishlist) {
       try {
        setWishlist(new Set(JSON.parse(storedWishlist)));
      } catch (e) {
        console.error("Failed to parse wishlist from localStorage", e);
      }
    }
    const storedCart = localStorage.getItem('aarambhCart');
    if (storedCart) {
       try {
        setCartItems(JSON.parse(storedCart));
      } catch (e) {
        console.error("Failed to parse cart from localStorage", e);
      }
    }
  }, [isClient]);

  useEffect(() => {
    if (!isClient) return;
    localStorage.setItem('aarambhWishlist', JSON.stringify(Array.from(wishlist)));
  }, [wishlist, isClient]);

  useEffect(() => {
    if (!isClient) return;
    localStorage.setItem('aarambhCart', JSON.stringify(cartItems));
    window.dispatchEvent(new CustomEvent('aarambhCartUpdated'));
  }, [cartItems, isClient]);

  const categories = useMemo(() => {
    const uniqueCategories = new Set(allProducts.map(p => p.category).filter(Boolean) as string[]);
    return ['All', ...Array.from(uniqueCategories).sort()];
  }, [allProducts]);

  useEffect(() => {
    if (selectedCategory && selectedCategory !== 'All') {
      setFilteredProducts(allProducts.filter(p => p.category === selectedCategory));
    } else {
      setFilteredProducts(allProducts);
    }
  }, [selectedCategory, allProducts]);

  const handleToggleWishlist = (productId: string) => {
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
    if (!isClient) return false;
    return cartItems.some(item => item.id === productId);
  };

  const handleCategoryFilter = (categoryValue: string) => {
    setSelectedCategory(categoryValue === 'All' ? null : categoryValue);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <section className="text-center mb-10 md:mb-12">
           <div className="flex items-center justify-center space-x-3 mb-4">
            <LayoutGrid className="h-10 w-10 text-primary" />
            <h1 className="text-4xl md:text-5xl font-headline text-primary">
              Our Collections
            </h1>
          </div>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Browse through our diverse range of handcrafted decor items. Filter by category to find exactly what you're looking for.
          </p>
        </section>

        <section id="category-filters" className="mb-8 md:mb-10 flex justify-center">
          <Select
            onValueChange={handleCategoryFilter}
            defaultValue={selectedCategory || 'All'}
          >
            <SelectTrigger className="w-full max-w-xs text-base">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category} className="text-base">
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </section>
        
        <Separator className="my-8 md:my-10" />

        <section id="product-listing" aria-labelledby="product-listing-title">
          {isLoadingProducts ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-12 w-12 text-primary animate-spin" />
              <p className="ml-4 text-lg text-muted-foreground">Loading collection...</p>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isWishlisted={isClient && wishlist.has(product.id)}
                  onToggleWishlist={handleToggleWishlist}
                  onAddToCart={handleAddToCart}
                  isProductInCart={isProductInCart(product.id)}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground text-lg py-10">
              No products found for the selected category. Try a different filter!
            </p>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
