
// This page component (src/app/signup/page.tsx) is no longer needed
// as the registration functionality is handled by /register.
// This file can be safely deleted.

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-background relative">
      <div className="absolute top-8 left-8 z-10">
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

      <div className="flex flex-col items-center justify-center min-h-screen p-2">
        <Card className="w-full max-w-md shadow-xl mt-24 sm:mt-0">
           <CardHeader className="text-center">
            <AlertTriangle className="mx-auto h-12 w-12 text-primary mb-4" />
            <CardTitle className="text-3xl font-headline text-primary">Registration Route Changed</CardTitle>
            <CardDescription>User sign-up is now handled at the <Link href="/register" className="underline hover:text-accent">/register</Link> page.</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
             <p className="text-muted-foreground">
              Please use the new registration page.
            </p>
             <Button asChild className="mt-6">
                <Link href="/register">Go to Registration</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
