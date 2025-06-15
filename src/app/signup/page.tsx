
'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignUpSchema, signUpWithEmail, type SignUpInput, type SignUpFormState } from './actions';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation'; // For programmatic navigation
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
  const router = useRouter();

  const initialFormState: SignUpFormState = { message: null, success: false };
  const [formState, formAction] = useFormState(signUpWithEmail, initialFormState);

  const form = useForm<SignUpInput>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  useEffect(() => {
    if (formState.message) {
      toast({
        title: formState.success ? 'Success' : 'Error',
        description: formState.message,
        variant: formState.success ? 'default' : 'destructive',
      });
    }
    if (formState.success) {
      // The redirect in server action handles this, but as a fallback or for client-side indication:
      // router.push('/'); // This might conflict with server action redirect
    }
    if (formState.errors) {
      // Manually set form errors for react-hook-form if needed, though server action errors are primary
      if (formState.errors.email) form.setError('email', { type: 'server', message: formState.errors.email.join(', ') });
      if (formState.errors.password) form.setError('password', { type: 'server', message: formState.errors.password.join(', ') });
      if (formState.errors.confirmPassword) form.setError('confirmPassword', { type: 'server', message: formState.errors.confirmPassword.join(', ') });
      if (formState.errors._form) form.setError('root.serverError', { type: 'custom', message: formState.errors._form.join(', ')});
    }
  }, [formState, toast, form, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-headline text-primary">Create an Account</CardTitle>
          <CardDescription>Enter your details to get started with Aarambh Lookbook.</CardDescription>
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
              {form.formState.errors.root?.serverError && (
                <p className="text-sm font-medium text-destructive">{form.formState.errors.root.serverError.message}</p>
              )}
               {formState.errors?._form && (
                <p className="text-sm font-medium text-destructive">{formState.errors._form.join(', ')}</p>
              )}
              <SubmitButton />
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-2">
          <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <Button variant="link" asChild className="p-0 h-auto font-semibold text-primary">
              <Link href="/signin">Sign In</Link>
            </Button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
