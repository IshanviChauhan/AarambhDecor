
'use client';

import type { Product } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { WishlistIcon } from './wishlist-icon';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
  onAddToCart: (product: Product) => void;
  isProductInCart?: boolean;
}

export function ProductCard({ product, isWishlisted, onToggleWishlist, onAddToCart, isProductInCart }: ProductCardProps) {
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col rounded-lg border-border/70">
      <CardHeader className="p-0 relative">
        <Link href={`/product/${product.id}`} aria-label={`View details for ${product.name}`}>
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={600}
            height={400}
            className="object-cover w-full h-64"
            data-ai-hint={product.dataAiHint}
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
      <CardContent className="p-4 flex-grow">
        <CardTitle className="font-headline text-xl mb-2 leading-tight">
           <Link href={`/product/${product.id}`} className="hover:text-primary transition-colors">
            {product.name}
           </Link>
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground mb-2 line-clamp-3">{product.description}</CardDescription>
        {product.price && <p className="font-semibold text-primary text-lg">{product.price}</p>}
      </CardContent>
      <CardFooter className="p-4 pt-0 flex flex-col sm:flex-row gap-2">
        <Button variant="outline" className="w-full sm:flex-1" asChild> 
          <Link href={`/product/${product.id}`}>View Details</Link>
        </Button>
        <Button 
          variant="default" 
          className="w-full sm:flex-1" 
          onClick={() => onAddToCart(product)}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          {isProductInCart ? 'Added to Cart' : 'Add to Cart'}
        </Button>
      </CardFooter>
    </Card>
  );
}
