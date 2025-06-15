
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
  }, [isHovering, imagesToDisplay]);

  const handleMouseEnter = () => {
    if (imagesToDisplay.length > 1) {
      setIsHovering(true);
    }
  };

  const handleMouseLeave = () => {
    if (imagesToDisplay.length > 1) {
      setIsHovering(false);
      setCurrentImageIndex(0); // Reset to the first image on mouse leave
      if (intervalRef.current) {
        clearInterval(intervalRef.current); // Ensure interval is cleared immediately
      }
    }
  };

  const currentImage = imagesToDisplay[currentImageIndex];

  return (
    <Card className={cn(
      "overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col rounded-lg border-border/70",
      "flex-1 min-w-[200px] max-w-[300px]", // Responsive width classes
      propClassName
    )}>
      <CardHeader
        className="p-0 relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Link href={`/product/${product.id}`} aria-label={`View details for ${product.name}`}>
          <Image
            key={currentImage.url} // Add key for smooth transitions
            src={currentImage.url}
            alt={product.name}
            width={600}
            height={400}
            className="object-cover w-full h-64"
            data-ai-hint={currentImage.dataAiHint}
          />
        </Link>
        <div className="absolute top-2 right-2">
          <WishlistIcon
            isWishlisted={isWishlisted}
            onClick={() => onToggleWishlist(product.id)}
            className="bg-background/70 hover:bg-background"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow min-w-0">
        <CardTitle className="font-headline text-xl mb-2 leading-tight break-words">
           <Link href={`/product/${product.id}`} className="hover:text-primary transition-colors">
            {product.name}
           </Link>
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground mb-2 line-clamp-3">{product.description}</CardDescription>
        {product.price && <p className="font-semibold text-primary text-lg">{product.price}</p>}
      </CardContent>
      <CardFooter className="p-4 pt-0 flex flex-col gap-2">
        <Button variant="outline" className="w-full sm:flex-1" asChild>
          <Link href={`/product/${product.id}`}>View Details</Link>
        </Button>
        <Button
          variant="default"
          className="w-full"
          onClick={() => onAddToCart(product)}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          {/* {isProductInCart ? 'Added to Cart' : 'Add to Cart'} */}
        </Button>
      </CardFooter>
    </Card>
  );
}
