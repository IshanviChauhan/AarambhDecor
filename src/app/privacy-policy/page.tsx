
// Placeholder page
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="font-headline text-2xl text-primary flex items-center">
              <Shield className="mr-3 h-6 w-6" />
              Privacy Policy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              This page is currently under construction. Our Privacy Policy, detailing how we handle your data, will be available here soon.
            </p>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
