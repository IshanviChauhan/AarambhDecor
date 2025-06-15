
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
   {
    id: '7',
    name: 'Macrame Plant Hanger',
    description: 'Stylish macrame plant hanger, perfect for bringing greenery indoors. Fits various pot sizes.',
    careInstructions: 'Spot clean with a damp cloth. Keep away from direct flame.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'macrame plant',
    price: '₹899',
    category: 'Planters',
  },
  {
    id: '8',
    name: 'Ethnic Print Cushion Covers',
    description: 'Set of two vibrant cushion covers with traditional ethnic prints. Adds color and comfort to your sofa or bed.',
    careInstructions: 'Machine wash cold, gentle cycle. Tumble dry low.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'cushion covers',
    price: '₹1,299',
    category: 'Textiles',
  },
];


export default function CollectionsPage() {
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      setAllProducts(MOCK_PRODUCTS);
      setIsLoadingProducts(false);
    }, 500); 
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

  const categories = useMemo(() => {
    const uniqueCategories = new Set(allProducts.map(p => p.category).filter(Boolean) as string[]);
    return ['All', ...Array.from(uniqueCategories)];
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
    return cartItems.some(item => item.id === productId);
  };

  const handleCategoryFilter = (category: string | null) => {
    setSelectedCategory(category === 'All' ? null : category);
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

        <section id="category-filters" className="mb-8 md:mb-10">
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category || (category === 'All' && !selectedCategory) ? 'default' : 'outline'}
                onClick={() => handleCategoryFilter(category)}
                className="rounded-full px-4 py-2 text-sm md:text-base"
              >
                {category}
              </Button>
            ))}
          </div>
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
                  isWishlisted={wishlist.has(product.id)}
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
