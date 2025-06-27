
// Placeholder page
import Header from '../../components/layout/header';
import Footer from '../../components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { HelpCircle } from 'lucide-react';

export default function FAQPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="font-headline text-2xl text-primary flex items-center">
              <HelpCircle className="mr-3 h-6 w-6" />
              Frequently Asked Questions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              This page is currently under construction. We are compiling a list of common questions and answers.
            </p>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
