import Link from 'next/link';
import { ExternalLink, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Header() {
  return (
    <header className="py-6 px-4 md:px-8 border-b border-border/50 shadow-sm sticky top-0 bg-background/95 backdrop-blur-sm z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-3xl font-headline text-primary hover:opacity-80 transition-opacity">
          Aarambh Lookbook
        </Link>
        <nav>
          <Button asChild variant="outline" className="text-accent-foreground border-accent hover:bg-accent/10">
            <a 
              href="https://www.aarambhdecor.com" // Replace with actual URL
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Visit the main Aarambh Decor store (opens in a new tab)"
            >
              Visit Aarambh Decor
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </nav>
      </div>
    </header>
  );
}
