
'use client';

import { useState, useEffect, type FormEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';
import type { Product, Review, ProductImage } from '@/lib/types';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { WishlistIcon } from '@/components/wishlist-icon';
import { ShoppingCart, Star, MessageCircle, ChevronLeft, Loader2, AlertTriangle, Info, Tag, Ruler, ShieldCheck, Send, Plus, Minus, Package } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { cn } from '@/lib/utils';
import { getProductById, getProducts } from '@/app/products/actions';
import { ProductCard } from '@/components/product-card';

const StarRatingDisplay = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-5 w-5 ${i < rating ? 'text-accent fill-accent' : 'text-muted-foreground'}`}
        />
      ))}
    </div>
  );
};

const MAX_SUGGESTIONS = 4;

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const [isClient, setIsClient] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setIsClient(true);
    if (productId) {
      const fetchProductAndSuggestions = async () => {
        setIsLoading(true);
        try {
          const fetchedProduct = await getProductById(productId);
          setProduct(fetchedProduct);

          if (fetchedProduct && fetchedProduct.category) {
            const allProducts = await getProducts();
            const categorySuggestions = allProducts.filter(
              p => p.id !== fetchedProduct.id && p.category === fetchedProduct.category
            );
            setSuggestedProducts(categorySuggestions.slice(0, MAX_SUGGESTIONS));
          } else {
            setSuggestedProducts([]);
          }

        } catch (error) {
          console.error("Failed to fetch product details or suggestions:", error);
          toast({ title: "Error", description: "Could not load product details or suggestions.", variant: "destructive" });
          setProduct(null);
          setSuggestedProducts([]);
        } finally {
          setIsLoading(false);
        }
      };
      fetchProductAndSuggestions();
    }
  }, [productId, toast]);

  const handleToggleWishlist = (id: string) => {
    console.log("Wishlist functionality disabled for product:", id);
    toast({ title: "Feature Disabled", description: "Wishlist functionality is currently unavailable.", variant: "default"});
  };

  const handleAddToCart = (p: Product) => {
    console.log("Add to cart clicked for product:", p.name, "with quantity:", quantity);
    toast({ title: "Cart Disabled", description: "User-specific cart functionality is currently unavailable.", variant: "default" });
  };

  const handleIncreaseQuantity = () => {
    setQuantity(prev => prev + 1);
    console.log("Quantity increased (visual only)");
  };

  const handleDecreaseQuantity = () => {
    setQuantity(prev => Math.max(1, prev - 1));
    console.log("Quantity decreased (visual only)");
  };

  const isProductInCart = false;
  const isProductWishlisted = false;

  if (isLoading || !isClient) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-grow container mx-auto px-2 py-8 flex justify-center items-center">
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
        <main className="flex-grow container mx-auto px-2 py-8 text-center">
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
  
  const safeImageUrls = product.imageUrls && product.imageUrls.length > 0 
    ? product.imageUrls 
    : [{ url: 'https://placehold.co/800x600.png', dataAiHint: 'placeholder image' }];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-2 py-8 md:py-12">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <Carousel 
            className="w-full max-w-full md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto animate-fade-in-down animation-delay-200 group" 
            opts={{ loop: safeImageUrls.length > 1 }}
          >
            <CarouselContent>
              {safeImageUrls.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="relative aspect-square md:aspect-[1/1] rounded-lg overflow-hidden shadow-lg bg-card">
                    <Image
                      src={image.url}
                      alt={`${product.name} - Image ${index + 1}`}
                      fill 
                      style={{ objectFit: 'contain' }}
                      data-ai-hint={image.dataAiHint}
                      priority={index === 0}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {safeImageUrls.length > 1 && (
              <>
                <CarouselPrevious
                  variant="ghost"
                  className={cn(
                    "absolute left-2 top-1/2 z-10",
                    "h-10 w-10 rounded-full",
                    "bg-background/70 text-foreground/70",
                    "hover:bg-background/90 hover:text-primary",
                    "shadow-md",
                    "opacity-0 group-hover:opacity-100 focus-visible:opacity-100",
                    "transition-opacity duration-200 ease-in-out",
                    "flex items-center justify-center",
                    "border-none p-0",
                    "transform-none hover:transform-none active:transform-none",
                    "translate-y-[-50%]" 
                  )}
                />
                <CarouselNext
                  variant="ghost"
                  className={cn(
                    "absolute right-2 top-1/2 z-10",
                    "h-10 w-10 rounded-full",
                    "bg-background/70 text-foreground/70",
                    "hover:bg-background/90 hover:text-primary",
                    "shadow-md",
                    "opacity-0 group-hover:opacity-100 focus-visible:opacity-100",
                    "transition-opacity duration-200 ease-in-out",
                    "flex items-center justify-center",
                    "border-none p-0",
                    "transform-none hover:transform-none active:transform-none",
                    "translate-y-[-50%]"
                  )}
                />
              </>
            )}
          </Carousel>

          <div className="flex flex-col space-y-4 animate-fade-in-up animation-delay-400">
            {product.category && (
              <Badge variant="secondary" className="w-fit text-sm py-1 px-3">{product.category}</Badge>
            )}
            <h1 className="text-3xl lg:text-4xl font-headline text-primary">{product.name}</h1>
            
            <p className="text-muted-foreground text-base leading-relaxed">{product.description}</p>

            {product.price && (
              <p className="text-3xl font-semibold text-foreground">{product.price}</p>
            )}
             <p className="text-sm text-muted-foreground flex items-center">
              <Package className="mr-2 h-4 w-4 text-primary" /> Shipping calculated at checkout.
            </p>

            <Separator className="my-2" />

            <div className="flex items-center space-x-3 my-3">
              <p className="text-sm font-medium text-foreground">Quantity:</p>
              <Button variant="outline" size="icon" onClick={handleDecreaseQuantity} className="h-8 w-8" aria-label="Decrease quantity">
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-10 text-center text-base font-medium">{quantity}</span>
              <Button variant="outline" size="icon" onClick={handleIncreaseQuantity} className="h-8 w-8" aria-label="Increase quantity">
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                className="flex-1 h-12 px-8 py-2 rounded-md text-sm font-medium" 
                onClick={() => handleAddToCart(product)}
                disabled={!product}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart (Feature Disabled)
              </Button>
              <WishlistIcon
                isWishlisted={isProductWishlisted}
                onClick={() => handleToggleWishlist(product.id)}
                className="w-full sm:w-auto h-12 px-4 border border-input text-lg"
                disabled={!product}
              />
            </div>
            
            <div className="w-full pt-4">
              <Accordion type="single" collapsible className="w-full">
                {product.sizeAndDimensions && (
                  <AccordionItem value="size">
                    <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                      <Ruler className="mr-2 h-5 w-5 text-primary" /> Dimensions
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
                {product.careInstructions && (
                  <AccordionItem value="care">
                      <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                      <ShieldCheck className="mr-2 h-5 w-5 text-primary" /> Care Instructions
                      </AccordionTrigger>
                      <AccordionContent className="text-base text-muted-foreground pt-2 pl-1">
                      {product.careInstructions}
                      </AccordionContent>
                  </AccordionItem>
                )}
              </Accordion>
            </div>
          </div>
        </div>

        <section id="reviews" className="mt-12 md:mt-16 animate-fade-in-up animation-delay-200">
          <div className="flex items-center space-x-3 mb-6">
            <MessageCircle className="h-7 w-7 text-primary" />
            <h2 className="text-2xl lg:text-3xl font-headline text-foreground">Customer Reviews</h2>
          </div>
          {product.reviews && product.reviews.length > 0 ? (
            <div className="space-y-6">
              {product.reviews.map((review, index) => (
                <Card key={index} className="shadow-md border-border/70 animate-pop-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                      <CardTitle className="text-lg font-semibold">{review.reviewer}</CardTitle>
                      <StarRatingDisplay rating={review.rating} />
                    </div>
                     <p className="text-xs text-muted-foreground">{new Date(review.date).toLocaleDateString()}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{review.comment}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="py-8 px-4 text-center shadow-md border-border/70 animate-pop-in">
              <Info className="h-8 w-8 text-primary mx-auto mb-3" />
              <p className="text-muted-foreground">No reviews yet for this product.</p>
            </Card>
          )}
        </section>

        <section id="add-review" className="mt-12 md:mt-16 animate-fade-in-up animation-delay-400">
            <Card className="shadow-lg rounded-lg border-border/70 p-6">
              <CardHeader className="p-0 mb-4">
                <CardTitle className="font-headline text-2xl text-primary">Write a Review</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <p className="text-muted-foreground">
                  Review submission is currently disabled.
                </p>
              </CardContent>
            </Card>
        </section>
        
        {suggestedProducts.length > 0 && (
          <section id="suggested-products" className="mt-12 md:mt-20 py-8 animate-fade-in-up animation-delay-200">
            <h2 className="text-2xl lg:text-3xl font-headline text-foreground text-center mb-8 md:mb-10">
              You may also like
            </h2>
             <Carousel
                opts={{
                  align: "start",
                  loop: suggestedProducts.length > 3, 
                }}
                className="w-full max-w-5xl mx-auto group"
              >
                <CarouselContent className="-ml-4">
                  {suggestedProducts.map((suggestedProduct) => (
                    <CarouselItem key={suggestedProduct.id} className="pl-4 basis-full sm:basis-1/2 md:basis-1/3">
                      <div className="p-1 h-full flex">
                        <ProductCard
                          product={suggestedProduct}
                          isWishlisted={false} 
                          onToggleWishlist={handleToggleWishlist} 
                          onAddToCart={handleAddToCart} 
                          isProductInCart={false}
                          className="w-full flex flex-col" 
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                {suggestedProducts.length > 1 && (
                  <>
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
                  </>
                )}
              </Carousel>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}

