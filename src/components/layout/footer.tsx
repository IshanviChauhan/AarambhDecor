
import Link from 'next/link';
import { Instagram, Heart } from 'lucide-react';
import { useMemo } from 'react';
import { MOCK_PRODUCTS } from '@/lib/mock-data';
import type { Product } from '@/lib/types';

// Simple inline SVG for WhatsApp icon
const WhatsAppIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);


export default function Footer() {
  const currentYear = new Date().getFullYear();

  const productCategories = useMemo(() => {
    if (!MOCK_PRODUCTS || MOCK_PRODUCTS.length === 0) {
      return [];
    }
    const uniqueCategories = new Set(
      MOCK_PRODUCTS.map(p => p.category).filter(Boolean) as string[]
    );
    return Array.from(uniqueCategories).sort();
  }, []);

  return (
    <footer className="py-12 md:py-16 px-4 md:px-8 border-t border-border/50 mt-auto bg-secondary/30 text-foreground">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Column 1: Aarambh Decor */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="font-headline text-xl text-primary mb-4">Aarambh Decor</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Celebrating tradition, creativity, and individuality through thoughtfully curated home decor.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-foreground">Quick Links</h3>
            <ul className="space-y-2.5">
              <li><Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link href="/faq" className="text-sm text-muted-foreground hover:text-primary transition-colors">FAQs</Link></li>
              <li><Link href="/shipping-returns" className="text-sm text-muted-foreground hover:text-primary transition-colors">Shipping & Returns</Link></li>
              <li><Link href="/privacy-policy" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms-conditions" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Column 3: Collections */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-foreground">Collections</h3>
            <ul className="space-y-2.5">
              {productCategories.length > 0 ? (
                productCategories.map(category => (
                  <li key={category}>
                    <Link
                      href={`/collections?category=${encodeURIComponent(category)}`}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {category}
                    </Link>
                  </li>
                ))
              ) : (
                <li>
                  <p className="text-sm text-muted-foreground">No specific categories found.</p>
                </li>
              )}
              <li><Link href="/collections" className="text-sm text-muted-foreground hover:text-primary transition-colors">View All</Link></li>
            </ul>
          </div>

          {/* Column 4: Connect With Us */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-foreground">Connect With Us</h3>
            <div className="flex space-x-4 mb-5">
              <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-muted-foreground hover:text-primary transition-colors"><Instagram size={20} /></a>
              <a href="#" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="text-muted-foreground hover:text-primary transition-colors"><WhatsAppIcon /></a>
            </div>
            {/* Future newsletter input can go here */}
          </div>
        </div>

        <div className="border-t border-border/30 pt-8 text-center">
          <p className="text-sm text-muted-foreground">&copy; {currentYear} Aarambh Decor. All rights reserved.</p>
          <p className="text-xs text-muted-foreground mt-2 flex items-center justify-center">
            Designed with <Heart className="h-3.5 w-3.5 mx-1 text-primary fill-primary" aria-hidden="true" /> by a lover of tradition.
          </p>
        </div>
      </div>
    </footer>
  );
}
