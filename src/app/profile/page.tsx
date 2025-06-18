
'use client';

import Link from 'next/link';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { UserCircle2, AlertTriangle } from 'lucide-react';

export default function ProfilePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-2 py-8 md:py-12">
        <div className="flex items-center space-x-3 mb-10">
          <UserCircle2 className="h-10 w-10 text-primary" />
          <h1 className="text-4xl font-headline text-primary">My Profile</h1>
        </div>

        <Card className="mb-8 shadow-lg rounded-lg border-border/70">
          <CardHeader>
            <CardTitle className="font-headline text-2xl text-primary flex items-center">
                <AlertTriangle className="mr-3 h-6 w-6 text-destructive" />
                Profile Feature Unavailable
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center py-10">
            <p className="text-lg text-muted-foreground mb-4">
              User profiles and related features are currently disabled as authentication has been removed.
            </p>
            <Button asChild>
              <Link href="/">Return to Homepage</Link>
            </Button>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
