
'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { ShoppingBag, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export default function CartPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-grow container mx-auto px-2 py-8 md:py-12 flex justify-center items-center">
          <ShoppingBag className="h-12 w-12 text-primary animate-pulse" />
           <p className="ml-4 text-lg text-muted-foreground">Loading cart...</p>
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

        <div className="text-center py-10">
            <AlertTriangle className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-headline text-primary mb-2">Cart Unavailable</h2>
            <p className="text-xl text-muted-foreground mb-4">
              User-specific shopping cart functionality is currently disabled.
            </p>
            <Button asChild size="lg">
              <Link href="/collections">Start Shopping</Link>
            </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
