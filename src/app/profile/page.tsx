
'use client';

import { useEffect, useState, useActionState } from 'react';
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
import { Loader2, UserCircle2, Home, Edit3, Trash2, PlusCircle, ShoppingBag, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { UserProfile, Address, Order } from '@/lib/types';
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
  getOrderHistory,
  type FormState
} from './actions';

function ProfileSubmitButton({ pending, text = "Save Changes", icon }: { pending: boolean, text?: string, icon?: React.ReactNode }) {
  return (
    <Button type="submit" disabled={pending}>
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : (icon ? <span className="mr-2">{icon}</span> : null)}
      {text}
    </Button>
  );
}

export default function ProfilePage() {
  const { user } 
    = useAuth();
  const router = useRouter(); 
  const { toast } = useToast();

  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  const initialFormState: FormState = { message: null, success: false, errors: undefined };
  const [profileFormState, profileFormAction, isProfileSubmitting] = useActionState(updateUserProfile, initialFormState);
  
  const [addAddressState, addAddressAction, isAddingAddress] = useActionState(addShippingAddress, initialFormState);
  const [updateAddressState, updateAddressAction, isUpdatingAddress] = useActionState(updateShippingAddress, initialFormState);
  
  const profileForm = useForm<UserProfileInput>({
    resolver: zodResolver(UserProfileSchema),
    defaultValues: { firstName: '', lastName: '', phoneNumber: '' },
  });

  const addressForm = useForm<AddressInput>({
    resolver: zodResolver(AddressSchema),
    defaultValues: {
      fullName: '', addressLine1: '', addressLine2: '', city: '',
      state: '', postalCode: '', country: 'India', phoneNumber: '',
    },
  });

  const fetchProfileData = async () => {
    setIsLoadingData(true);
    try {
      const [profileData, addressesData, ordersData] = await Promise.all([
        getUserProfile(user), 
        getShippingAddresses(), 
        getOrderHistory()
      ]);
      
      setUserProfile(profileData);
      profileForm.reset({ 
        firstName: profileData?.firstName || '', 
        lastName: profileData?.lastName || '',
        phoneNumber: profileData?.phoneNumber || '',
      });

      setAddresses(addressesData);
      setOrders(ordersData);

    } catch (error) {
      console.error("Failed to load profile data:", error)
      toast({ title: "Error", description: "Failed to load profile data.", variant: "destructive" });
    } finally {
      setIsLoadingData(false);
    }
  };

  useEffect(() => {
    fetchProfileData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]); 


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
        fetchProfileData(); 
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileFormState]);

  const handleAddressFormSuccess = (state: FormState) => { 
     if (state.message) {
      toast({
        title: state.success ? 'Success' : 'Error',
        description: state.message,
        variant: state.success ? 'default' : 'destructive',
      });
      if (state.errors) {
        Object.entries(state.errors).forEach(([field, messages]) => {
          if (messages && field !== '_form') {
             addressForm.setError(field as keyof AddressInput, { type: 'server', message: messages.join(', ') });
          }
        });
      }
      if (state.success) {
        fetchProfileData();
        setIsAddressModalOpen(false);
        setEditingAddress(null);
        addressForm.reset({
            fullName: '', addressLine1: '', addressLine2: '', city: '',
            state: '', postalCode: '', country: 'India', phoneNumber: ''
        });
      }
    }
  }

  useEffect(() => {
    handleAddressFormSuccess(addAddressState);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addAddressState]);

  useEffect(() => {
    handleAddressFormSuccess(updateAddressState);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateAddressState]);


  const handleOpenAddAddressModal = () => {
    setEditingAddress(null);
    addressForm.reset({ 
        fullName: '', addressLine1: '', addressLine2: '', city: '',
        state: '', postalCode: '', country: 'India', phoneNumber: ''
    });
    setIsAddressModalOpen(true);
  };

  const handleOpenEditAddressModal = (address: Address) => {
    setEditingAddress(address);
    addressForm.reset({ ...address, phoneNumber: address.phoneNumber || '' }); 
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
      fetchProfileData();
    }
  };

  const onAddressFormSubmit: SubmitHandler<AddressInput> = (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
             formData.append(key, String(value));
        }
    });

    if (editingAddress && editingAddress.id) {
        formData.append('id', editingAddress.id);
        updateAddressAction(formData);
    } else {
        addAddressAction(formData);
    }
  };
  
  if (isLoadingData) { 
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-grow container mx-auto px-2 py-8 md:py-12 flex justify-center items-center">
          <Loader2 className="h-12 w-12 text-primary animate-spin" />
          <p className="ml-4 text-lg text-muted-foreground">Loading profile data...</p>
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
                  <FormField
                      control={profileForm.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number (Optional)</FormLabel>
                          <FormControl>
                            <Input type="tel" placeholder="e.g. +911234567890" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                <div>
                  <Label>Email</Label>
                  <Input type="email" value={userProfile?.email || user?.email || 'Not logged in'} disabled={!!userProfile?.email || !!user?.email} className="mt-1 bg-muted/50"/>
                  <p className="text-sm text-muted-foreground mt-1">
                    {userProfile?.email || user?.email ? "Email cannot be changed." : "Log in to see your email."}
                  </p>
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

        <Card className="mb-8 shadow-lg rounded-lg border-border/70">
          <CardHeader className="flex flex-row justify-between items-center">
            <div className="flex items-center space-x-2">
                <Home className="h-6 w-6 text-primary" />
                <CardTitle className="font-headline text-2xl text-primary">Shipping Addresses</CardTitle>
            </div>
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
              <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
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
                        <FormItem><FormLabel>Phone Number (Optional)</FormLabel><FormControl><Input type="tel" placeholder="e.g. +919876543210" {...field} /></FormControl><FormMessage /></FormItem>
                      )}/>
                       {(addAddressState.errors?._form && !editingAddress) && (
                        <p className="text-sm font-medium text-destructive">{addAddressState.errors._form.join(', ')}</p>
                       )}
                       {(updateAddressState.errors?._form && editingAddress) && (
                        <p className="text-sm font-medium text-destructive">{updateAddressState.errors._form.join(', ')}</p>
                       )}
                      <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline">Cancel</Button>
                        </DialogClose>
                        <ProfileSubmitButton pending={editingAddress ? isUpdatingAddress : isAddingAddress} text={editingAddress ? "Update Address" : "Add Address"} />
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
                <p>{user ? "You haven't added any shipping addresses yet." : "Log in to manage your shipping addresses."}</p>
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
                      <div className="flex gap-2 flex-shrink-0">
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

        <Separator className="my-10" />

        <Card className="shadow-lg rounded-lg border-border/70">
           <CardHeader>
            <div className="flex items-center space-x-2">
                <ShoppingBag className="h-6 w-6 text-primary" />
                <CardTitle className="font-headline text-2xl text-primary">Order History</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            {orders.length === 0 ? (
              <div className="text-center py-6 text-muted-foreground">
                <ShoppingBag className="mx-auto h-10 w-10 mb-3 opacity-50" />
                 <p>{user ? "You haven't placed any orders yet." : "Log in to see your order history."}</p>
                {user && (
                    <Button asChild variant="link" className="mt-2">
                        <Link href="/collections">Start Shopping</Link>
                    </Button>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <Card key={order.id} className="p-4 border-border/50 shadow-sm animate-pop-in">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-3">
                      <div className="flex-grow">
                        <p className="font-semibold text-foreground">Order ID: {order.id.substring(0,8)}...</p>
                        <p className="text-sm text-muted-foreground">Date: {new Date(order.orderDate).toLocaleDateString()}</p>
                        <p className="text-sm text-muted-foreground">Total: Rs. {order.totalAmount.toFixed(2)}</p>
                        <p className="text-sm text-muted-foreground">Status: <span className="font-medium">{order.status}</span></p>
                         <div className="mt-2 text-xs text-muted-foreground">
                            {order.items.map(item => item.productName).join(', ')}
                        </div>
                      </div>
                       <Button variant="outline" size="sm" asChild disabled> 
                          <Link href={`/profile/orders/${order.id}`}>View Details</Link>
                       </Button>
                    </div>
                  </Card>
                ))}
                 {orders.length > 0 && (
                    <div className="text-center py-6 text-muted-foreground border-t mt-6 pt-6">
                        <Info className="mx-auto h-8 w-8 mb-3 opacity-50" />
                        <p>Full order details page is coming soon!</p>
                    </div>
                 )}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}

