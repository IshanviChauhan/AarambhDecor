
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const WELCOME_SHOWN_KEY = 'aarambhWelcomeShown';

export default function WelcomeLoader() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) {
      return;
    }

    const hasBeenShown = localStorage.getItem(WELCOME_SHOWN_KEY);
    if (!hasBeenShown) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        localStorage.setItem(WELCOME_SHOWN_KEY, 'true');
      }, 3000); // Show for 3 seconds

      return () => clearTimeout(timer);
    }
  }, [isMounted]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-background animate-fade-in-down">
      <div className="text-center p-4">
        <Image
          src="https://instagram.fdel11-3.fna.fbcdn.net/v/t51.2885-19/505746725_17843352006510460_4000077421691590872_n.jpg?_nc_ht=instagram.fdel11-3.fna.fbcdn.net&_nc_cat=104&_nc_oc=Q6cZ2QGrole3olHTzDhyipLFazMcqxTH3BTY1mp1iUgGHh4vS9EKAKzwAqkfF7dIo9auedjAk-OgM_5e06tRXQpcQ518&_nc_ohc=PWAubMoouIAQ7kNvwGXkA7l&_nc_gid=FmC7UlvNMxPMW8Vr6tpdOA&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_AfPdwAvgOVVQOsnHh8uHrqXaxpnddaWxkGxDWyAHrd0Uzw&oe=685472D7&_nc_sid=7a9f4b"
          alt="Aarambh Decor Logo"
          width={100}
          height={100}
          priority
          className="object-contain rounded-sm mx-auto mb-6 animate-pop-in"
          data-ai-hint="logo"
        />
        <h1 className="text-4xl md:text-5xl font-headline text-primary mb-4 animate-fade-in-up animation-delay-200">
          Welcome to Aarambh Decor
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground animate-fade-in-up animation-delay-400">
          Crafting stories, one space at a time.
        </p>
      </div>
    </div>
  );
}
