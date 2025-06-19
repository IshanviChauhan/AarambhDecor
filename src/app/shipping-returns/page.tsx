
// Placeholder page
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Truck } from 'lucide-react';
import { InstagramReelsSection } from '@/components/layout/instagram-reels-section';

export default function ShippingReturnsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="font-headline text-2xl text-primary flex items-center">
              <Truck className="mr-3 h-6 w-6" />
              Shipping & Returns
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              This page is currently under construction. Information about our shipping policies and return process will be available here soon.
            </p>
          </CardContent>
        </Card>
      </main>
      <InstagramReelsSection />
      <Footer />
    </div>
  );
}
