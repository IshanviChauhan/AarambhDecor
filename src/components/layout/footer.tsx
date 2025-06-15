
import Link from 'next/link';
import { Facebook, Instagram, Twitter, Youtube, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
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
              <li><Link href="/collections?category=Wall%20Art" className="text-sm text-muted-foreground hover:text-primary transition-colors">Wall Art</Link></li>
              <li><Link href="/collections?category=Tabletops" className="text-sm text-muted-foreground hover:text-primary transition-colors">Tabletops</Link></li>
              <li><Link href="/collections?category=Mirrors" className="text-sm text-muted-foreground hover:text-primary transition-colors">Mirrors</Link></li>
              <li><Link href="/collections?category=Handicrafts" className="text-sm text-muted-foreground hover:text-primary transition-colors">Handicrafts</Link></li>
            </ul>
          </div>

          {/* Column 4: Connect With Us */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-foreground">Connect With Us</h3>
            <div className="flex space-x-4 mb-5">
              <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-muted-foreground hover:text-primary transition-colors"><Facebook size={20} /></a>
              <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-muted-foreground hover:text-primary transition-colors"><Instagram size={20} /></a>
              <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-muted-foreground hover:text-primary transition-colors"><Twitter size={20} /></a>
              <a href="#" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-muted-foreground hover:text-primary transition-colors"><Youtube size={20} /></a>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Subscribe to our newsletter for updates and special offers.
            </p>
            {/* Future newsletter input can go here */}
          </div>
        </div>

        <div className="border-t border-border/30 pt-8 text-center">
          <p className="text-sm text-muted-foreground">&copy; {currentYear} Aarambh Decor Online. All rights reserved.</p>
          <p className="text-xs text-muted-foreground mt-2 flex items-center justify-center">
            Designed with <Heart className="h-3.5 w-3.5 mx-1 text-primary fill-primary" aria-hidden="true" /> by a lover of tradition.
          </p>
        </div>
      </div>
    </footer>
  );
}
