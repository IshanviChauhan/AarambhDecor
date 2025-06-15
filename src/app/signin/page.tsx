
'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignInSchema, type SignInInput } from '@/lib/schemas';
import { signInWithEmail, type SignInFormState } from './actions';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { Loader2, LogIn } from 'lucide-react';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <LogIn className="mr-2 h-4 w-4" /> }
      Sign In
    </Button>
  );
}

export default function SignInPage() {
  const { toast } = useToast();
  const router = useRouter();

  const initialFormState: SignInFormState = { message: null, success: false };
  const [formState, formAction] = useFormState(signInWithEmail, initialFormState);

  const form = useForm<SignInInput>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: '',
      password: '',
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
      // Redirect is handled by server action
    }
     if (formState.errors) {
      if (formState.errors.email) form.setError('email', { type: 'server', message: formState.errors.email.join(', ') });
      if (formState.errors.password) form.setError('password', { type: 'server', message: formState.errors.password.join(', ') });
      if (formState.errors._form) form.setError('root.serverError', { type: 'custom', message: formState.errors._form.join(', ')});
    }
  }, [formState, toast, form, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-headline text-primary">Welcome Back</CardTitle>
          <CardDescription>Sign in to continue to your Aarambh Lookbook.</CardDescription>
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
            Don&apos;t have an account?{' '}
            <Button variant="link" asChild className="p-0 h-auto font-semibold text-primary">
              <Link href="/signup">Sign Up</Link>
            </Button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
