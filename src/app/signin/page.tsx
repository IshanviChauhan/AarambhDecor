
// This page has been removed as authentication functionality is no longer part of the application.
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';

export default function RemovedSignInPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <AlertTriangle className="mx-auto h-12 w-12 text-destructive mb-4" />
            <CardTitle className="font-headline text-2xl text-destructive">Feature Removed</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              User sign-in is no longer available.
            </p>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
