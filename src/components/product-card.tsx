
'use client';

import { useState, useEffect, useRef } from 'react';
import type { Product } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { WishlistIcon } from './wishlist-icon';
import { ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
  onAddToCart: (product: Product) => void;
  isProductInCart?: boolean;
  className?: string;
}

export function ProductCard({ product, isWishlisted, onToggleWishlist, onAddToCart, isProductInCart, className: propClassName }: ProductCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const imagesToDisplay = product.imageUrls && product.imageUrls.length > 0
    ? product.imageUrls
    : [{ url: 'https://placehold.co/600x400.png', dataAiHint: 'placeholder image' }];

  useEffect(() => {
    if (isHovering && imagesToDisplay.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentImageIndex(prevIndex => (prevIndex + 1) % imagesToDisplay.length);
      }, 2000); // Change image every 2 seconds
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isHovering, imagesToDisplay.length]); // Updated dependency: imagesToDisplay.length

  const handleMouseEnter = () => {
    if (imagesToDisplay.length > 1) {
      setIsHovering(true);
    }
  };

  const handleMouseLeave = () => {
    if (imagesToDisplay.length > 1) {
      setIsHovering(false);
      setCurrentImageIndex(0); 
      if (intervalRef.current) {
        clearInterval(intervalRef.current); 
      }
    }
  };

  return (
    <Card className={cn(
      "overflow-hidden shadow-lg flex flex-col rounded-lg border-border/70",
      "flex-1 min-w-[200px] max-w-[300px]", // Adjusted for potentially better flex behavior
      "transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-2xl",
      "animate-pop-in", 
      propClassName
    )}>
      <CardHeader
        className="p-0 relative" // Keep relative for WishlistIcon positioning
      >
        <Link href={`/product/${product.id}`} aria-label={`View details for ${product.name}`}>
          <div 
            className="relative w-full h-52 overflow-hidden rounded-t-lg" // Container for sliding images, added rounded-t-lg
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div
              className="flex h-full transition-transform duration-500 ease-in-out"
              style={{ 
                width: `${imagesToDisplay.length * 100}%`, // Ensure filmstrip is wide enough
                transform: `translateX(-${(currentImageIndex / imagesToDisplay.length) * 100}%)` 
              }}
            >
              {imagesToDisplay.map((image, index) => (
                <div key={index} className="w-full h-full flex-shrink-0 relative" style={{ width: `${100 / imagesToDisplay.length}%`}}> {/* Each image container */}
                  <Image
                    src={image.url}
                    alt={`${product.name} image ${index + 1}`}
                    layout="fill"
                    objectFit="cover"
                    className="w-full h-full rounded-lg" // Ensure image fills its container
                    data-ai-hint={image.dataAiHint}
                  />
                </div>
              ))}
            </div>
          </div>
        </Link>
        <div className="absolute top-2 right-2 z-10"> {/* Ensure wishlist icon is above images */}
          <WishlistIcon
            isWishlisted={isWishlisted}
            onClick={() => onToggleWishlist(product.id)}
            className="bg-background/70 hover:bg-background"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex flex-col flex-grow min-w-0">
        <div> 
          <CardTitle className="font-headline text-xl mb-2 leading-tight break-words">
            <Link href={`/product/${product.id}`} className="hover:text-primary transition-colors">
              {product.name}
            </Link>
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground mb-2 line-clamp-3">{product.description}</CardDescription>
        </div>
        {product.price && <p className="font-semibold text-primary text-lg mt-auto pt-2">{product.price}</p>}
      </CardContent>
      <CardFooter className="p-4 pt-0 flex flex-col gap-2">
        <Button variant="outline" className="w-full" asChild>
          <Link href={`/product/${product.id}`}>View Details</Link>
        </Button>
        <Button
          variant="default"
          className="w-full"
          onClick={() => onAddToCart(product)}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          {isProductInCart ? 'Added to Cart' : 'Add to Cart'}
        </Button>
      </CardFooter>
    </Card>
  );
}
