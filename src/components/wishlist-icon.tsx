
'use client';

import type { ComponentProps } from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface WishlistIconProps extends ComponentProps<typeof Button> {
  isWishlisted: boolean; // This prop will likely always be false now
  onClick: () => void; // Will show a "disabled" message
}

export function WishlistIcon({ isWishlisted, onClick, className, ...props }: WishlistIconProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onClick} // onClick will now typically trigger a "feature disabled" toast
      className={cn(
        "rounded-full hover:bg-red-100 dark:hover:bg-red-900/50",
        // isWishlisted is false, so it will always be text-muted-foreground
        "text-muted-foreground hover:text-red-500", 
        className
      )}
      aria-label={"Wishlist (disabled)"}
      disabled // Make button visually and functionally disabled
      {...props}
    >
      {/* Heart will not be filled as isWishlisted will be false */}
      <Heart className={cn("h-5 w-5 transition-all")} />
    </Button>
  );
}
