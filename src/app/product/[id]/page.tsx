
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import type { Product, CartItem, Review } from '@/lib/types';
import { MOCK_PRODUCTS } from '@/lib/mock-data';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { WishlistIcon } from '@/components/wishlist-icon';
import { ShoppingCart, Star, MessageCircle, ChevronLeft, Loader2, AlertTriangle, Info, Tag, Ruler, ShieldCheck } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-5 w-5 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`}
        />
      ))}
    </div>
  );
};

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { toast } = useToast();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (productId) {
      const foundProduct = MOCK_PRODUCTS.find(p => p.id === productId);
      setProduct(foundProduct || null);
      setIsLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    if (!isClient) return;
    const storedWishlist = localStorage.getItem('aarambhWishlist');
    if (storedWishlist) {
      try {
        setWishlist(new Set(JSON.parse(storedWishlist)));
      } catch (e) { console.error("Failed to parse wishlist", e); }
    }
    const storedCart = localStorage.getItem('aarambhCart');
    if (storedCart) {
       try {
        setCartItems(JSON.parse(storedCart));
      } catch (e) { console.error("Failed to parse cart", e); }
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

  const handleToggleWishlist = (id: string) => {
    setWishlist(prev => {
      const newWishlist = new Set(prev);
      if (newWishlist.has(id)) newWishlist.delete(id);
      else newWishlist.add(id);
      return newWishlist;
    });
  };

  const handleAddToCart = (p: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === p.id);
      if (existing) {
        return prev.map(item => item.id === p.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...p, quantity: 1 }];
    });
    toast({ title: "Added to Cart", description: `${p.name} has been added.` });
  };

  const isProductInCart = product ? cartItems.some(item => item.id === product.id) : false;
  const isProductWishlisted = product ? wishlist.has(product.id) : false;

  if (isLoading || !isClient) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8 flex justify-center items-center">
          <Loader2 className="h-16 w-16 text-primary animate-spin" />
           <p className="ml-4 text-xl text-muted-foreground">Loading product details...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8 text-center">
          <AlertTriangle className="h-16 w-16 text-destructive mx-auto mb-4" />
          <h1 className="text-3xl font-headline text-destructive mb-2">Product Not Found</h1>
          <p className="text-muted-foreground mb-6">Sorry, we couldn't find the product you're looking for.</p>
          <Button asChild>
            <Link href="/collections">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Collections
            </Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="mb-6">
          <Button variant="outline" asChild size="sm">
            <Link href="/collections">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Collections
            </Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Image */}
          <div className="relative aspect-square md:aspect-[4/3] rounded-lg overflow-hidden shadow-lg border border-border/50">
            <Image
              src={product.imageUrl}
              alt={product.name}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 hover:scale-105"
              data-ai-hint={product.dataAiHint}
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col space-y-4">
            {product.category && (
              <Badge variant="secondary" className="w-fit text-sm py-1 px-3">{product.category}</Badge>
            )}
            <h1 className="text-3xl lg:text-4xl font-headline text-primary">{product.name}</h1>
            {product.price && (
              <p className="text-3xl font-semibold text-foreground">{product.price}</p>
            )}
            
            <p className="text-muted-foreground text-base leading-relaxed">{product.description}</p>

            <Separator className="my-4" />

            <div className="flex flex-col sm:flex-row gap-3">
              <Button size="lg" className="flex-1" onClick={() => handleAddToCart(product)}>
                <ShoppingCart className="mr-2 h-5 w-5" />
                {isProductInCart ? 'Add Another' : 'Add to Cart'}
              </Button>
              <WishlistIcon
                isWishlisted={isProductWishlisted}
                onClick={() => handleToggleWishlist(product.id)}
                className="w-full sm:w-auto h-12 px-4 border border-input hover:bg-red-100 dark:hover:bg-red-900/30 text-lg"
              />
            </div>

            <Accordion type="single" collapsible className="w-full pt-4">
              {product.sizeAndDimensions && (
                <AccordionItem value="size">
                  <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                    <Ruler className="mr-2 h-5 w-5 text-primary" /> Size & Dimensions
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground pt-2 pl-1">
                    {product.sizeAndDimensions}
                  </AccordionContent>
                </AccordionItem>
              )}
              {product.material && (
                 <AccordionItem value="material">
                  <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                    <Tag className="mr-2 h-5 w-5 text-primary" /> Material
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground pt-2 pl-1">
                    {product.material}
                  </AccordionContent>
                </AccordionItem>
              )}
              <AccordionItem value="care">
                <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                  <ShieldCheck className="mr-2 h-5 w-5 text-primary" /> Care Instructions
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground pt-2 pl-1">
                  {product.careInstructions}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        {/* Reviews Section */}
        {product.reviews && product.reviews.length > 0 && (
          <section id="reviews" className="mt-12 md:mt-16">
            <div className="flex items-center space-x-3 mb-6">
              <MessageCircle className="h-7 w-7 text-primary" />
              <h2 className="text-2xl lg:text-3xl font-headline text-foreground">Customer Reviews</h2>
            </div>
            <div className="space-y-6">
              {product.reviews.map((review, index) => (
                <Card key={index} className="shadow-md border-border/70">
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                      <CardTitle className="text-lg font-semibold">{review.reviewer}</CardTitle>
                      <StarRating rating={review.rating} />
                    </div>
                     <p className="text-xs text-muted-foreground">{new Date(review.date).toLocaleDateString()}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{review.comment}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}
         {(!product.reviews || product.reviews.length === 0) && (
          <section id="no-reviews" className="mt-12 md:mt-16 text-center">
             <Card className="py-8 px-4 inline-block shadow-md border-border/70">
              <Info className="h-8 w-8 text-primary mx-auto mb-3" />
              <p className="text-muted-foreground">No reviews yet for this product.</p>
              <p className="text-sm text-muted-foreground/80">Be the first to share your thoughts!</p>
            </Card>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
