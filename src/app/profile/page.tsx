
'use client';

import { useEffect, useState, useActionState } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { AlertTriangle, Loader2, UserCircle2, Home, Edit3, Trash2, PlusCircle, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { UserProfile, Address, AddressInput } from '@/lib/types';
import { UserProfileSchema, AddressSchema, type UserProfileInput } from '@/lib/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import {
  getUserProfile,
  updateUserProfile,
  getShippingAddresses,
  addShippingAddress,
  updateShippingAddress,
  deleteShippingAddress,
  type FormState
} from './actions';

function ProfileSubmitButton({ pending, text = "Save Changes" }: { pending: boolean, text?: string }) {
  return (
    <Button type="submit" disabled={pending}>
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      {text}
    </Button>
  );
}

export default function ProfilePage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  const initialProfileFormState: FormState = { message: null, success: false };
  const [profileFormState, profileFormAction] = useActionState(updateUserProfile, initialProfileFormState);

  const initialAddressFormState: FormState = { message: null, success: false };
  const [addressFormState, addressFormAction] = useActionState(
    editingAddress ? updateShippingAddress : addShippingAddress, 
    initialAddressFormState
  );
  
  const profileForm = useForm<UserProfileInput>({
    resolver: zodResolver(UserProfileSchema),
    defaultValues: { name: '' },
  });

  const addressForm = useForm<AddressInput>({
    resolver: zodResolver(AddressSchema),
    defaultValues: {
      fullName: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'India', // Default country
      phoneNumber: '',
    },
  });

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/signin');
    } else if (user) {
      fetchProfileAndAddresses();
    }
  }, [user, authLoading, router]);

  const fetchProfileAndAddresses = async () => {
    if (!user) return;
    setIsLoadingData(true);
    try {
      const profileData = await getUserProfile();
      setUserProfile(profileData);
      if (profileData?.name) {
        profileForm.reset({ name: profileData.name });
      }
      const addressesData = await getShippingAddresses();
      setAddresses(addressesData);
    } catch (error) {
      toast({ title: "Error", description: "Failed to load profile data.", variant: "destructive" });
    } finally {
      setIsLoadingData(false);
    }
  };

  useEffect(() => {
    if (profileFormState.message) {
      toast({
        title: profileFormState.success ? 'Success' : 'Error',
        description: profileFormState.message,
        variant: profileFormState.success ? 'default' : 'destructive',
      });
      if (profileFormState.success) fetchProfileAndAddresses(); // Re-fetch to show updated name
    }
  }, [profileFormState, toast]);

  useEffect(() => {
    if (addressFormState.message) {
      toast({
        title: addressFormState.success ? 'Success' : 'Error',
        description: addressFormState.message,
        variant: addressFormState.success ? 'default' : 'destructive',
      });
      if (addressFormState.success) {
        fetchProfileAndAddresses(); // Re-fetch addresses
        setIsAddressModalOpen(false);
        setEditingAddress(null);
        addressForm.reset();
      }
    }
  }, [addressFormState, toast]);

  const handleOpenAddAddressModal = () => {
    setEditingAddress(null);
    addressForm.reset({ // Reset to default or empty for new address
        fullName: '', addressLine1: '', addressLine2: '', city: '',
        state: '', postalCode: '', country: 'India', phoneNumber: ''
    });
    setIsAddressModalOpen(true);
  };

  const handleOpenEditAddressModal = (address: Address) => {
    setEditingAddress(address);
    addressForm.reset({ ...address }); // Populate form with address data
    setIsAddressModalOpen(true);
  };

  const handleDeleteAddress = async (addressId?: string) => {
    if (!addressId) return;
    if (!confirm('Are you sure you want to delete this address?')) return;

    const result = await deleteShippingAddress(addressId);
    toast({
      title: result.success ? 'Success' : 'Error',
      description: result.message,
      variant: result.success ? 'default' : 'destructive',
    });
    if (result.success) {
      fetchProfileAndAddresses();
    }
  };
  
  if (authLoading || isLoadingData) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-grow container mx-auto px-2 py-8 md:py-12 flex justify-center items-center">
          <Loader2 className="h-12 w-12 text-primary animate-spin" />
          <p className="ml-4 text-lg text-muted-foreground">Loading your profile...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!user) {
    // This case should be handled by the useEffect redirect, but as a fallback:
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-grow container mx-auto px-2 py-8 md:py-12 text-center">
          <AlertTriangle className="h-12 w-12 text-primary mx-auto mb-4" />
          <h1 className="text-3xl font-headline text-primary mb-2">Access Denied</h1>
          <p className="text-muted-foreground mb-6">Please log in to view your profile.</p>
        </main>
        <Footer />
      </div>
    );
  }
  
  const {formState: {isSubmitting: isProfileSubmitting}} = profileForm;
  const {formState: {isSubmitting: isAddressSubmitting}} = addressForm;


  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-2 py-8 md:py-12">
        <div className="flex items-center space-x-3 mb-10">
          <UserCircle2 className="h-10 w-10 text-primary" />
          <h1 className="text-4xl font-headline text-primary">My Profile</h1>
        </div>

        {/* Personal Details Section */}
        <Card className="mb-8 shadow-lg rounded-lg border-border/70">
          <CardHeader>
            <CardTitle className="font-headline text-2xl text-primary">Personal Details</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...profileForm}>
              <form action={profileFormAction} className="space-y-6">
                <FormField
                  control={profileForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div>
                  <Label>Email</Label>
                  <Input type="email" value={userProfile?.email || ''} disabled className="mt-1 bg-muted/50"/>
                  <p className="text-sm text-muted-foreground mt-1">Email cannot be changed.</p>
                </div>
                 {profileFormState.errors?._form && (
                  <p className="text-sm font-medium text-destructive">{profileFormState.errors._form.join(', ')}</p>
                )}
                <ProfileSubmitButton pending={isProfileSubmitting} />
              </form>
            </Form>
          </CardContent>
        </Card>

        <Separator className="my-10" />

        {/* Shipping Addresses Section */}
        <Card className="shadow-lg rounded-lg border-border/70">
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle className="font-headline text-2xl text-primary">Shipping Addresses</CardTitle>
            <Dialog open={isAddressModalOpen} onOpenChange={setIsAddressModalOpen}>
              <DialogTrigger asChild>
                <Button onClick={handleOpenAddAddressModal}>
                  <PlusCircle className="mr-2 h-4 w-4" /> Add New Address
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg">
                 <Form {...addressForm}>
                    <form 
                        action={async (formData) => {
                            const actionToCall = editingAddress ? updateShippingAddress : addShippingAddress;
                            const state = await actionToCall(initialAddressFormState, formData);
                            // Manually update addressFormState for immediate feedback/error handling
                             if (state.message) {
                                toast({
                                    title: state.success ? 'Success' : 'Error',
                                    description: state.message,
                                    variant: state.success ? 'default' : 'destructive',
                                });
                            }
                            if (state.errors) {
                                Object.entries(state.errors).forEach(([key, value]) => {
                                    if (value) {
                                        addressForm.setError(key as keyof AddressInput, { type: 'server', message: value.join(', ') });
                                    }
                                });
                            }
                            if (state.success) {
                                fetchProfileAndAddresses();
                                setIsAddressModalOpen(false);
                                setEditingAddress(null);
                                addressForm.reset();
                            }
                        }}
                        className="space-y-4"
                    >
                      <DialogHeader>
                        <DialogTitle className="font-headline text-xl text-primary">
                          {editingAddress ? 'Edit Shipping Address' : 'Add New Shipping Address'}
                        </DialogTitle>
                        <DialogDescription>
                          Please fill in the details for your shipping address.
                        </DialogDescription>
                      </DialogHeader>
                      
                      {editingAddress && <Input type="hidden" {...addressForm.register("id")} defaultValue={editingAddress.id} />}

                      <FormField control={addressForm.control} name="fullName" render={({ field }) => (
                        <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input placeholder="Priya Sharma" {...field} /></FormControl><FormMessage /></FormItem>
                      )}/>
                      <FormField control={addressForm.control} name="addressLine1" render={({ field }) => (
                        <FormItem><FormLabel>Address Line 1</FormLabel><FormControl><Input placeholder="123, Lotus Lane" {...field} /></FormControl><FormMessage /></FormItem>
                      )}/>
                      <FormField control={addressForm.control} name="addressLine2" render={({ field }) => (
                        <FormItem><FormLabel>Address Line 2 (Optional)</FormLabel><FormControl><Input placeholder="Near Rose Garden" {...field} /></FormControl><FormMessage /></FormItem>
                      )}/>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField control={addressForm.control} name="city" render={({ field }) => (
                            <FormItem><FormLabel>City</FormLabel><FormControl><Input placeholder="Mumbai" {...field} /></FormControl><FormMessage /></FormItem>
                        )}/>
                        <FormField control={addressForm.control} name="state" render={({ field }) => (
                            <FormItem><FormLabel>State / Province</FormLabel><FormControl><Input placeholder="Maharashtra" {...field} /></FormControl><FormMessage /></FormItem>
                        )}/>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField control={addressForm.control} name="postalCode" render={({ field }) => (
                            <FormItem><FormLabel>Postal Code</FormLabel><FormControl><Input placeholder="400001" {...field} /></FormControl><FormMessage /></FormItem>
                        )}/>
                        <FormField control={addressForm.control} name="country" render={({ field }) => (
                            <FormItem><FormLabel>Country</FormLabel><FormControl><Input placeholder="India" {...field} /></FormControl><FormMessage /></FormItem>
                        )}/>
                      </div>
                      <FormField control={addressForm.control} name="phoneNumber" render={({ field }) => (
                        <FormItem><FormLabel>Phone Number (Optional)</FormLabel><FormControl><Input type="tel" placeholder="+91 9876543210" {...field} /></FormControl><FormMessage /></FormItem>
                      )}/>
                       {addressFormState.errors?._form && (
                        <p className="text-sm font-medium text-destructive">{addressFormState.errors._form.join(', ')}</p>
                       )}
                      <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline">Cancel</Button>
                        </DialogClose>
                        <ProfileSubmitButton pending={isAddressSubmitting} text={editingAddress ? "Update Address" : "Add Address"} />
                      </DialogFooter>
                    </form>
                  </Form>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            {addresses.length === 0 ? (
              <div className="text-center py-6 text-muted-foreground">
                <Home className="mx-auto h-10 w-10 mb-3 opacity-50" />
                <p>You haven't added any shipping addresses yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {addresses.map((address) => (
                  <Card key={address.id} className="p-4 border-border/50 shadow-sm animate-pop-in">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-foreground">{address.fullName}</p>
                        <p className="text-sm text-muted-foreground">{address.addressLine1}</p>
                        {address.addressLine2 && <p className="text-sm text-muted-foreground">{address.addressLine2}</p>}
                        <p className="text-sm text-muted-foreground">
                          {address.city}, {address.state} - {address.postalCode}
                        </p>
                        <p className="text-sm text-muted-foreground">{address.country}</p>
                        {address.phoneNumber && <p className="text-sm text-muted-foreground">Phone: {address.phoneNumber}</p>}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="icon" onClick={() => handleOpenEditAddressModal(address)}>
                          <Edit3 className="h-4 w-4" />
                           <span className="sr-only">Edit Address</span>
                        </Button>
                        <Button variant="destructive" size="icon" onClick={() => handleDeleteAddress(address.id)}>
                          <Trash2 className="h-4 w-4" />
                           <span className="sr-only">Delete Address</span>
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
