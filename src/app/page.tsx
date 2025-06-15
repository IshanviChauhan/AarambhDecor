'use client';

import { useState, useEffect } from 'react';
import type { Product } from '@/lib/types';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { ProductCard } from '@/components/product-card';
import { StyleSuggester } from '@/components/style-suggester';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button'; // For potential future use (e.g. load more)
import { Loader2 } from 'lucide-react';

// Mock product data - in a real app, this would come from an API/database
const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Intricate Mandala Wall Art',
    description: 'Hand-painted wooden mandala, perfect for adding a spiritual and artistic touch to your living space. Each piece is unique.',
    careInstructions: 'Wipe clean with a soft, dry cloth. Avoid direct sunlight and moisture.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'mandala art',
    price: '₹2,499',
    category: 'Wall Art',
  },
  {
    id: '2',
    name: 'Elegant Ceramic Vase Set',
    description: 'Set of three minimalist ceramic vases in earthy tones, ideal for modern and traditional decor. Perfect for dried flowers or as standalone pieces.',
    careInstructions: 'Hand wash only with mild soap. Handle with care to avoid chipping.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'ceramic vase',
    price: '₹1,899',
    category: 'Tabletops',
  },
  {
    id: '3',
    name: 'Bohemian Tasseled Mirror',
    description: 'A stunning statement piece mirror framed with natural fibers and cotton tassels, adding a touch of boho chic to any room.',
    careInstructions: 'Clean mirror surface with glass cleaner. Dust tassels gently or use a low-suction vacuum attachment.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'boho mirror',
    price: '₹3,200',
    category: 'Mirrors',
  },
  {
    id: '4',
    name: 'Artisan-Crafted Table Runner',
    description: 'Hand-woven cotton table runner featuring traditional motifs and rich textures. Brings heritage and warmth to your dining experience.',
    careInstructions: 'Gentle hand wash or dry clean recommended. Iron on low heat on the reverse side.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'table runner',
    price: '₹1,550',
    category: 'Textiles',
  },
  {
    id: '5',
    name: 'Handcrafted Wooden Bowl',
    description: 'A versatile and beautiful wooden bowl, hand-carved by skilled artisans. Ideal for serving or as a decorative centerpiece.',
    careInstructions: 'Wipe with a damp cloth. Occasionally treat with food-safe mineral oil.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'wooden bowl',
    price: '₹1,250',
    category: 'Tabletops',
  },
  {
    id: '6',
    name: 'Expressive Abstract Canvas Art',
    description: 'Vibrant and expressive abstract art on canvas, ready to hang. Adds a contemporary flair and a pop of color to your walls.',
    careInstructions: 'Dust gently with a feather duster. Avoid placing in humid areas.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'abstract art',
    price: '₹4,500',
    category: 'Wall Art',
  },
];


export default function HomePage() {
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);

  // Simulate fetching products
  useEffect(() => {
    const timer = setTimeout(() => {
      setProducts(MOCK_PRODUCTS);
      setIsLoadingProducts(false);
    }, 1000); // Simulate network delay
    return () => clearTimeout(timer);
  }, []);

  // Load wishlist from localStorage on initial mount
  useEffect(() => {
    const storedWishlist = localStorage.getItem('aarambhWishlist');
    if (storedWishlist) {
      setWishlist(new Set(JSON.parse(storedWishlist)));
    }
  }, []);

  // Update localStorage when wishlist changes
  useEffect(() => {
    localStorage.setItem('aarambhWishlist', JSON.stringify(Array.from(wishlist)));
  }, [wishlist]);

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

        <section id="product-showcase" aria-labelledby="product-showcase-title">
          <h2 id="product-showcase-title" className="text-3xl font-headline text-center text-foreground mb-8 md:mb-10">
            Curated Collection
          </h2>
          {isLoadingProducts ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-12 w-12 text-primary animate-spin" />
              <p className="ml-4 text-lg text-muted-foreground">Loading treasures...</p>
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isWishlisted={wishlist.has(product.id)}
                  onToggleWishlist={handleToggleWishlist}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground text-lg">No products to display at the moment. Please check back soon!</p>
          )}
        </section>

        <Separator className="my-12 md:my-16" />

        <section id="style-suggestions" aria-labelledby="style-suggestions-title" className="py-8">
          <h2 id="style-suggestions-title" className="text-3xl font-headline text-center text-foreground mb-8 md:mb-10">
            Need Inspiration?
          </h2>
          <StyleSuggester />
        </section>
      </main>
      <Footer />
    </div>
  );
}
