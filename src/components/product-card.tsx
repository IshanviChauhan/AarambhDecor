
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
  isProductInCart?: boolean; // Kept for potential future use, but not directly used by new icon
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
      }, 1000); // Change image every 1 second
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
  }, [isHovering, imagesToDisplay.length]);

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
      "shadow-lg flex flex-col rounded-lg border-border/70 overflow-hidden",
      "w-[calc(50%-theme(spacing.3))] sm:flex-1 sm:min-w-[200px] sm:max-w-[300px]",
      "transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-2xl",
      "animate-pop-in",
      propClassName
    )}>
      <CardHeader
        className="p-0 relative"
      >
        <Link href={`/product/${product.id}`} aria-label={`View details for ${product.name}`}>
          <div
            className="relative w-full aspect-square rounded-t-lg"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div
              className="flex h-full transition-transform duration-500 ease-in-out"
              style={{
                width: `${imagesToDisplay.length * 100}%`,
                transform: `translateX(-${(currentImageIndex / imagesToDisplay.length) * 100}%)`
              }}
            >
              {imagesToDisplay.map((image, index) => (
                <div key={index} className="w-full h-full flex-shrink-0 relative" style={{ width: `${100 / imagesToDisplay.length}%`}}>
                  <Image
                    src={image.url}
                    alt={`${product.name} image ${index + 1}`}
                    layout="fill"
                    objectFit="cover"
                    className="w-full h-full rounded-t-lg object-top"
                    data-ai-hint={image.dataAiHint}
                  />
                </div>
              ))}
            </div>
          </div>
        </Link>
        <div className="absolute top-2 right-2 z-10">
          <WishlistIcon
            isWishlisted={isWishlisted}
            onClick={() => onToggleWishlist(product.id)}
            className="bg-background/70 hover:bg-background"
          />
        </div>
      </CardHeader>
      <CardContent className="p-3 flex flex-col flex-grow min-w-0">
        <div>
          <CardTitle className="font-headline text-lg mb-2 leading-tight break-words">
            <Link href={`/product/${product.id}`} className="hover:text-primary transition-colors">
              {product.name}
            </Link>
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground mb-2 line-clamp-3">{product.description}</CardDescription>
        </div>
        {product.price && (
          <div className="flex justify-between items-center mt-auto pt-2">
            <p className="font-semibold text-primary text-lg">{product.price}</p>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8" // Smaller icon button for a cleaner look
              onClick={() => onAddToCart(product)}
              aria-label="Add to cart"
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </div>
        )}
      </CardContent>
      <CardFooter className="px-3 pb-3 pt-0">
        {/* Add to Cart button removed from here */}
      </CardFooter>
    </Card>
  );
}

