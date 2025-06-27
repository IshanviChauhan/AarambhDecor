
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { cn } from '../lib/utils'; // Import cn utility

export default function WelcomeLoader() {
  const [isVisible, setIsVisible] = useState(false); // Start as not visible, set true in useEffect
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) {
      return;
    }

    // Always show the welcome loader
    setIsVisible(true); // Make it visible immediately to start content animations

    // Timer to start fade-out of the entire loader
    // Content shown for 1.5 seconds, then 0.5s fade-out for a total of 2 seconds.
    const displayTimer = setTimeout(() => {
      setIsFadingOut(true); // Trigger fade-out animation for the loader

      // Timer to actually hide the loader after fade-out animation completes
      const fadeOutCompletionTimer = setTimeout(() => {
        setIsVisible(false); // Fully hide the loader component
      }, 500); // This duration should match your fade-out animation (0.5s)

      return () => clearTimeout(fadeOutCompletionTimer);
    }, 1500); // Show content for 1.5 seconds before starting loader fade-out

    return () => clearTimeout(displayTimer);
  }, [isMounted]);

  if (!isMounted || !isVisible) {
    return null;
  }

  return (
    // This outer div is the fixed overlay. It is immediately opaque if not fading out.
    <div
      className={cn(
        "fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-background",
        isFadingOut && "animate-fade-out" // Apply fade-out to the main loader container
      )}
    >
      {/* This inner div contains the animated content. Its animations run when loader first appears. */}
      <div className="text-center p-4 animate-fade-in-down">
        <Image
          src="https://instagram.fdel11-3.fna.fbcdn.net/v/t51.2885-19/505746725_17843352006510460_4000077421691590872_n.jpg?_nc_ht=instagram.fdel11-3.fna.fbcdn.net&_nc_cat=104&_nc_oc=Q6cZ2QGrole3olHTzDhyipLFazMcqxTH3BTY1mp1iUgGHh4vS9EKAKzwAqkfF7dIo9auedjAk-OgM_5e06tRXQpcQ518&_nc_ohc=PWAubMoouIAQ7kNvwGXkA7l&_nc_gid=FmC7UlvNMxPMW8Vr6tpdOA&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_AfPdwAvgOVVQOsnHh8uHrqXaxpnddaWxkGxDWyAHrd0Uzw&oe=685472D7&_nc_sid=7a9f4b"
          alt="Aarambh Decor Logo"
          width={80}
          height={80}
          priority
          className="object-contain rounded-lg mx-auto mb-4 md:mb-6 md:w-[100px] md:h-[100px] animate-pop-in"
          data-ai-hint="logo"
        />
        <h1 className="text-3xl md:text-5xl font-headline text-primary mb-3 md:mb-4 animate-fade-in-up animation-delay-200">
          Welcome to Aarambh Decor
        </h1>
        <p className="text-base md:text-lg text-muted-foreground animate-fade-in-up animation-delay-400">
          Crafting stories, one space at a time.
        </p>
      </div>
    </div>
  );
}
