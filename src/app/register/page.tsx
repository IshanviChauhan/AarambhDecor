
'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useActionState } from 'react';
import { useRouter } from 'next/navigation';

import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Loader2, UserPlus, AlertTriangle } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'; // Updated import for AlertDescription

import { SignUpSchemaWithAddress, type SignUpWithAddressInput } from '@/lib/schemas';
import { registerUserAction, type RegisterUserFormState } from './actions';

export default function RegisterPage() {
  const { toast } = useToast();
  const router = useRouter();

  const initialFormState: RegisterUserFormState = { message: null, success: false, errors: undefined, userId: undefined };
  const [formState, formAction, isActionPending] = useActionState(registerUserAction, initialFormState);

  const form = useForm<SignUpWithAddressInput>({
    resolver: zodResolver(SignUpSchemaWithAddress),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
      addressStreet: '',
      addressCity: '',
      addressState: '',
      addressPostalCode: '',
      addressCountry: '',
    },
  });

  useEffect(() => {
    if (formState.message) {
      if (formState.success && formState.userId) {
        toast({
          title: 'Registration Successful',
          description: "Welcome! You'll be redirected to your profile.",
          variant: 'default',
        });
        form.reset(); // Clear form fields
        if (typeof window !== 'undefined') {
          localStorage.setItem('tempUserId', formState.userId); // Store UID for profile page access
          router.push('/profile'); // Redirect to profile page
        }
      } else if (!formState.success) {
        toast({
          title: 'Registration Error',
          description: formState.message,
          variant: 'destructive',
        });
        // Populate form errors from server action state
        if (formState.errors) {
          Object.entries(formState.errors).forEach(([field, messages]) => {
            if (messages && field !== '_form') {
              form.setError(field as keyof SignUpWithAddressInput, { type: 'server', message: messages.join(', ') });
            }
          });
        }
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState, toast, router]); // form.reset was added, so form is a dependency

  // This function is called by form.handleSubmit for client-side validation.
  // The actual submission to `formAction` is handled by React due to the <form action={formAction}>.
  const handleClientValidationOnly = (data: SignUpWithAddressInput) => {
    console.log("RegisterPage: Client-side validation passed. Data submitted to server action:", data);
    // No need to explicitly call formAction here if using <form action={formAction}>
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-2 py-8 md:py-12">
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
        
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] p-2">
          <Card className="w-full max-w-2xl shadow-xl mt-12 sm:mt-0">
            <CardHeader className="text-center">
              <UserPlus className="mx-auto h-10 w-10 text-primary mb-3" />
              <CardTitle className="text-3xl font-headline text-primary">Create Your Account</CardTitle>
              <CardDescription>
                Join Aarambh Decor to save your preferences and track orders.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form 
                  onSubmit={form.handleSubmit(handleClientValidationOnly)} 
                  action={formAction} // Wires up the server action
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField control={form.control} name="firstName" render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl><Input placeholder="Your first name" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="lastName" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl><Input placeholder="Your last name" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>

                  <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl><Input type="email" placeholder="you@example.com" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="phoneNumber" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number (Optional)</FormLabel>
                      <FormControl><Input type="tel" placeholder="e.g., +1234567890" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField control={form.control} name="password" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl><Input type="password" placeholder="••••••••" {...field} /></FormControl>
                        <FormDescription>Min. 6 characters.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="confirmPassword" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl><Input type="password" placeholder="••••••••" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>

                  <h3 className="text-lg font-medium text-primary pt-2 border-t">Primary Address</h3>
                  <FormField control={form.control} name="addressStreet" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Street Address</FormLabel>
                      <FormControl><Input placeholder="123 Decor Lane, Apt 4B" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField control={form.control} name="addressCity" render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl><Input placeholder="Your city" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="addressState" render={({ field }) => (
                      <FormItem>
                        <FormLabel>State / Province</FormLabel>
                        <FormControl><Input placeholder="Your state or province" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField control={form.control} name="addressPostalCode" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Postal Code</FormLabel>
                        <FormControl><Input placeholder="Your postal code" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="addressCountry" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country</FormLabel>
                        <FormControl><Input placeholder="Your country" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>
                   
                  {formState.errors?._form && !formState.success && (
                     <Alert variant="destructive">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle>Registration Error</AlertTitle>
                        <AlertDescription>{formState.errors._form.join(', ')}</AlertDescription>
                      </Alert>
                  )}

                  <Button type="submit" className="w-full" disabled={isActionPending}>
                    {isActionPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <UserPlus className="mr-2 h-4 w-4" />}
                    {isActionPending ? 'Creating Account...' : 'Create Account'}
                  </Button>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex flex-col items-center space-y-2">
              <p className="text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link href="/signin" className="font-medium text-primary hover:underline">
                  Login
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
