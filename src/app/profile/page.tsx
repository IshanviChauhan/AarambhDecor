
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { AlertTriangle, Loader2, UserCircle2, Home, Edit3, Trash2, PlusCircle, Database } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { UserProfile, Address } from '@/lib/types';
import { UserProfileSchema, AddressSchema, type UserProfileInput, type AddressInput } from '@/lib/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
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
import { seedProductsToFirestore } from '@/app/products/actions'; // Import the seed function
import { useActionState } from 'react';


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

  const initialProfileFormState: FormState = { message: null, success: false, errors: undefined };
  const [profileFormState, profileFormAction, isProfileSubmitting] = useActionState(updateUserProfile, initialProfileFormState);
  
  const initialAddressFormState: FormState = { message: null, success: false, errors: undefined };
  const [currentAddressServerAction, setCurrentAddressServerAction] = useState<'add' | 'update'>('add');

  // This ensures the correct action is used based on currentAddressServerAction
  const addressActionToUse = currentAddressServerAction === 'add' ? addShippingAddress : updateShippingAddress;
  const [addressFormState, actualAddressFormAction, isAddressFormSubmitting] = useActionState(
    addressActionToUse, 
    initialAddressFormState
  );
  

  const profileForm = useForm<UserProfileInput>({
    resolver: zodResolver(UserProfileSchema),
    defaultValues: { firstName: '', lastName: '' },
  });

  const addressForm = useForm<AddressInput>({
    resolver: zodResolver(AddressSchema),
    defaultValues: {
      fullName: '', addressLine1: '', addressLine2: '', city: '',
      state: '', postalCode: '', country: 'India', phoneNumber: '',
    },
  });

  const fetchProfileAndAddresses = async () => {
    if (!user) return;
    setIsLoadingData(true);
    try {
      const profileData = await getUserProfile();
      setUserProfile(profileData);
      profileForm.reset({ 
        firstName: profileData?.firstName || '', 
        lastName: profileData?.lastName || '' 
      });

      const addressesData = await getShippingAddresses();
      setAddresses(addressesData);
    } catch (error) {
      console.error("Failed to load profile data:", error)
      toast({ title: "Error", description: "Failed to load profile data.", variant: "destructive" });
    } finally {
      setIsLoadingData(false);
    }
  };

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/signin');
    } else if (user) {
      fetchProfileAndAddresses();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, authLoading, router]);


  useEffect(() => {
    if (profileFormState.message) {
      toast({
        title: profileFormState.success ? 'Success' : 'Error',
        description: profileFormState.message,
        variant: profileFormState.success ? 'default' : 'destructive',
      });
       if (profileFormState.errors) {
        Object.entries(profileFormState.errors).forEach(([field, messages]) => {
          if (messages && field !== '_form') { 
            profileForm.setError(field as keyof UserProfileInput, { type: 'server', message: messages.join(', ') });
          }
        });
      }
      if (profileFormState.success) {
        fetchProfileAndAddresses(); 
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileFormState]);


 useEffect(() => {
    if (addressFormState.message) {
      toast({
        title: addressFormState.success ? 'Success' : 'Error',
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
      if (addressFormState.success) {
        fetchProfileAndAddresses();
        setIsAddressModalOpen(false);
        addressForm.reset({
            fullName: '', addressLine1: '', addressLine2: '', city: '',
            state: '', postalCode: '', country: 'India', phoneNumber: ''
        });
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addressFormState]);

  // Handler for the seed data button
  const handleSeedData = async () => {
    toast({ title: "Seeding Data...", description: "Please wait, this may take a moment." });
    const result = await seedProductsToFirestore();
    toast({
      title: result.success ? 'Seeding Successful' : 'Seeding Failed',
      description: result.message + (result.success ? ` Added ${result.count} products.` : ''),
      variant: result.success ? 'default' : 'destructive',
      duration: result.success ? 5000 : 10000, // Show success for shorter, error for longer
    });
  };


  const handleOpenAddAddressModal = () => {
    setEditingAddress(null);
    setCurrentAddressServerAction('add');
    addressForm.reset({ 
        fullName: '', addressLine1: '', addressLine2: '', city: '',
        state: '', postalCode: '', country: 'India', phoneNumber: ''
    });
    setIsAddressModalOpen(true);
  };

  const handleOpenEditAddressModal = (address: Address) => {
    setEditingAddress(address);
    setCurrentAddressServerAction('update');
    addressForm.reset({ ...address }); 
    setIsAddressModalOpen(true);
  };

  const handleDeleteAddress = async (addressId?: string) => {
    if (!addressId) return;
    const confirmed = window.confirm('Are you sure you want to delete this address?');
    if (!confirmed) return;

    const result = await deleteShippingAddress(addressId);
    toast({
      title: result.success ? 'Success' : 'Error',
      description: result.message || 'Operation status unknown',
      variant: result.success ? 'default' : 'destructive',
    });
    if (result.success) {
      fetchProfileAndAddresses();
    }
  };

  const onAddressFormSubmit: SubmitHandler<AddressInput> = (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
             formData.append(key, String(value));
        }
    });

    if (editingAddress && editingAddress.id && currentAddressServerAction === 'update') {
        formData.append('id', editingAddress.id);
    }
    actualAddressFormAction(formData);
  };
  
  if (authLoading || (isLoadingData && !userProfile && user)) { 
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
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-grow container mx-auto px-2 py-8 md:py-12 text-center">
          <AlertTriangle className="h-12 w-12 text-primary mx-auto mb-4" />
          <h1 className="text-3xl font-headline text-primary mb-2">Access Denied</h1>
          <p className="text-muted-foreground mb-6">Please log in to view your profile.</p>
           <Button asChild><Link href="/signin">Log In</Link></Button>
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
          <h1 className="text-4xl font-headline text-primary">My Profile</h1>
        </div>

        <Card className="mb-8 shadow-lg rounded-lg border-border/70">
          <CardHeader>
            <CardTitle className="font-headline text-2xl text-primary">Personal Details</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...profileForm}>
              <form action={profileFormAction} className="space-y-6">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={profileForm.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your first name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={profileForm.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your last name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                <div>
                  <Label>Email</Label>
                  <Input type="email" value={userProfile?.email || user.email || ''} disabled className="mt-1 bg-muted/50"/>
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

        <Card className="shadow-lg rounded-lg border-border/70">
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle className="font-headline text-2xl text-primary">Shipping Addresses</CardTitle>
            <Dialog open={isAddressModalOpen} onOpenChange={(isOpen) => {
              setIsAddressModalOpen(isOpen);
              if (!isOpen) { 
                setEditingAddress(null);
                addressForm.reset({
                    fullName: '', addressLine1: '', addressLine2: '', city: '',
                    state: '', postalCode: '', country: 'India', phoneNumber: ''
                });
              }
            }}>
              <DialogTrigger asChild>
                <Button onClick={handleOpenAddAddressModal}>
                  <PlusCircle className="mr-2 h-4 w-4" /> Add New Address
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg">
                 <Form {...addressForm}>
                    <form 
                        onSubmit={addressForm.handleSubmit(onAddressFormSubmit)}
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
                        <ProfileSubmitButton pending={isAddressFormSubmitting} text={editingAddress ? "Update Address" : "Add Address"} />
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
        
        {/* Temporary Seeding Button Section - REMOVE AFTER USE */}
        <Separator className="my-10" />
        <Card className="mb-8 shadow-lg rounded-lg border-border/70">
          <CardHeader>
            <CardTitle className="font-headline text-2xl text-destructive">Admin: Database Tools</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              This button will populate the Firestore database with the mock product data. 
              <strong> Only click this once.</strong> After successful seeding, remove this button from the code.
            </p>
            <Button onClick={handleSeedData} variant="destructive" className="w-full sm:w-auto">
              <Database className="mr-2 h-4 w-4" />
              Seed Product Data to Firestore
            </Button>
          </CardContent>
          <CardFooter>
            <CardDescription>
                Ensure your Firestore security rules for the 'products' collection are set up correctly before seeding.
                (Allow public read, and temporarily allow write or ensure server action has privileges).
            </CardDescription>
          </CardFooter>
        </Card>
        {/* End Temporary Seeding Button Section */}

      </main>
      <Footer />
    </div>
  );
}

    