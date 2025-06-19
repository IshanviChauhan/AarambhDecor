
'use client';

import { useState, useEffect, type FormEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';
import type { Product, Review, ProductImage } from '@/lib/types';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { WishlistIcon } from '@/components/wishlist-icon';
import { MessageCircle, ChevronLeft, Loader2, AlertTriangle, Info, Tag, Ruler, ShieldCheck, Send, Plus, Minus, Package, Star } from 'lucide-react';
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
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from '@/lib/utils';
import { getProductById, getProducts } from '@/app/products/actions';
import { ProductCard } from '@/components/product-card';
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
const WISHLIST_STORAGE_KEY = 'aarambhDecorWishlist';

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);
  const [allProducts, setAllProducts] = useState<Product[]>([]); // To find product names for suggested items
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const [isClient, setIsClient] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [emblaApi, setEmblaApi] = useState<CarouselApi>();
  const [wishlistItems, setWishlistItems] = useState<string[]>([]);
  const [confirmDialogState, setConfirmDialogState] = useState<{
    isOpen: boolean;
    productId: string | null;
    productName: string | null;
  }>({ isOpen: false, productId: null, productName: null });


  useEffect(() => {
    setIsClient(true);
    if (typeof window !== 'undefined') {
      const storedWishlist = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (storedWishlist) {
        setWishlistItems(JSON.parse(storedWishlist));
      }
    }

    if (productId) {
      const fetchProductAndSuggestions = async () => {
        setIsLoading(true);
        try {
          const fetchedProduct = await getProductById(productId);
          setProduct(fetchedProduct);

          const fetchedAllProducts = await getProducts();
          setAllProducts(fetchedAllProducts); // Store all products

          if (fetchedProduct && fetchedProduct.category) {
            const categorySuggestions = fetchedAllProducts.filter(
              p => p.id !== fetchedProduct.id && p.category === fetchedProduct.category
            ).slice(0, MAX_SUGGESTIONS);
            setSuggestedProducts(categorySuggestions);
          } else {
            setSuggestedProducts([]);
          }

        } catch (error) {
          console.error("Failed to fetch product details or suggestions:", error);
          toast({ title: "Error", description: "Could not load product details or suggestions.", variant: "destructive" });
          setProduct(null);
          setSuggestedProducts([]);
          setAllProducts([]);
        } finally {
          setIsLoading(false);
        }
      };
      fetchProductAndSuggestions();
    }
  }, [productId, toast]);

  const handleToggleWishlist = (idToToggle: string) => {
    if (!isClient) return;

    let nameOfProductToToggle = "Product";
    if (product?.id === idToToggle) {
      nameOfProductToToggle = product.name;
    } else {
      const suggestedProd = allProducts.find(p => p.id === idToToggle);
      if (suggestedProd) {
        nameOfProductToToggle = suggestedProd.name;
      }
    }
    
    if (wishlistItems.includes(idToToggle)) {
      setConfirmDialogState({ isOpen: true, productId: idToToggle, productName: nameOfProductToToggle });
    } else {
      const newWishlist = [...wishlistItems, idToToggle];
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(newWishlist));
      setWishlistItems(newWishlist);
      toast({
        title: "Added to Wishlist",
        description: `${nameOfProductToToggle} has been added to your wishlist.`,
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

  const handleIncreaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecreaseQuantity = () => {
    setQuantity(prev => Math.max(1, prev - 1));
  };

  const isProductWishlisted = product ? wishlistItems.includes(product.id) : false;

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
            setApi={setEmblaApi}
            className="w-full max-w-full md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto animate-fade-in-down animation-delay-200" 
            opts={{ loop: safeImageUrls.length > 1 }}
          >
            <CarouselContent>
              {safeImageUrls.map((image, index) => (
                <CarouselItem key={index}>
                  <div 
                    className={cn(
                        "relative aspect-square md:aspect-[1/1] rounded-lg overflow-hidden shadow-lg bg-card",
                        safeImageUrls.length > 1 && "cursor-pointer"
                    )}
                    onClick={() => {
                      if (safeImageUrls.length > 1) {
                        emblaApi?.scrollNext();
                      }
                    }}
                    role={safeImageUrls.length > 1 ? "button" : undefined}
                    tabIndex={safeImageUrls.length > 1 ? 0 : undefined}
                    onKeyDown={(e) => {
                        if (safeImageUrls.length > 1 && (e.key === 'Enter' || e.key === ' ')) {
                          e.preventDefault();
                          emblaApi?.scrollNext();
                        }
                    }}
                    aria-label={safeImageUrls.length > 1 ? `View next image for ${product.name}` : `Image ${index + 1} of ${product.name}`}
                  >
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
              <WishlistIcon
                isWishlisted={isProductWishlisted}
                onClick={() => handleToggleWishlist(product.id)}
                className="w-full sm:w-auto h-12 px-4 border border-input text-lg"
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
                          isWishlisted={wishlistItems.includes(suggestedProduct.id)} 
                          onToggleWishlist={handleToggleWishlist}
                          className="w-full flex flex-col" 
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                {/* CarouselPrevious and CarouselNext are conditionally rendered if suggestedProducts.length > 1 in carousel component */}
              </Carousel>
          </section>
        )}
      </main>
      <Footer />
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
    </div>
  );
}
