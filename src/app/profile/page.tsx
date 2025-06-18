
'use client';

import { useEffect, useActionState, useState } from 'react'; // Added useState
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link'; // Added missing import
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserCircle2, MapPin, ShoppingBag, AlertTriangle, Loader2, Save, PlusCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { UserProfileUpdateSchema, AddressSchema, type UserProfileUpdateInput, type AddressInput } from '@/lib/schemas';
import { updateUserProfileAction, addShippingAddressAction, type FormState } from './actions';

const initialFormState: FormState = { message: null, success: false, errors: undefined };

const getTemporaryUserId = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('tempUserId');
  }
  return null;
};


export default function ProfilePage() {
  const { toast } = useToast();
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    const tempId = getTemporaryUserId();
    if (tempId) {
      setCurrentUserId(tempId);
    }
  }, []);

  const [profileFormState, profileFormAction, isProfileUpdatePending] = useActionState(updateUserProfileAction, initialFormState);
  const profileForm = useForm<UserProfileUpdateInput>({
    resolver: zodResolver(UserProfileUpdateSchema),
    defaultValues: {
      userId: '', 
      firstName: '',
      lastName: '',
      phoneNumber: '',
    },
  });

  useEffect(() => {
    if (profileFormState.message) {
      toast({
        title: profileFormState.success ? 'Profile Update' : 'Update Error',
        description: profileFormState.message,
        variant: profileFormState.success ? 'default' : 'destructive',
      });
      if (profileFormState.errors) {
         Object.entries(profileFormState.errors).forEach(([field, messages]) => {
          if (messages && field !== '_form') {
            profileForm.setError(field as keyof UserProfileUpdateInput, { type: 'server', message: messages.join(', ') });
          }
        });
      }
      if (profileFormState.success) profileForm.reset({userId: currentUserId || '', firstName: '', lastName: '', phoneNumber: ''});
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileFormState]);
  

  const [addressFormState, addressFormAction, isAddressAddPending] = useActionState(addShippingAddressAction, initialFormState);
  const addressForm = useForm<AddressInput>({
    resolver: zodResolver(AddressSchema),
    defaultValues: {
      userId: '', 
      fullName: '', street: '', city: '', state: '', postalCode: '', country: '', phoneNumber: ''
    },
  });

  useEffect(() => {
    if (addressFormState.message) {
      toast({
        title: addressFormState.success ? 'Address Added' : 'Address Error',
        description: addressFormState.message,
        variant: addressFormState.success ? 'default' : 'destructive',
      });
      if (addressFormState.errors) {
        Object.entries(addressFormState.errors).forEach(([field, messages]) => {
          if (messages && field !== '_form') {
            addressForm.setError(field as keyof AddressInput, { type: 'server', message: messages.join(', ') });
          }
        });
      }
      if (addressFormState.success) addressForm.reset({userId: currentUserId || '', fullName: '', street: '', city: '', state: '', postalCode: '', country: '', phoneNumber: ''});
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addressFormState]);


  // Update defaultValues when currentUserId is available
  useEffect(() => {
    if (currentUserId) {
      profileForm.reset({ ...profileForm.getValues(), userId: currentUserId });
      addressForm.reset({ ...addressForm.getValues(), userId: currentUserId });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUserId]);


  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-2 py-8 md:py-12">
        <div className="flex items-center space-x-3 mb-10">
          <UserCircle2 className="h-10 w-10 text-primary" />
          <h1 className="text-4xl font-headline text-primary">My Account</h1>
        </div>

        {!currentUserId && (
          <Card className="mb-8 shadow-lg rounded-lg border-border/70">
            <CardHeader>
              <CardTitle className="font-headline text-2xl text-primary flex items-center">
                <AlertTriangle className="mr-3 h-6 w-6 text-destructive" />
                Profile Unavailable
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center py-10">
              <p className="text-lg text-muted-foreground mb-4">
                Please log in to view your profile. User ID is not available.
              </p>
              <Button asChild>
                <Link href="/signin">Go to Login</Link>
              </Button>
            </CardContent>
          </Card>
        )}

        {currentUserId && (
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 mb-6">
            <TabsTrigger value="profile" className="text-base py-2.5"><UserCircle2 className="mr-2 h-5 w-5"/>My Profile</TabsTrigger>
            <TabsTrigger value="addresses" className="text-base py-2.5"><MapPin className="mr-2 h-5 w-5"/>Shipping Addresses</TabsTrigger>
            <TabsTrigger value="orders" className="text-base py-2.5"><ShoppingBag className="mr-2 h-5 w-5"/>Order History</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card className="shadow-lg rounded-lg border-border/70">
              <CardHeader>
                <CardTitle className="font-headline text-2xl text-primary">Profile Details</CardTitle>
                <CardDescription>Update your personal information. Email is not editable here.</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...profileForm}>
                  <form 
                    action={profileFormAction}
                    className="space-y-6"
                  >
                    <input type="hidden" {...profileForm.register('userId')} value={currentUserId || ''} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField control={profileForm.control} name="firstName" render={({ field }) => (
                        <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl><Input placeholder="Your first name" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                        )} />
                        <FormField control={profileForm.control} name="lastName" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl><Input placeholder="Your last name" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                        )} />
                    </div>
                    <FormField control={profileForm.control} name="phoneNumber" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl><Input type="tel" placeholder="Your phone number (optional)" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    {profileFormState.errors?._form && (
                        <p className="text-sm font-medium text-destructive">{profileFormState.errors._form.join(', ')}</p>
                    )}
                    <Button type="submit" disabled={isProfileUpdatePending} className="w-full md:w-auto">
                      {isProfileUpdatePending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                      {isProfileUpdatePending ? 'Saving...' : 'Save Changes'}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="addresses">
            <Card className="shadow-lg rounded-lg border-border/70">
              <CardHeader>
                <CardTitle className="font-headline text-2xl text-primary">Shipping Addresses</CardTitle>
                <CardDescription>Manage your shipping addresses. Listing, editing, and deleting addresses will be implemented soon.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div>
                    <h3 className="text-lg font-semibold mb-4 text-foreground">Your Addresses</h3>
                    <p className="text-muted-foreground">Displaying existing addresses is under development.</p>
                </div>
                <hr/>
                <div>
                    <h3 className="text-lg font-semibold mb-4 text-foreground">Add New Address</h3>
                     <Form {...addressForm}>
                        <form 
                          action={addressFormAction}
                          className="space-y-6"
                        >
                        <input type="hidden" {...addressForm.register('userId')} value={currentUserId || ''} />
                        <FormField control={addressForm.control} name="fullName" render={({ field }) => (
                            <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input placeholder="Recipient's full name" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={addressForm.control} name="street" render={({ field }) => (
                            <FormItem><FormLabel>Street Address</FormLabel><FormControl><Input placeholder="123 Main St, Apt 4B" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField control={addressForm.control} name="city" render={({ field }) => (
                                <FormItem><FormLabel>City</FormLabel><FormControl><Input placeholder="City" {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                            <FormField control={addressForm.control} name="state" render={({ field }) => (
                                <FormItem><FormLabel>State / Province</FormLabel><FormControl><Input placeholder="State/Province" {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField control={addressForm.control} name="postalCode" render={({ field }) => (
                            <FormItem><FormLabel>Postal Code</FormLabel><FormControl><Input placeholder="Postal Code" {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                            <FormField control={addressForm.control} name="country" render={({ field }) => (
                            <FormItem><FormLabel>Country</FormLabel><FormControl><Input placeholder="Country" {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                        </div>
                        <FormField control={addressForm.control} name="phoneNumber" render={({ field }) => (
                            <FormItem><FormLabel>Phone Number (Optional)</FormLabel><FormControl><Input type="tel" placeholder="Address phone number" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        {addressFormState.errors?._form && (
                            <p className="text-sm font-medium text-destructive">{addressFormState.errors._form.join(', ')}</p>
                        )}
                        <Button type="submit" disabled={isAddressAddPending} className="w-full md:w-auto">
                            {isAddressAddPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <PlusCircle className="mr-2 h-4 w-4" />}
                            {isAddressAddPending ? 'Adding...' : 'Add Address'}
                        </Button>
                        </form>
                    </Form>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders">
            <Card className="shadow-lg rounded-lg border-border/70">
              <CardHeader>
                <CardTitle className="font-headline text-2xl text-primary">Order History</CardTitle>
              </CardHeader>
              <CardContent className="text-center py-10">
                 <ShoppingBag className="h-12 w-12 text-primary mx-auto mb-4 opacity-70" />
                <p className="text-lg text-muted-foreground">
                  Order history tracking is currently under development and will be available soon.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        )}
      </main>
      <Footer />
    </div>
  );
}
