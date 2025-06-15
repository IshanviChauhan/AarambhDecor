
'use client';

import { useState, useEffect } from 'react';
import type { CartItem } from '@/lib/types';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { Trash2, ShoppingBag, PlusCircle, MinusCircle, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { parsePrice } from '@/lib/utils';
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';


export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isClient, setIsClient] = useState(false);
  const { toast } = useToast();
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && user) {
      const storedCart = localStorage.getItem(`aarambhCart_${user.uid}`);
      if (storedCart) {
        try {
          setCartItems(JSON.parse(storedCart));
        } catch (e) {
          console.error("Failed to parse cart from localStorage", e);
          setCartItems([]);
        }
      } else {
        setCartItems([]);
      }
    } else if (isClient && !user && !authLoading) {
      // If user is not logged in and auth is resolved, clear cart
      setCartItems([]);
    }
  }, [isClient, user, authLoading]);

  useEffect(() => {
    if(isClient && user) {
      localStorage.setItem(`aarambhCart_${user.uid}`, JSON.stringify(cartItems));
      window.dispatchEvent(new CustomEvent('aarambhCartUpdated'));
    } else if (isClient && !user) {
        // Ensure cart is cleared in localStorage too if user logs out
        localStorage.removeItem('aarambhCart'); // Clear old general key if any
        // Check if auth.currentUser is available and has uid before trying to remove specific user cart
        if (auth.currentUser?.uid) { 
             localStorage.removeItem(`aarambhCart_${auth.currentUser.uid}`);
        }
        window.dispatchEvent(new CustomEvent('aarambhCartUpdated')); // Notify header
    }
  }, [cartItems, isClient, user]);

  const handleRemoveFromCart = (productId: string) => {
    if (!user) return; // Should not happen if cart is user-specific
    setCartItems((prevCartItems) => prevCartItems.filter(item => item.id !== productId));
    toast({
      title: "Item Removed",
      description: "The item has been removed from your cart.",
      variant: "destructive"
    });
  };

  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    if (!user) return; // Should not happen
    if (newQuantity < 1) {
      handleRemoveFromCart(productId);
      return;
    }
    setCartItems((prevCartItems) =>
      prevCartItems.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const totalAmount = cartItems.reduce((total, item) => {
    return total + parsePrice(item.price) * item.quantity;
  }, 0);

  if (!isClient || authLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-grow container mx-auto px-2 py-8 md:py-12 flex justify-center items-center">
          <ShoppingBag className="h-12 w-12 text-primary animate-pulse" />
           <p className="ml-4 text-lg text-muted-foreground">Loading your cart...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-grow container mx-auto px-2 py-8 md:py-12 text-center">
            <AlertTriangle className="h-12 w-12 text-primary mx-auto mb-4" />
            <h1 className="text-3xl font-headline text-primary mb-2">Authentication Required</h1>
            <p className="text-muted-foreground mb-6">Please log in to view your cart.</p>
            <Button asChild size="lg">
              <Link href="/signin">Log In</Link>
            </Button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-2 py-8 md:py-12">
        <section className="text-center mb-10 md:mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <ShoppingBag className="h-10 w-10 text-primary" />
            <h1 className="text-4xl md:text-5xl font-headline text-primary">
              Your Shopping Cart
            </h1>
          </div>
        </section>

        {cartItems.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-xl text-muted-foreground mb-4">Your cart is currently empty.</p>
            <Button asChild size="lg">
              <Link href="/collections">Start Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              {cartItems.map((item) => (
                <Card key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 shadow-md rounded-lg border-border/70">
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    width={120}
                    height={120}
                    className="object-cover rounded-md w-full sm:w-32 sm:h-32"
                    data-ai-hint={item.dataAiHint}
                  />
                  <div className="flex-grow">
                    <CardTitle className="font-headline text-lg mb-1">{item.name}</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground mb-2">
                      {item.price}
                    </CardDescription>
                    <div className="flex items-center gap-2 my-2">
                      <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}>
                        <MinusCircle className="h-4 w-4" />
                      </Button>
                      <span className="text-lg font-medium w-8 text-center">{item.quantity}</span>
                      <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}>
                        <PlusCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end sm:ml-auto mt-2 sm:mt-0">
                     <p className="text-lg font-semibold text-primary mb-2 sm:mb-4">
                       ₹{(parsePrice(item.price) * item.quantity).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                     </p>
                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive/80" onClick={() => handleRemoveFromCart(item.id)}>
                      <Trash2 className="mr-1 h-4 w-4" /> Remove
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            <div className="md:col-span-1">
              <Card className="p-6 shadow-lg rounded-lg border-border/70">
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="font-headline text-2xl text-primary">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="p-0 space-y-3">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>₹{totalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <Separator className="my-3" />
                  <div className="flex justify-between font-bold text-xl text-foreground">
                    <span>Total</span>
                    <span>₹{totalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                </CardContent>
                <CardFooter className="p-0 mt-6">
                  <Button size="lg" className="w-full" disabled>
                    Proceed to Checkout
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
