
'use client';

import Link from 'next/link';
import type { InstagramReel } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Heart, MessageCircle, Send } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface InstagramReelCardProps {
  reel: InstagramReel;
  className?: string;
}

export function InstagramReelCard({ reel, className }: InstagramReelCardProps) {
  const embedUrl = `${reel.instagramUrl}embed/`;

  return (
    <Card className={cn(
      "overflow-hidden rounded-lg shadow-lg w-[220px] sm:w-[250px] flex-shrink-0 snap-start bg-card border-border/70",
      "transition-all duration-300 ease-in-out hover:shadow-xl group",
      className
    )}>
      <div className="p-3 flex items-center space-x-2 border-b border-border/50">
        <Link href={reel.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label={`View profile of ${reel.username} on Instagram`}>
          <Avatar className="h-8 w-8">
            <AvatarImage src={reel.profileImageUrl} alt={reel.username} data-ai-hint="logo"/>
            <AvatarFallback>{reel.username.substring(0, 1).toUpperCase()}</AvatarFallback>
          </Avatar>
        </Link>
        <Link href={reel.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label={`View profile of ${reel.username} on Instagram`}>
          <span className="text-sm font-semibold text-foreground hover:underline">{reel.username}</span>
        </Link>
      </div>

      <div className="relative aspect-[4/5] w-full bg-muted/30 overflow-hidden">
        <iframe
          src={embedUrl}
          className="w-full h-full border-0"
          allowFullScreen
          scrolling="no"
          title={`Instagram reel by ${reel.username}: ${reel.caption || 'View on Instagram'}`}
        ></iframe>
      </div>

      <div className="p-3 space-y-1.5">
        <div className="flex items-center space-x-3 text-muted-foreground">
          <Link href={reel.instagramUrl} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1 hover:text-primary">
            <Heart size={20} />
            {reel.likes && <span className="text-xs">{reel.likes}</span>}
          </Link>
          <Link href={reel.instagramUrl} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1 hover:text-primary">
            <MessageCircle size={20} />
            {reel.comments && <span className="text-xs">{reel.comments}</span>}
          </Link>
          <Link href={reel.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
            <Send size={20} />
          </Link>
        </div>
        {reel.caption && (
          <p className="text-xs text-foreground line-clamp-2">
            <Link href={reel.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
              <span className="font-semibold">{reel.username}</span> {reel.caption}
            </Link>
          </p>
        )}
      </div>
    </Card>
  );
}
