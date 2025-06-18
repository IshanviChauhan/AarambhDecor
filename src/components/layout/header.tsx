
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { LayoutGrid, Home, Sparkles, ShoppingCart, Menu, UserPlus, LogIn } from 'lucide-react'; // Removed PlusSquare
import { Button } from '@/components/ui/button';
import { useRouter, usePathname } from 'next/navigation';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from '@/components/ui/separator';

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleAiAdvisorClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === '/') {
      e.preventDefault();
      const section = document.getElementById('ai-decor-advisor');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="py-4 px-2 md:px-4 border-b border-border/50 shadow-sm sticky top-0 bg-background/95 backdrop-blur-sm z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center group" aria-label="Aarambh Decor Home" onClick={() => setIsMobileMenuOpen(false)}>
          <Image
            src="https://instagram.fdel11-3.fna.fbcdn.net/v/t51.2885-19/505746725_17843352006510460_4000077421691590872_n.jpg?_nc_ht=instagram.fdel11-3.fna.fbcdn.net&_nc_cat=104&_nc_oc=Q6cZ2QGrole3olHTzDhyipLFazMcqxTH3BTY1mp1iUgGHh4vS9EKAKzwAqkfF7dIo9auedjAk-OgM_5e06tRXQpcQ518&_nc_ohc=PWAubMoouIAQ7kNvwGXkA7l&_nc_gid=FmC7UlvNMxPMW8Vr6tpdOA&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_AfPdwAvgOVVQOsnHh8uHrqXaxpnddaWxkGxDWyAHrd0Uzw&oe=685472D7&_nc_sid=7a9f4b"
            alt="Aarambh Decor Logo"
            width={40}
            height={40}
            priority
            className="object-contain rounded-lg transition-opacity group-hover:opacity-80"
          />
           <span
            className="ml-3 text-xl font-headline text-primary opacity-0 w-0 transform -translate-x-4
                       group-hover:opacity-100 group-hover:w-auto group-hover:translate-x-0
                       transition-all duration-500 ease-in-out overflow-hidden whitespace-nowrap"
          >
            Aarambh Decor
          </span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          <nav className="hidden md:flex items-center gap-1 sm:gap-0">
            <Button asChild variant="ghost">
              <Link href="/" aria-label="Home">
                <Home className="mr-2 h-4 w-4" />
                Home
              </Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/collections" aria-label="Collections">
                <LayoutGrid className="mr-2 h-4 w-4" />
                Collections
              </Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/#ai-decor-advisor" onClick={handleAiAdvisorClick} aria-label="AI Advisor">
                <Sparkles className="mr-2 h-4 w-4" />
                AI Advisor
              </Link>
            </Button>
             <Button asChild variant="ghost">
              <Link href="/register" aria-label="Register">
                <UserPlus className="mr-2 h-4 w-4" />
                Register
              </Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/signin" aria-label="Login">
                <LogIn className="mr-2 h-4 w-4" />
                Login
              </Link>
            </Button>
          </nav>

          {/* Cart Icon - No count displayed as user-specific cart is removed */}
          <Button asChild variant="ghost" className="relative" size="icon">
            <Link href="/cart" aria-label="View Cart">
              <ShoppingCart className="h-5 w-5" />
            </Link>
          </Button>

          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open menu">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[300px] p-4 flex flex-col">
                <SheetHeader className="mb-6 pb-3 border-b border-border">
                  <SheetTitle>
                    <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center group">
                      <Image
                        src="https://instagram.fdel11-3.fna.fbcdn.net/v/t51.2885-19/505746725_17843352006510460_4000077421691590872_n.jpg?_nc_ht=instagram.fdel11-3.fna.fbcdn.net&_nc_cat=104&_nc_oc=Q6cZ2QGrole3olHTzDhyipLFazMcqxTH3BTY1mp1iUgGHh4vS9EKAKzwAqkfF7dIo9auedjAk-OgM_5e06tRXQpcQ518&_nc_ohc=PWAubMoouIAQ7kNvwGXkA7l&_nc_gid=FmC7UlvNMxPMW8Vr6tpdOA&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_AfPdwAvgOVVQOsnHh8uHrqXaxpnddaWxkGxDWyAHrd0Uzw&oe=685472D7&_nc_sid=7a9f4b"
                        alt="Aarambh Decor Logo"
                        width={36}
                        height={36}
                        priority
                        className="object-contain rounded-lg"
                      />
                      <span className="ml-2 text-lg font-headline text-primary">Aarambh Decor</span>
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col space-y-1 flex-grow">
                  <Button asChild variant="ghost" className="w-full justify-start text-base py-3 px-2" onClick={() => setIsMobileMenuOpen(false)}>
                    <Link href="/" aria-label="Home">
                      <Home className="mr-3 h-5 w-5 text-primary" /> Home
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" className="w-full justify-start text-base py-3 px-2" onClick={() => setIsMobileMenuOpen(false)}>
                    <Link href="/collections" aria-label="Collections">
                      <LayoutGrid className="mr-3 h-5 w-5 text-primary" /> Collections
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" className="w-full justify-start text-base py-3 px-2">
                    <Link href="/#ai-decor-advisor" aria-label="AI Advisor" onClick={handleAiAdvisorClick}>
                      <Sparkles className="mr-3 h-5 w-5 text-primary" /> AI Advisor
                    </Link>
                  </Button>
                </nav>

                <Separator className="my-4" />
                <div className="flex flex-col space-y-1">
                    <Button asChild variant="ghost" className="w-full justify-start text-base py-3 px-2" onClick={() => setIsMobileMenuOpen(false)}>
                        <Link href="/register" aria-label="Register">
                          <UserPlus className="mr-3 h-5 w-5 text-primary" /> Register
                        </Link>
                    </Button>
                    <Button asChild variant="ghost" className="w-full justify-start text-base py-3 px-2" onClick={() => setIsMobileMenuOpen(false)}>
                        <Link href="/signin" aria-label="Login">
                          <LogIn className="mr-3 h-5 w-5 text-primary" /> Login
                        </Link>
                    </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
