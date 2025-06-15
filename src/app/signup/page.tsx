
'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignUpSchema, type SignUpInput } from '@/lib/schemas';
import { signUpWithEmail, type SignUpFormState } from './actions';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Loader2, LogIn } from 'lucide-react';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <LogIn className="mr-2 h-4 w-4" />}
      Sign Up
    </Button>
  );
}

export default function SignUpPage() {
  const { toast } = useToast();

  const initialFormState: SignUpFormState = { message: null, success: false };
  const [formState, formAction] = useActionState(signUpWithEmail, initialFormState);

  const form = useForm<SignUpInput>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  useEffect(() => {
    if (formState.errors) {
      if (formState.errors.email) form.setError('email', { type: 'server', message: formState.errors.email.join(', ') });
      if (formState.errors.password) form.setError('password', { type: 'server', message: formState.errors.password.join(', ') });
      if (formState.errors.confirmPassword) {
          form.setError('confirmPassword', { type: 'server', message: formState.errors.confirmPassword.join(', ') });
      }
      // Do not set root.serverError for _form errors here, they will be handled by toast
    }

    if (formState.message) {
      toast({
        title: formState.success ? 'Success' : 'Error',
        description: formState.message,
        variant: formState.success ? 'default' : 'destructive',
      });
    }
    // The redirect in server action handles this, so no client-side redirect needed here on formState.success
  }, [formState, toast, form]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-2">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-headline text-primary">Create an Account</CardTitle>
          <CardDescription>Enter your details to get started with Aarambh Decor.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form action={formAction} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="name@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Removed inline display of formState.errors._form or root.serverError */}
              <SubmitButton />
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-2">
          <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <Button variant="link" asChild className="p-0 h-auto font-semibold text-primary">
              <Link href="/signin">Log In</Link>
            </Button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
