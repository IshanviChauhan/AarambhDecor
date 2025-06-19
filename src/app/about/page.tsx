
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Instagram } from 'lucide-react';
import Link from 'next/link';

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
    className="h-5 w-5"
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

export default function AboutUsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <Card className="max-w-3xl mx-auto shadow-xl rounded-lg border-border/70 animate-fade-in-down">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Users className="h-8 w-8 text-primary" />
              <CardTitle className="font-headline text-3xl md:text-4xl text-primary">
                About Us
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 text-lg md:text-xl text-foreground leading-relaxed px-6 md:px-8 pb-8">
            <p className="text-center text-2xl md:text-3xl font-semibold text-accent">
              ✨ Welcome to Aarambh Decor ✨
            </p>
            <p>
              At Aarambh Decor, we believe that your space should speak your story — rich with tradition, creativity, and soul.
            </p>
            <p>
              From intricate handicrafts and elegant tabletops, to statement mirrors and expressive wall arts, every item in our collection is thoughtfully designed to reflect emotion, heritage, and individuality.
            </p>
            <p>
              Rooted in timeless craftsmanship and inspired by personal narratives, Aarambh (meaning "beginning") marks the start of a journey — your journey — through art, culture, and memory.
            </p>
            <div className="space-y-3 pt-4 text-center">
              <p className="flex items-center justify-center">
                <span className="text-2xl mr-2">🪄</span> Let your walls whisper stories.
              </p>
              <p className="flex items-center justify-center">
                <span className="text-2xl mr-2">🪞</span> Let your mirrors reflect more than just images.
              </p>
              <p className="flex items-center justify-center">
                <span className="text-2xl mr-2">🖼️</span> Let your decor speak of who you are.
              </p>
            </div>
            <p className="text-center text-2xl md:text-3xl font-semibold text-accent pt-4">
              Aarambh Decor — Decor That Tells Your Story! ✨
            </p>

            <div className="pt-6 text-center space-y-4">
              <h3 className="font-headline text-xl text-primary">Connect & Explore More</h3>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/10 w-full sm:w-auto">
                  <Link href="https://chat.whatsapp.com/F7s9qoIos56HiZBbN1H2O3" target="_blank" rel="noopener noreferrer">
                    <WhatsAppIcon />
                    Join on WhatsApp
                  </Link>
                </Button>
                <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/10 w-full sm:w-auto">
                  <Link href="https://www.instagram.com/_aarambh_decor/" target="_blank" rel="noopener noreferrer">
                    <Instagram className="h-5 w-5" />
                    Follow on Instagram
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
