
'use client';

import { useEffect, useActionState } from 'react'; // Import useActionState
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
import { signInUserAction, type SignInUserFormState } from './actions'; // Import the server action

const initialFormState: SignInUserFormState = { message: null, success: false, errors: undefined, userId: undefined };

export default function SignInPage() {
  const { toast } = useToast();
  const router = useRouter();

  const [formState, formAction, isActionPending] = useActionState(signInUserAction, initialFormState);

  const form = useForm<SignInInput>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    if (formState.message) {
      if (formState.success && formState.userId) {
        toast({
          title: 'Login Successful',
          description: formState.message || 'Welcome back! You will be redirected shortly.',
          variant: 'default',
        });
        form.reset();
        if (typeof window !== 'undefined') {
          localStorage.setItem('tempUserId', formState.userId);
        }
        router.push('/profile');
      } else if (!formState.success) {
        toast({
          title: 'Login Error',
          description: formState.message || 'An error occurred.',
          variant: 'destructive',
        });
        if (formState.errors) {
          Object.entries(formState.errors).forEach(([field, messages]) => {
             if (messages && field !== '_form') {
              form.setError(field as keyof SignInInput, { type: 'server', message: messages.join(', ') });
            }
          });
        }
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState, toast, router]); // form.reset was added, so form dependency

  // This function is called by form.handleSubmit for client-side validation.
  // The actual submission to `formAction` is handled by React due to the <form action={formAction}>.
  const handleClientValidationOnly = (data: SignInInput) => {
    console.log("SignInPage: Client-side validation passed. Data for Server Action:", data);
    // No need to explicitly call formAction here when using <form action={formAction}>
    // However, if not using the native form action attribute, you'd call formAction(new FormData(form.control._formRef.current)) or similar.
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
                onSubmit={form.handleSubmit(handleClientValidationOnly)}
                action={formAction} // Wire up the server action
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

                {formState.errors?._form && !formState.success && (
                  <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Login Error</AlertTitle>
                    <AlertDescription>{formState.errors._form.join(', ')}</AlertDescription>
                  </Alert>
                )}

                <Button type="submit" className="w-full" disabled={isActionPending}>
                  {isActionPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <LogIn className="mr-2 h-4 w-4" />}
                  {isActionPending ? 'Logging In...' : 'Login'}
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
