
'use client';

import { useState, useEffect, useRef } from 'react';
import type { Product } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
// ShoppingCart icon and Button for Add to Cart are removed
import { WishlistIcon } from './wishlist-icon';
import { cn } from '@/lib/utils';
// useToast is removed as it's handled by parent components for wishlist

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
  className?: string;
}

export function ProductCard({ product, isWishlisted, onToggleWishlist, className: propClassName }: ProductCardProps) {
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
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      // Reset to first image when not hovering if there are multiple images
      if (imagesToDisplay.length > 1) {
        setCurrentImageIndex(0);
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
      // The useEffect will reset currentImageIndex to 0 when isHovering becomes false
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
            className="relative w-full aspect-square rounded-t-lg overflow-hidden"
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
                    fill
                    style={{ objectFit: 'contain', objectPosition: 'center'}}
                    data-ai-hint={image.dataAiHint}
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    priority={index === 0}
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
            {/* Add to Cart button removed */}
          </div>
        )}
      </CardContent>
      <CardFooter className="px-3 pb-3 pt-0">
      </CardFooter>
    </Card>
  );
}
