'use client';

import type { Product } from '@/lib/types';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { WishlistIcon } from './wishlist-icon';
import { ExternalLink } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
}

export function ProductCard({ product, isWishlisted, onToggleWishlist }: ProductCardProps) {
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full rounded-lg border-border/70">
      <CardHeader className="p-0 relative">
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={600}
          height={400}
          className="object-cover w-full h-64"
          data-ai-hint={product.dataAiHint}
        />
        <div className="absolute top-2 right-2">
          <WishlistIcon 
            isWishlisted={isWishlisted} 
            onClick={() => onToggleWishlist(product.id)} 
            className="bg-background/70 hover:bg-background"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="font-headline text-xl mb-2 leading-tight">{product.name}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground mb-2 line-clamp-3">{product.description}</CardDescription>
        {product.price && <p className="font-semibold text-primary text-lg">{product.price}</p>}
      </CardContent>
      <CardFooter className="p-4 pt-0">
         {/* In a real app, this button would link to the product detail page */}
        <Button variant="outline" className="w-full" disabled> 
          View Details
        </Button>
        {/* Example of a direct shop link, if needed per product */}
        {/* <Button asChild variant="default" className="w-full mt-2">
          <a href={`https://www.aarambhdecor.com/products/${product.id}`} target="_blank" rel="noopener noreferrer">
            Shop Now <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </Button> */}
      </CardFooter>
    </Card>
  );
}
