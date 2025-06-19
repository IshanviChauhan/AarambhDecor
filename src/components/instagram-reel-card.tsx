
'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { InstagramReel } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Heart, MessageCircle, Send, Instagram as InstagramIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface InstagramReelCardProps {
  reel: InstagramReel;
  className?: string;
}

export function InstagramReelCard({ reel, className }: InstagramReelCardProps) {
  return (
    <Card className={cn(
      "overflow-hidden rounded-lg shadow-lg w-[280px] sm:w-[300px] flex-shrink-0 snap-start bg-card border-border/70",
      "transition-all duration-300 ease-in-out hover:shadow-xl group", // Added group for hover effect on image
      className
    )}>
      <Link href={reel.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label={`View reel by ${reel.username} on Instagram`}>
        <div className="p-3 flex items-center space-x-2 border-b border-border/50">
          <Avatar className="h-8 w-8">
            <AvatarImage src={reel.profileImageUrl} alt={reel.username} data-ai-hint="profile logo"/>
            <AvatarFallback>{reel.username.substring(0, 1).toUpperCase()}</AvatarFallback>
          </Avatar>
          <span className="text-sm font-semibold text-foreground">{reel.username}</span>
        </div>

        <div className="relative aspect-[9/16] w-full bg-muted/30 overflow-hidden">
          <Image
            src={reel.thumbnailUrl}
            alt={reel.caption || `Instagram reel by ${reel.username}`}
            fill
            style={{ objectFit: 'cover' }}
            data-ai-hint={reel.dataAiHint}
            sizes="(max-width: 640px) 80vw, 300px"
            className="transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-2 right-2 bg-black/50 text-white p-1.5 rounded-full">
            <InstagramIcon size={18} />
          </div>
        </div>

        <div className="p-3 space-y-1.5">
          <div className="flex items-center space-x-3 text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Heart size={20} className="hover:text-red-500" />
              {reel.likes && <span className="text-xs">{reel.likes}</span>}
            </div>
            <div className="flex items-center space-x-1">
              <MessageCircle size={20} className="hover:text-primary" />
              {reel.comments && <span className="text-xs">{reel.comments}</span>}
            </div>
            <Send size={20} className="hover:text-primary" />
          </div>
          {reel.caption && (
            <p className="text-xs text-foreground line-clamp-2">
              <span className="font-semibold">{reel.username}</span> {reel.caption}
            </p>
          )}
        </div>
      </Link>
    </Card>
  );
}
