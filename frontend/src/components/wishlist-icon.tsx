
'use client';

import type { ComponentProps } from 'react';
import { Heart } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '../lib/utils';

interface WishlistIconProps extends ComponentProps<typeof Button> {
  isWishlisted: boolean;
  onClick: () => void;
}

export function WishlistIcon({ isWishlisted, onClick, className, ...props }: WishlistIconProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onClick}
      className={cn(
        "rounded-full hover:bg-red-100 dark:hover:bg-red-900/50",
        isWishlisted ? "text-red-500 hover:text-red-600" : "text-muted-foreground hover:text-red-500",
        className
      )}
      aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
      {...props}
    >
      <Heart className={cn("h-5 w-5 transition-all", isWishlisted && "fill-red-500")} />
    </Button>
  );
}
