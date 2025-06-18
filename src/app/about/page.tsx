
// Placeholder page
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="font-headline text-2xl text-primary flex items-center">
              <Info className="mr-3 h-6 w-6" />
              About Us
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              This page is currently under construction. Please check back later for more information about Aarambh Decor.
            </p>
            <p className="mt-4">
              Aarambh Decor is dedicated to bringing you unique, handcrafted home decor items that tell a story and add a touch of tradition and elegance to your space.
            </p>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
