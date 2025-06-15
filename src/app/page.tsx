
'use client';

import { useState, useEffect } from 'react';
import type { Product, CartItem } from '@/lib/types';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { ProductCard } from '@/components/product-card';
import { StyleSuggester } from '@/components/style-suggester';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Loader2, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

const NEW_IMAGE_URL = 'https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

// Mock product data
const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Intricate Mandala Wall Art',
    description: 'Hand-painted wooden mandala, perfect for adding a spiritual and artistic touch to your living space. Each piece is unique.',
    careInstructions: 'Wipe clean with a soft, dry cloth. Avoid direct sunlight and moisture.',
    imageUrl: NEW_IMAGE_URL,
    dataAiHint: 'mandala art',
    price: '₹2,499',
    category: 'Wall Art',
    isLatest: true,
  },
  {
    id: '2',
    name: 'Elegant Ceramic Vase Set',
    description: 'Set of three minimalist ceramic vases in earthy tones, ideal for modern and traditional decor. Perfect for dried flowers or as standalone pieces.',
    careInstructions: 'Hand wash only with mild soap. Handle with care to avoid chipping.',
    imageUrl: NEW_IMAGE_URL,
    dataAiHint: 'ceramic vase',
    price: '₹1,899',
    category: 'Tabletops',
    isLatest: true,
  },
  {
    id: '3',
    name: 'Bohemian Tasseled Mirror',
    description: 'A stunning statement piece mirror framed with natural fibers and cotton tassels, adding a touch of boho chic to any room.',
    careInstructions: 'Clean mirror surface with glass cleaner. Dust tassels gently or use a low-suction vacuum attachment.',
    imageUrl: NEW_IMAGE_URL,
    dataAiHint: 'boho mirror',
    price: '₹3,200',
    category: 'Mirrors',
    isLatest: true,
  },
  {
    id: '4',
    name: 'Artisan-Crafted Table Runner',
    description: 'Hand-woven cotton table runner featuring traditional motifs and rich textures. Brings heritage and warmth to your dining experience.',
    careInstructions: 'Gentle hand wash or dry clean recommended. Iron on low heat on the reverse side.',
    imageUrl: NEW_IMAGE_URL,
    dataAiHint: 'table runner',
    price: '₹1,550',
    category: 'Textiles',
  },
  {
    id: '5',
    name: 'Handcrafted Wooden Bowl',
    description: 'A versatile and beautiful wooden bowl, hand-carved by skilled artisans. Ideal for serving or as a decorative centerpiece.',
    careInstructions: 'Wipe with a damp cloth. Occasionally treat with food-safe mineral oil.',
    imageUrl: NEW_IMAGE_URL,
    dataAiHint: 'wooden bowl',
    price: '₹1,250',
    category: 'Tabletops',
  },
  {
    id: '6',
    name: 'Expressive Abstract Canvas Art',
    description: 'Vibrant and expressive abstract art on canvas, ready to hang. Adds a contemporary flair and a pop of color to your walls.',
    careInstructions: 'Dust gently with a feather duster. Avoid placing in humid areas.',
    imageUrl: NEW_IMAGE_URL,
    dataAiHint: 'abstract art',
    price: '₹4,500',
    category: 'Wall Art',
  },
];

const LATEST_PRODUCTS_COUNT = 3;

export default function HomePage() {
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [latestProducts, setLatestProducts] = useState<Product[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      const identifiedLatest = MOCK_PRODUCTS.filter(p => p.isLatest);
      if (identifiedLatest.length > 0) {
        setLatestProducts(identifiedLatest.slice(0, LATEST_PRODUCTS_COUNT));
      } else {
        setLatestProducts(MOCK_PRODUCTS.slice(0, LATEST_PRODUCTS_COUNT));
      }
      setIsLoadingProducts(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const storedWishlist = localStorage.getItem('aarambhWishlist');
    if (storedWishlist) {
      setWishlist(new Set(JSON.parse(storedWishlist)));
    }
    const storedCart = localStorage.getItem('aarambhCart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('aarambhWishlist', JSON.stringify(Array.from(wishlist)));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('aarambhCart', JSON.stringify(cartItems));
  }, [cartItems]);

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
    return cartItems.some(item => item.id === productId);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        
        <section className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-headline text-primary mb-4">
            Discover Your Signature Style
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore Aarambh Decor's curated collection of home decor that tells a story. 
            Find pieces that resonate with your soul and transform your space.
          </p>
        </section>

        <section id="latest-product-showcase" aria-labelledby="latest-product-showcase-title">
          <div className="flex items-center justify-center space-x-3 mb-8 md:mb-10">
            <Sparkles className="h-8 w-8 text-accent" />
            <h2 id="latest-product-showcase-title" className="text-3xl font-headline text-center text-foreground">
              New Arrivals
            </h2>
          </div>
          {isLoadingProducts ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-12 w-12 text-primary animate-spin" />
              <p className="ml-4 text-lg text-muted-foreground">Loading newest treasures...</p>
            </div>
          ) : latestProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {latestProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isWishlisted={wishlist.has(product.id)}
                  onToggleWishlist={handleToggleWishlist}
                  onAddToCart={handleAddToCart}
                  isProductInCart={isProductInCart(product.id)}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground text-lg">No new products to display at the moment. Please check back soon!</p>
          )}
          <div className="text-center mt-10">
            <Button asChild variant="secondary" size="lg">
              <Link href="/collections">View All Collections</Link>
            </Button>
          </div>
        </section>

        <Separator className="my-12 md:my-16" />

        <section id="style-suggestions" aria-labelledby="style-suggestions-title" className="py-8">
           <div className="flex items-center justify-center space-x-3 mb-8 md:mb-10">
            <h2 id="style-suggestions-title" className="text-3xl font-headline text-center text-foreground">
              Need Inspiration?
            </h2>
          </div>
          <StyleSuggester />
        </section>
      </main>
      <Footer />
    </div>
  );
}
