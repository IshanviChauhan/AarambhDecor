
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { LayoutGrid, Home, ShoppingCart, LogOut, UserCircle, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { CartItem } from '@/lib/types';
import { useAuth } from '@/contexts/auth-context';
import { auth } from '@/lib/firebase'; // Import auth for direct use if needed
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

export default function Header() {
  const [cartItemCount, setCartItemCount] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

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
        // If no user, cart count is 0
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

    // Listen for custom event when cart is updated elsewhere in the app
    const handleCartUpdateEvent = () => {
      calculateTotalItems();
    };
    
    // Listen for direct storage changes (e.g. other tabs, though less reliable for our specific keys)
    const handleStorageChange = (event: StorageEvent) => {
        if (user && event.key === `aarambhCart_${user.uid}`) {
            calculateTotalItems();
        } else if (!user && event.key && event.key.startsWith('aarambhCart_')) {
            // If user logs out, we want to ensure count is 0
            calculateTotalItems();
        }
    };


    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('aarambhCartUpdated', handleCartUpdateEvent as EventListener);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('aarambhCartUpdated', handleCartUpdateEvent as EventListener);
    };
  }, [isClient, user]); // Re-run if user state changes

  const handleSignOut = async () => {
    try {
      // Clear user-specific cart from localStorage before signing out
      if (user) {
        localStorage.removeItem(`aarambhCart_${user.uid}`);
        localStorage.removeItem(`aarambhWishlist_${user.uid}`);
      }
      await signOut(auth);
      // Dispatch event so header immediately updates count to 0
      window.dispatchEvent(new CustomEvent('aarambhCartUpdated'));
      router.push('/'); // Redirect to home after sign out
      toast({ title: "Signed Out", description: "You have been successfully signed out." });
    } catch (error) {
      console.error("Error signing out: ", error);
      toast({ title: "Sign Out Error", description: "Failed to sign out. Please try again.", variant: "destructive" });
    }
  };

  return (
    <header className="py-4 px-4 md:px-8 border-b border-border/50 shadow-sm sticky top-0 bg-background/95 backdrop-blur-sm z-50">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <Link href="/" className="hover:opacity-80 transition-opacity mb-4 sm:mb-0" aria-label="Aarambh Decor Lookbook Home">
          <Image
            src="https://instagram.fdel11-3.fna.fbcdn.net/v/t51.2885-19/505746725_17843352006510460_4000077421691590872_n.jpg?_nc_ht=instagram.fdel11-3.fna.fbcdn.net&_nc_cat=104&_nc_oc=Q6cZ2QGrole3olHTzDhyipLFazMcqxTH3BTY1mp1iUgGHh4vS9EKAKzwAqkfF7dIo9auedjAk-OgM_5e06tRXQpcQ518&_nc_ohc=PWAubMoouIAQ7kNvwGXkA7l&_nc_gid=FmC7UlvNMxPMW8Vr6tpdOA&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_AfPdwAvgOVVQOsnHh8uHrqXaxpnddaWxkGxDWyAHrd0Uzw&oe=685472D7&_nc_sid=7a9f4b"
            alt="Aarambh Decor Logo"
            width={50} 
            height={50} 
            priority 
            className="object-contain rounded-sm"
          />
        </Link>
        <nav className="flex flex-wrap items-center gap-1 sm:gap-2">
          <Button asChild variant="ghost" className="text-foreground hover:text-primary">
            <Link href="/" aria-label="Home">
              <Home className="mr-2 h-4 w-4 sm:hidden md:inline-block" />
              Home
            </Link>
          </Button>
          <Button asChild variant="ghost" className="text-foreground hover:text-primary">
            <Link href="/collections" aria-label="Collections">
              <LayoutGrid className="mr-2 h-4 w-4 sm:hidden md:inline-block" />
              Collections
            </Link>
          </Button>
          
          {!authLoading && user ? (
            <>
              {user.email && (
                <span className="text-sm text-muted-foreground hidden md:inline-block mr-2">
                  {user.email}
                </span>
              )}
              <Button variant="ghost" onClick={handleSignOut} className="text-foreground hover:text-primary">
                <LogOut className="mr-2 h-4 w-4 sm:hidden md:inline-block" />
                Sign Out
              </Button>
            </>
          ) : !authLoading && !user ? (
            <>
              <Button asChild variant="ghost" className="text-foreground hover:text-primary">
                <Link href="/signin" aria-label="Log In">
                  <LogIn className="mr-2 h-4 w-4 sm:hidden md:inline-block" />
                  Log In
                </Link>
              </Button>
              <Button asChild variant="default" className="text-primary-foreground bg-primary hover:bg-primary/90">
                <Link href="/signup" aria-label="Sign Up">
                   <UserCircle className="mr-2 h-4 w-4 sm:hidden md:inline-block" />
                  Sign Up
                </Link>
              </Button>
            </>
          ) : null}

          <Button asChild variant="ghost" className="text-foreground hover:text-primary relative" size="icon">
            <Link href="/cart" aria-label="View Cart">
              <ShoppingCart className="h-5 w-5" />
              {isClient && user && cartItemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-primary-foreground transform translate-x-1/2 -translate-y-1/2 bg-primary rounded-full min-w-[1.25rem] h-5">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
