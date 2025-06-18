
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, UserPlus } from 'lucide-react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

export default function RegisterPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-2 py-8 md:py-12">
        <div className="absolute top-8 left-8 z-10 hidden md:flex"> {/* Hidden on mobile, shown on md and up */}
          <Link href="/" className="flex items-center group" aria-label="Aarambh Decor Home">
            <Image
              src="https://instagram.fdel11-3.fna.fbcdn.net/v/t51.2885-19/505746725_17843352006510460_4000077421691590872_n.jpg?_nc_ht=instagram.fdel11-3.fna.fbcdn.net&_nc_cat=104&_nc_oc=Q6cZ2QGrole3olHTzDhyipLFazMcqxTH3BTY1mp1iUgGHh4vS9EKAKzwAqkfF7dIo9auedjAk-OgM_5e06tRXQpcQ518&_nc_ohc=PWAubMoouIAQ7kNvwGXkA7l&_nc_gid=FmC7UlvNMxPMW8Vr6tpdOA&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_AfPdwAvgOVVQOsnHh8uHrqXaxpnddaWxkGxDWyAHrd0Uzw&oe=685472D7&_nc_sid=7a9f4b"
              alt="Aarambh Decor Logo"
              width={60}
              height={60}
              priority
              className="object-contain rounded-lg transition-opacity duration-300 group-hover:opacity-80"
            />
            <span
              className="ml-3 text-2xl font-headline text-primary opacity-0 w-0 transform -translate-x-4
                        group-hover:opacity-100 group-hover:w-auto group-hover:translate-x-0
                        transition-all duration-500 ease-in-out overflow-hidden whitespace-nowrap"
            >
              Aarambh Decor
            </span>
          </Link>
        </div>
        
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] p-2"> {/* Adjusted min-height for content centering */}
          <Card className="w-full max-w-lg shadow-xl mt-12 sm:mt-0"> {/* Added margin-top for mobile */}
            <CardHeader className="text-center">
              <UserPlus className="mx-auto h-10 w-10 text-primary mb-3" />
              <CardTitle className="text-3xl font-headline text-primary">User Registration</CardTitle>
              <CardDescription>
                This is where users would typically enter their name, email, phone number, password, and address to create an account.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center py-6">
              <AlertTriangle className="mx-auto h-10 w-10 text-destructive mb-3" />
              <h2 className="text-xl font-semibold text-destructive mb-2">Registration Disabled</h2>
              <p className="text-muted-foreground mb-6">
                User registration functionality is currently not available.
              </p>
              <Button asChild size="lg">
                  <Link href="/">Go to Homepage</Link>
              </Button>
               <p className="mt-6 text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link href="/signin" className="font-medium text-primary hover:underline">
                  Sign In (Disabled)
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
