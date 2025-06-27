
// Placeholder page
import Header from '../../components/layout/header';
import Footer from '../../components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Mail } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="font-headline text-2xl text-primary flex items-center">
              <Mail className="mr-3 h-6 w-6" />
              Contact Us
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              This page is currently under construction. For inquiries, please reach out through our social media channels.
            </p>
             <p className="mt-4">
              You can find links to our WhatsApp community and Instagram in the footer.
            </p>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
