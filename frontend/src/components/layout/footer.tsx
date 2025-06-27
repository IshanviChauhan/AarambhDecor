
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Heart } from 'lucide-react';
import { useMemo } from 'react';
import { MOCK_PRODUCTS } from '../../lib/mock-data';
import type { Product } from '../../lib/types';

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
    className="h-5 w-5 group-hover:scale-110 transition-transform duration-300"
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
        {/* Aarambh Decor Introduction */}
        <div className="mb-10 text-center">
          <h3 className="font-headline text-xl text-primary mb-4">Aarambh Decor</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Celebrating tradition, creativity, and individuality through thoughtfully curated home decor.
          </p>
        </div>

        {/* Links and Logo Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 md:gap-x-8 items-start mb-12">
          {/* Column 1: Quick Links */}
          <div className="flex flex-col items-center">
            <h3 className="font-semibold text-lg mb-4 text-foreground text-center">Quick Links</h3>
            <ul className="space-y-2.5 text-center md:text-left">
              <li><Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link href="/faq" className="text-sm text-muted-foreground hover:text-primary transition-colors">FAQs</Link></li>
              <li><Link href="/shipping-returns" className="text-sm text-muted-foreground hover:text-primary transition-colors">Shipping & Returns</Link></li>
              <li><Link href="/privacy-policy" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms-conditions" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Column 2: Collections */}
          <div className="flex flex-col items-center">
            <h3 className="font-semibold text-lg mb-4 text-foreground text-center">Collections</h3>
            <ul className="space-y-2.5 text-center md:text-left">
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

          {/* Column 3: Connect With Us */}
          <div className="col-span-2 md:col-span-1 flex flex-col items-center">
            <h3 className="font-semibold text-lg mb-4 text-foreground text-center">Connect With Us</h3>
            <div className="flex flex-col space-y-3 items-center md:items-start">
              <a
                href="https://chat.whatsapp.com/F7s9qoIos56HiZBbN1H2O3"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Join our WhatsApp Community"
                className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-all duration-300 group"
              >
                <WhatsAppIcon />
                <span>Join our WhatsApp Community</span>
              </a>
              <a
                href="https://www.instagram.com/_aarambh_decor/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Join us on Instagram"
                className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-all duration-300 group"
              >
                <Instagram className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                <span>Join us on Instagram</span>
              </a>
            </div>
          </div>

          {/* Column 4: Footer Logo */}
          <div className="col-span-2 md:col-span-1 flex justify-center items-start">
             <Link href="/" aria-label="Aarambh Decor Home" className="block w-full max-w-[120px] sm:max-w-[150px] md:max-w-full">
                <div className="relative w-full" style={{ paddingTop: '100%' }}> {/* Aspect ratio container */}
                  <Image
                    src="https://instagram.fdel11-3.fna.fbcdn.net/v/t51.2885-19/505746725_17843352006510460_4000077421691590872_n.jpg?_nc_ht=instagram.fdel11-3.fna.fbcdn.net&_nc_cat=104&_nc_oc=Q6cZ2QGrole3olHTzDhyipLFazMcqxTH3BTY1mp1iUgGHh4vS9EKAKzwAqkfF7dIo9auedjAk-OgM_5e06tRXQpcQ518&_nc_ohc=PWAubMoouIAQ7kNvwGXkA7l&_nc_gid=FmC7UlvNMxPMW8Vr6tpdOA&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_AfPdwAvgOVVQOsnHh8uHrqXaxpnddaWxkGxDWyAHrd0Uzw&oe=685472D7&_nc_sid=7a9f4b"
                    alt="Aarambh Decor Logo"
                    fill
                    style={{ objectFit: 'contain' }}
                    className="rounded-lg transition-opacity hover:opacity-80"
                    data-ai-hint="logo"
                    sizes="(max-width: 768px) 120px, 150px"
                  />
                </div>
            </Link>
          </div>
        </div>
        
        {/* Copyright Section */}
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
