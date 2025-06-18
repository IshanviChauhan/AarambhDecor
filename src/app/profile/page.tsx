
'use client';

import { useEffect, useActionState, useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserCircle2, MapPin, ShoppingBag, AlertTriangle, Loader2, Save, PlusCircle, Edit3, Trash2, Home } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { UserProfileUpdateSchema, AddressSchema, type UserProfileUpdateInput, type AddressInput } from '@/lib/schemas';
import { 
  updateUserProfileAction, 
  addShippingAddressAction, 
  // deleteShippingAddressAction, // Keep disabled for now
  getUserProfile,
  getShippingAddresses,
  getOrderHistory, // Though not fully implemented, import for consistency
  type FormState 
} from './actions';
import type { UserProfile, UserAddress, Order } from '@/lib/types';
import { Separator } from '@/components/ui/separator';
// AlertDialog components are not used in the current active features of this page.
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog"


const initialFormState: FormState = { message: null, success: false, errors: undefined };

const getTemporaryUserId = (): string | null => {
  if (typeof window !== 'undefined') {
    // Ensure localStorage interaction only happens client-side
    return localStorage.getItem('tempUserId');
  }
  return null;
};

export default function ProfilePage() {
  const { toast } = useToast();
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  
  const [userProfileData, setUserProfileData] = useState<UserProfile | null>(null);
  const [shippingAddresses, setShippingAddresses] = useState<UserAddress[]>([]);
  const [orderHistory, setOrderHistory] = useState<Order[]>([]); // Placeholder for orders
  
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [isLoadingAddresses, setIsLoadingAddresses] = useState(true);
  const [isLoadingOrders, setIsLoadingOrders] = useState(true); // Placeholder for orders

  // --- Profile Form ---
  const [profileFormState, profileFormAction, isProfileUpdatePending] = useActionState(updateUserProfileAction, initialFormState);
  const profileForm = useForm<UserProfileUpdateInput>({
    resolver: zodResolver(UserProfileUpdateSchema),
    defaultValues: { userId: '', firstName: '', lastName: '', phoneNumber: '' },
  });

  // --- Address Form ---
  const [addressFormState, addressFormAction, isAddressAddPending] = useActionState(addShippingAddressAction, initialFormState);
  const addressForm = useForm<AddressInput>({
    resolver: zodResolver(AddressSchema),
    defaultValues: { userId: '', fullName: '', street: '', city: '', state: '', postalCode: '', country: '', phoneNumber: '' },
  });

  const fetchProfileData = useCallback(async (userId: string) => {
    setIsLoadingProfile(true);
    try {
      const profile = await getUserProfile(userId);
      setUserProfileData(profile);
      if (profile) {
        profileForm.reset({ // Reset form with fetched data
          userId: profile.uid,
          firstName: profile.firstName || '',
          lastName: profile.lastName || '',
          phoneNumber: profile.phoneNumber || '',
        });
      } else { // If profile not found, reset form with userId to avoid stale data from previous user
         profileForm.reset({
          userId: userId, // Keep current userId
          firstName: '', lastName: '', phoneNumber: '',
        });
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
      toast({ title: 'Error', description: 'Failed to load profile data.', variant: 'destructive' });
      profileForm.reset({ userId: userId, firstName: '', lastName: '', phoneNumber: ''}); // Reset but keep userId
    } finally {
      setIsLoadingProfile(false);
    }
  }, [profileForm, toast]); // profileForm is stable from useForm

  const fetchAddresses = useCallback(async (userId: string) => {
    setIsLoadingAddresses(true);
    try {
      const addresses = await getShippingAddresses(userId);
      setShippingAddresses(addresses);
    } catch (error) {
      console.error("Error fetching addresses:", error);
      toast({ title: 'Error', description: 'Failed to load shipping addresses.', variant: 'destructive' });
    } finally {
      setIsLoadingAddresses(false);
    }
  }, [toast]);
  
  // Initial effect to get currentUserId from localStorage
  useEffect(() => {
    const tempId = getTemporaryUserId();
    if (tempId) {
      setCurrentUserId(tempId);
      // Data fetching will be triggered by the useEffect below, watching currentUserId
    } else {
      // No user ID found, so stop loading states
      setIsLoadingProfile(false);
      setIsLoadingAddresses(false);
      setIsLoadingOrders(false);
    }
  }, []);

  // Effect for data fetching when currentUserId is available or changes
  useEffect(() => {
    if (currentUserId) {
      fetchProfileData(currentUserId);
      fetchAddresses(currentUserId);
      // Fetch order history (placeholder for now)
      // getOrderHistory(currentUserId).then(setOrderHistory).finally(() => setIsLoadingOrders(false));
      setIsLoadingOrders(false); // Simulating no orders for now

      // Ensure forms have the correct userId if not already set
      if (!profileForm.getValues('userId')) {
        profileForm.setValue('userId', currentUserId);
      }
      if (!addressForm.getValues('userId')) {
        addressForm.setValue('userId', currentUserId);
      }
    }
  }, [currentUserId, fetchProfileData, fetchAddresses, profileForm, addressForm]);

  // Effect for handling profile form submission state
  useEffect(() => {
    if (profileFormState.message) {
      toast({
        title: profileFormState.success ? 'Profile Update' : 'Update Error',
        description: profileFormState.message,
        variant: profileFormState.success ? 'default' : 'destructive',
      });
      if (profileFormState.success && profileFormState.data?.userId) {
        fetchProfileData(profileFormState.data.userId); // Re-fetch profile on success
      } else if (!profileFormState.success && profileFormState.errors) {
        Object.entries(profileFormState.errors).forEach(([field, messages]) => {
          if (messages && field !== '_form') {
            profileForm.setError(field as keyof UserProfileUpdateInput, { type: 'server', message: messages.join(', ') });
          }
        });
      }
    }
  }, [profileFormState, toast, fetchProfileData, profileForm]);
  
  // Effect for handling address form submission state
  useEffect(() => {
    if (addressFormState.message) {
      toast({
        title: addressFormState.success ? 'Address Added' : 'Address Error',
        description: addressFormState.message,
        variant: addressFormState.success ? 'default' : 'destructive',
      });
      if (addressFormState.success && addressFormState.data?.userId) {
        // Reset address form, keeping userId
        addressForm.reset({ 
            userId: addressFormState.data.userId, 
            fullName: '', street: '', city: '', state: '', 
            postalCode: '', country: '', phoneNumber: '' 
        });
        fetchAddresses(addressFormState.data.userId); // Re-fetch addresses on success
      } else if (!addressFormState.success && addressFormState.errors) {
        Object.entries(addressFormState.errors).forEach(([field, messages]) => {
          if (messages && field !== '_form') {
            addressForm.setError(field as keyof AddressInput, { type: 'server', message: messages.join(', ') });
          }
        });
      }
    }
  }, [addressFormState, toast, fetchAddresses, addressForm]);

  // Display "Please log in" if no userId is found after initial client-side check
  if (!isLoadingProfile && !isLoadingAddresses && !currentUserId) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-grow container mx-auto px-2 py-8 md:py-12">
          <Card className="mb-8 shadow-lg rounded-lg border-border/70">
            <CardHeader>
              <CardTitle className="font-headline text-2xl text-primary flex items-center">
                <AlertTriangle className="mr-3 h-6 w-6 text-destructive" />
                Profile Access Denied
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center py-10">
              <p className="text-lg text-muted-foreground mb-4">
                You need to be logged in to view your profile.
              </p>
              <Button asChild>
                <Link href="/signin">Go to Login</Link>
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-2 py-8 md:py-12">
        <div className="flex items-center space-x-3 mb-10">
          <UserCircle2 className="h-10 w-10 text-primary" />
          <h1 className="text-4xl font-headline text-primary">My Account</h1>
        </div>
        
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
                <CardDescription>Update your personal information. Your email (<span className="font-medium text-foreground">{isLoadingProfile ? 'Loading...' : (userProfileData?.email || 'N/A')}</span>) is used for login and cannot be changed here.</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoadingProfile ? (
                  <div className="flex justify-center items-center py-10"><Loader2 className="h-8 w-8 animate-spin text-primary"/> <span className="ml-2 text-muted-foreground">Loading profile...</span></div>
                ) : userProfileData ? (
                <Form {...profileForm}>
                  <form action={profileFormAction} className="space-y-6">
                    {/* Hidden field for userId, crucial for the server action */}
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
                        <FormLabel>Phone Number (Optional)</FormLabel>
                        <FormControl><Input type="tel" placeholder="e.g., +1234567890" {...field} value={field.value || ''} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    {profileFormState.errors?._form && !profileFormState.success && (
                        <p className="text-sm font-medium text-destructive">{profileFormState.errors._form.join(', ')}</p>
                    )}
                    <Button type="submit" disabled={isProfileUpdatePending || !currentUserId} className="w-full md:w-auto">
                      {isProfileUpdatePending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                      {isProfileUpdatePending ? 'Saving Changes...' : 'Save Changes'}
                    </Button>
                  </form>
                </Form>
                ) : (
                  <p className="text-muted-foreground text-center py-4">Could not load profile details. User data may not exist or there was an error fetching it.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="addresses">
            <Card className="shadow-lg rounded-lg border-border/70">
              <CardHeader>
                <CardTitle className="font-headline text-2xl text-primary">Shipping Addresses</CardTitle>
                <CardDescription>Manage your saved shipping addresses.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div>
                    <h3 className="text-lg font-semibold mb-4 text-foreground">Your Addresses</h3>
                    {isLoadingAddresses ? (
                         <div className="flex justify-center items-center py-10"><Loader2 className="h-8 w-8 animate-spin text-primary"/> <span className="ml-2 text-muted-foreground">Loading addresses...</span></div>
                    ) : shippingAddresses.length > 0 ? (
                      <div className="space-y-4">
                        {shippingAddresses.map((address) => (
                          <Card key={address.id} className="p-4 border-border/50 shadow-sm">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="font-semibold text-foreground">{address.fullName}</p>
                                    <p className="text-sm text-muted-foreground">{address.street}</p>
                                    <p className="text-sm text-muted-foreground">{address.city}, {address.state} {address.postalCode}</p>
                                    <p className="text-sm text-muted-foreground">{address.country}</p>
                                    {address.phoneNumber && <p className="text-sm text-muted-foreground">Phone: {address.phoneNumber}</p>}
                                </div>
                                <div className="flex space-x-2">
                                    <Button variant="outline" size="icon" className="h-8 w-8" disabled title="Edit (Disabled)">
                                        <Edit3 className="h-4 w-4"/>
                                        <span className="sr-only">Edit Address (Disabled)</span>
                                    </Button>
                                     <Button variant="destructive" size="icon" className="h-8 w-8" disabled title="Delete (Disabled)">
                                        <Trash2 className="h-4 w-4"/>
                                         <span className="sr-only">Delete Address (Disabled)</span>
                                    </Button>
                                </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground text-center py-4">You haven't added any shipping addresses yet.</p>
                    )}
                </div>
                <Separator />
                <div>
                    <h3 className="text-lg font-semibold mb-4 text-foreground">Add New Address</h3>
                     <Form {...addressForm}>
                        <form action={addressFormAction} className="space-y-6">
                        {/* Hidden field for userId, crucial for the server action */}
                        <input type="hidden" {...addressForm.register('userId')} value={currentUserId || ''} />
                        
                        <FormField control={addressForm.control} name="fullName" render={({ field }) => (
                            <FormItem><FormLabel>Full Name (Recipient)</FormLabel><FormControl><Input placeholder="Recipient's full name" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={addressForm.control} name="street" render={({ field }) => (
                            <FormItem><FormLabel>Street Address</FormLabel><FormControl><Input placeholder="123 Decor Lane, Apt 4B" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField control={addressForm.control} name="city" render={({ field }) => (
                                <FormItem><FormLabel>City</FormLabel><FormControl><Input placeholder="City" {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                            <FormField control={addressForm.control} name="state" render={({ field }) => (
                                <FormItem><FormLabel>State / Province</FormLabel><FormControl><Input placeholder="State or Province" {...field} /></FormControl><FormMessage /></FormItem>
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
                            <FormItem><FormLabel>Phone Number (Optional for this address)</FormLabel><FormControl><Input type="tel" placeholder="e.g. +1234567890" {...field} value={field.value || ''} /></FormControl><FormMessage /></FormItem>
                        )} />
                        {addressFormState.errors?._form && !addressFormState.success && (
                            <p className="text-sm font-medium text-destructive">{addressFormState.errors._form.join(', ')}</p>
                        )}
                        <Button type="submit" disabled={isAddressAddPending || !currentUserId} className="w-full md:w-auto">
                            {isAddressAddPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <PlusCircle className="mr-2 h-4 w-4" />}
                            {isAddressAddPending ? 'Adding Address...' : 'Add Address'}
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
                <CardDescription>View your past orders with Aarambh Decor.</CardDescription>
              </CardHeader>
              <CardContent className="text-center py-10">
                 {isLoadingOrders ? (
                    <div className="flex justify-center items-center py-10"><Loader2 className="h-8 w-8 animate-spin text-primary"/> <span className="ml-2 text-muted-foreground">Loading order history...</span></div>
                 ) : orderHistory.length > 0 ? (
                    // This would be replaced with actual order list rendering
                    <p className="text-muted-foreground">Displaying order history is under development. Order data would be shown here.</p> 
                 ) : (
                    <>
                        <ShoppingBag className="h-12 w-12 text-primary mx-auto mb-4 opacity-70" />
                        <p className="text-lg text-muted-foreground mb-2">You have no past orders.</p>
                        <p className="text-sm text-muted-foreground mb-6">Once you place an order, it will appear here.</p>
                        <Button asChild>
                            <Link href="/collections"><Home className="mr-2 h-4 w-4"/>Start Shopping</Link>
                        </Button>
                    </>
                 )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
}
