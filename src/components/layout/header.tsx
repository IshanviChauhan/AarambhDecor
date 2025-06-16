
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { LayoutGrid, Home, Sparkles, ShoppingCart, LogIn, UserCircle, LogOut, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { CartItem } from '@/lib/types';
import { useAuth } from '@/contexts/auth-context';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { useRouter, usePathname } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Header() {
  const [cartItemCount, setCartItemCount] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const calculateTotalItems = () => {
      let storedCart = null;
      if (user) {
        storedCart = localStorage.getItem(`aarambhCart_${user.uid}`);
      } else {
        setCartItemCount(0);
        return;
      }

      if (storedCart) {
        try {
          const items: CartItem[] = JSON.parse(storedCart);
          const total = items.reduce((sum, item) => sum + item.quantity, 0);
          setCartItemCount(total);
        } catch (e) {
          console.error("Failed to parse cart from localStorage", e);
          setCartItemCount(0);
        }
      } else {
        setCartItemCount(0);
      }
    };

    calculateTotalItems();

    const handleCartUpdateEvent = () => {
      calculateTotalItems();
    };

    const handleStorageChange = (event: StorageEvent) => {
        if (user && event.key === `aarambhCart_${user.uid}`) {
            calculateTotalItems();
        } else if (!user && event.key && event.key.startsWith('aarambhCart_')) {
            // If user logs out, cart for that UID might be cleared, recalculate.
            // This also covers general cart updates if a generic key was used (though we use UID specific)
            calculateTotalItems();
        }
    };


    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('aarambhCartUpdated', handleCartUpdateEvent as EventListener);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('aarambhCartUpdated', handleCartUpdateEvent as EventListener);
    };
  }, [isClient, user]);

  const handleSignOut = async () => {
    try {
      if (user) { // Clear user-specific data from localStorage
        localStorage.removeItem(`aarambhCart_${user.uid}`);
        localStorage.removeItem(`aarambhWishlist_${user.uid}`);
      }
      await signOut(auth);
      // Dispatch cart update event *after* user state is nullified from AuthProvider,
      // so header re-renders and calculateTotalItems sees user as null.
      // The AuthProvider's onAuthStateChanged will set user to null, triggering a re-render.
      // The cart update event then ensures count becomes 0.
      window.dispatchEvent(new CustomEvent('aarambhCartUpdated')); 
      router.push('/');
      toast({ title: "Signed Out", description: "You have been successfully signed out." });
    } catch (error) {
      console.error("Error signing out: ", error);
      toast({ title: "Sign Out Error", description: "Failed to sign out. Please try again.", variant: "destructive" });
    }
  };

  const handleAiAdvisorClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === '/') {
      e.preventDefault(); 
      const section = document.getElementById('ai-decor-advisor');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    // If not on homepage, Link component's default behavior will navigate and scroll
    setIsMobileMenuOpen(false); // Close mobile menu if open
  };

  return (
    <header className="py-4 px-2 md:px-4 border-b border-border/50 shadow-sm sticky top-0 bg-background/95 backdrop-blur-sm z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center group" aria-label="Aarambh Decor Home" onClick={() => setIsMobileMenuOpen(false)}>
          <Image
            src="https://instagram.fdel11-3.fna.fbcdn.net/v/t51.2885-19/505746725_17843352006510460_4000077421691590872_n.jpg?_nc_ht=instagram.fdel11-3.fna.fbcdn.net&_nc_cat=104&_nc_oc=Q6cZ2QGrole3olHTzDhyipLFazMcqxTH3BTY1mp1iUgGHh4vS9EKAKzwAqkfF7dIo9auedjAk-OgM_5e06tRXQpcQ518&_nc_ohc=PWAubMoouIAQ7kNvwGXkA7l&_nc_gid=FmC7UlvNMxPMW8Vr6tpdOA&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_AfPdwAvgOVVQOsnHh8uHrqXaxpnddaWxkGxDWyAHrd0Uzw&oe=685472D7&_nc_sid=7a9f4b"
            alt="Aarambh Decor Logo"
            width={50}
            height={50}
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

        {/* Navigation and Actions Wrapper */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Desktop Navigation Links */}
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
          </nav>

          {/* Auth and Cart Icons */}
          {!authLoading && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="User menu">
                  <UserCircle className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">My Account</p>
                    {user.email && (
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    )}
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="cursor-pointer">
                    <UserCircle className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={handleSignOut} className="cursor-pointer text-destructive focus:bg-destructive/10 focus:text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : !authLoading && !user ? (
              <div className="flex items-center gap-1">
                <Button asChild variant="default" className="text-primary-foreground bg-primary hover:bg-primary/90">
                  <Link href="/signin" aria-label="Log In">
                    <LogIn className="mr-2 h-4 w-4 sm:hidden md:inline-block" />
                    Log In
                  </Link>
                </Button>
                <Button asChild variant="ghost" size="icon" aria-label="View Profile">
                    <Link href="/profile">
                        <UserCircle className="h-5 w-5" />
                    </Link>
                </Button>
              </div>
          ) : (
             <div className="w-10 h-10"></div> 
          )}

          <Button asChild variant="ghost" className="relative" size="icon">
            <Link href="/cart" aria-label="View Cart">
              <ShoppingCart className="h-5 w-5" />
              {isClient && user && cartItemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-primary-foreground transform translate-x-1/2 -translate-y-1/2 bg-primary rounded-full min-w-[1.25rem] h-5">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </Button>

          {/* Mobile Menu Trigger */}
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open menu">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[300px] p-4">
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
                <nav className="flex flex-col space-y-1">
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
              </SheetContent>
            </Sheet>
          </div>
        </div> {/* End of Navigation and Actions Wrapper */}
      </div>
    </header>
  );
}

