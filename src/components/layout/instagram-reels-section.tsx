
'use client';

import { useState, useEffect } from 'react';
import type { InstagramReel } from '@/lib/types';
import { InstagramReelCard } from '@/components/instagram-reel-card';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { Instagram as InstagramIcon, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import REELS_DATA from '@/lib/data/reels.json';

export function InstagramReelsSection() {
  const [reels, setReels] = useState<InstagramReel[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setReels(REELS_DATA);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <section className="py-12 md:py-16 bg-background/70">
        <div className="container mx-auto px-4 text-center">
          <Loader2 className="h-8 w-8 text-primary animate-spin mx-auto" />
          <p className="text-muted-foreground mt-2">Loading Instagram Reels...</p>
        </div>
      </section>
    );
  }

  if (!reels || reels.length === 0) {
    return null; 
  }

  return (
    <section className="py-12 md:py-16 bg-gradient-to-br from-background via-secondary/10 to-background/30 border-t border-border/30">
      <div className="container mx-auto px-2 md:px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 md:mb-10">
          <div className="flex items-center space-x-3 mb-4 sm:mb-0">
            <InstagramIcon className="h-8 w-8 text-primary" />
            <h2 className="text-2xl md:text-3xl font-headline text-foreground">
              Explore More on Instagram
            </h2>
          </div>
          <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/10">
            <Link href="https://www.instagram.com/_aarambh_decor/" target="_blank" rel="noopener noreferrer">
              Follow @_aarambh_decor
            </Link>
          </Button>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: reels.length > 1, 
          }}
          className="w-full max-w-full group"
        >
          <CarouselContent className="-ml-2 md:-ml-4 py-2">
            {reels.map((reel) => (
              <CarouselItem key={reel.id} className="pl-2 md:pl-4 basis-auto">
                <InstagramReelCard reel={reel} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious
            variant="ghost"
            className={cn(
              "absolute left-[-10px] top-1/2 -translate-y-1/2 z-10",
              "h-10 w-10 rounded-full",
              "bg-background/70 text-foreground/70 hover:bg-background/90 hover:text-primary shadow-md",
              "opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity duration-200",
              "sm:left-0 md:left-[-15px]",
              reels.length <= 1 && "hidden"
            )}
            aria-label="Previous Instagram Reel"
          />
          <CarouselNext
            variant="ghost"
            className={cn(
              "absolute right-[-10px] top-1/2 -translate-y-1/2 z-10",
              "h-10 w-10 rounded-full",
              "bg-background/70 text-foreground/70 hover:bg-background/90 hover:text-primary shadow-md",
              "opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity duration-200",
              "sm:right-0 md:right-[-15px]",
               reels.length <= 1 && "hidden"
            )}
            aria-label="Next Instagram Reel"
          />
        </Carousel>
      </div>
    </section>
  );
}
