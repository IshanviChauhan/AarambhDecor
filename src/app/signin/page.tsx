
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Loader2, LogIn, AlertTriangle } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

import { SignInSchema, type SignInInput } from '@/lib/schemas';
// Server action 'signInUserAction' is no longer used for this page.

export default function SignInPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const form = useForm<SignInInput>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: SignInInput) => {
    setIsLoading(true);
    setApiError(null);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.success && result.userId) {
        toast({
          title: 'Login Successful',
          description: result.message || 'Welcome back! You will be redirected shortly.',
          variant: 'default',
        });
        form.reset();
        if (typeof window !== 'undefined') {
          localStorage.setItem('tempUserId', result.userId);
        }
        router.push('/profile');
      } else {
        const errorMessage = result.message || 'Login failed. Please check your credentials.';
        toast({
          title: 'Login Error',
          description: errorMessage,
          variant: 'destructive',
        });
        setApiError(errorMessage);
        // Optionally set form errors if API provides field-specific errors
        if (result.errors) {
             Object.entries(result.errors).forEach(([field, messages]) => {
                if (Array.isArray(messages) && messages.length > 0) {
                    form.setError(field as keyof SignInInput, { type: 'server', message: messages.join(', ') });
                }
            });
        }
      }
    } catch (error) {
      console.error("Sign-in page fetch error:", error);
      const errorMessage = 'An unexpected error occurred. Please try again.';
      toast({
        title: 'Login Error',
        description: errorMessage,
        variant: 'destructive',
      });
      setApiError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="absolute top-8 left-8 z-10 hidden md:flex">
        <Link href="/" className="flex items-center group" aria-label="Aarambh Decor Home">
          <Image
            src="https://instagram.fdel11-3.fna.fbcdn.net/v/t51.2885-19/505746725_17843352006510460_4000077421691590872_n.jpg?_nc_ht=instagram.fdel11-3.fna.fbcdn.net&_nc_cat=104&_nc_oc=Q6cZ2QGrole3olHTzDhyipLFazMcqxTH3BTY1mp1iUgGHh4vS9EKAKzwAqkfF7dIo9auedjAk-OgM_5e06tRXQpcQ518&_nc_ohc=PWAubMoouIAQ7kNvwGXkA7l&_nc_gid=FmC7UlvNMxPMW8Vr6tpdOA&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_AfPdwAvgOVVQOsnHh8uHrqXaxpnddaWxkGxDWyAHrd0Uzw&oe=685472D7&_nc_sid=7a9f4b"
            alt="Aarambh Decor Logo"
            width={60}
            height={60}
            priority
            className="object-contain rounded-lg transition-opacity duration-300 group-hover:opacity-80"
            data-ai-hint="logo"
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

      <main className="flex-grow flex flex-col items-center justify-center p-2">
        <Card className="w-full max-w-md shadow-xl mt-12 sm:mt-0">
          <CardHeader className="text-center">
            <LogIn className="mx-auto h-10 w-10 text-primary mb-3" />
            <CardTitle className="text-3xl font-headline text-primary">Login to Your Account</CardTitle>
            <CardDescription>
              Enter your credentials to access your account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField control={form.control} name="email" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl><Input type="email" placeholder="you@example.com" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="password" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl><Input type="password" placeholder="••••••••" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                {apiError && !form.formState.errors.email && !form.formState.errors.password && (
                  <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Login Error</AlertTitle>
                    <AlertDescription>{apiError}</AlertDescription>
                  </Alert>
                )}

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <LogIn className="mr-2 h-4 w-4" />}
                  {isLoading ? 'Logging In...' : 'Login'}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col items-center space-y-2">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{' '}
              <Link href="/register" className="font-medium text-primary hover:underline">
                Register here
              </Link>
            </p>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
