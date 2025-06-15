
import Link from 'next/link';
import { LayoutGrid, Home, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Header() {
  return (
    <header className="py-6 px-4 md:px-8 border-b border-border/50 shadow-sm sticky top-0 bg-background/95 backdrop-blur-sm z-50">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <Link href="/" className="text-3xl font-headline text-primary hover:opacity-80 transition-opacity mb-4 sm:mb-0">
          Aarambh Lookbook
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
          <Button asChild variant="ghost" className="text-foreground hover:text-primary" size="icon">
            <Link href="/cart" aria-label="View Cart">
              <ShoppingCart className="h-5 w-5" />
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
