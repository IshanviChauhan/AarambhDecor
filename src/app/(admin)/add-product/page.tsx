
'use client';

import { useState, useEffect, useActionState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProductFormSchema, type ProductFormInput } from '@/lib/schemas';
import { addProduct, type AddProductFormState } from './actions';
// Removed useAuth and router for auth check
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Loader2, AlertTriangle, UploadCloud, PlusCircle, Trash2, ImagePlus } from 'lucide-react';
import Image from 'next/image';
import { storage } from '@/lib/firebase';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

interface ImagePreview {
  file: File;
  previewUrl: string;
  aiHint: string;
  storagePath?: string;
  uploadProgress?: number;
  downloadUrl?: string;
}

export default function AddProductPage() {
  // Removed user, authLoading, router for auth check
  const { toast } = useToast();

  const [imagePreviews, setImagePreviews] = useState<ImagePreview[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(false); // Default to false as no auth check needed before render

  const initialFormState: AddProductFormState = { message: null, success: false, errors: undefined };
  const [formState, formAction, isActionPending] = useActionState(addProduct, initialFormState);

  const form = useForm<ProductFormInput>({
    resolver: zodResolver(ProductFormSchema),
    defaultValues: {
      name: '',
      description: '',
      careInstructions: '',
      price: 'Rs. ',
      category: '',
      isLatest: false,
      sizeAndDimensions: '',
      material: '',
      imageUrls: [],
    },
  });

  // Removed useEffect for auth check

  useEffect(() => {
    if (formState.message) {
      toast({
        title: formState.success ? 'Success' : 'Error',
        description: formState.message,
        variant: formState.success ? 'default' : 'destructive',
      });
      if (formState.errors) {
        Object.entries(formState.errors).forEach(([field, messages]) => {
          if (messages && field !== '_form') {
            form.setError(field as keyof ProductFormInput, { type: 'server', message: messages.join(', ') });
          }
        });
      }
      if (formState.success) {
        form.reset();
        setImagePreviews([]);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      const newImagePreviews = filesArray.map(file => ({
        file,
        previewUrl: URL.createObjectURL(file),
        aiHint: '',
        uploadProgress: 0,
      }));
      setImagePreviews(prev => [...prev, ...newImagePreviews].slice(0, 5));
    }
  };

  const handleAiHintChange = (index: number, hint: string) => {
    setImagePreviews(prev =>
      prev.map((img, i) => (i === index ? { ...img, aiHint: hint } : img))
    );
  };

  const handleRemoveImage = (indexToRemove: number) => {
    const imageToRemove = imagePreviews[indexToRemove];
    if (imageToRemove.storagePath) {
      const imageRef = ref(storage, imageToRemove.storagePath);
      deleteObject(imageRef).catch(error => console.error("Error deleting image from storage:", error));
    }
    setImagePreviews(prev => prev.filter((_, index) => index !== indexToRemove));
  };
  
  const onSubmit = async (data: ProductFormInput) => {
    if (imagePreviews.length === 0) {
      form.setError('imageUrls', { type: 'manual', message: 'At least one image is required.' });
      toast({ title: "Missing Images", description: "Please upload at least one product image.", variant: "destructive" });
      return;
    }

    setIsUploading(true);
    const uploadedImageDetails: { url: string; dataAiHint: string }[] = [];
    const uploadPromises = imagePreviews.map((imgPreview, index) => {
      const uniqueFileName = `${uuidv4()}-${imgPreview.file.name}`;
      const storagePath = `product-images/${uniqueFileName}`;
      const imageRef = ref(storage, storagePath);
      const uploadTask = uploadBytesResumable(imageRef, imgPreview.file);

      return new Promise<{ url: string; dataAiHint: string }>((resolve, reject) => {
        uploadTask.on('state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setImagePreviews(prev => prev.map((img, i) => i === index ? { ...img, uploadProgress: progress } : img));
          },
          (error) => {
            console.error("Upload failed for image", imgPreview.file.name, error);
            reject(error);
          },
          async () => {
            try {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              setImagePreviews(prev => prev.map((img, i) => i === index ? { ...img, downloadUrl: downloadURL, storagePath } : img));
              resolve({ url: downloadURL, dataAiHint: imgPreview.aiHint });
            } catch (error) {
              reject(error);
            }
          }
        );
      });
    });

    try {
      const results = await Promise.all(uploadPromises);
      uploadedImageDetails.push(...results);
      
      const formDataToSubmit = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key !== 'imageUrls' && value !== undefined && value !== null) {
          formDataToSubmit.append(key, typeof value === 'boolean' ? String(value) : String(value));
        }
      });
      
      uploadedImageDetails.forEach((img, index) => {
        formDataToSubmit.append(`imageUrls[${index}].url`, img.url);
        formDataToSubmit.append(`imageUrls[${index}].dataAiHint`, img.dataAiHint);
      });
      
      formAction(formDataToSubmit);

    } catch (error) {
      console.error("Error uploading images or submitting form:", error);
      toast({ title: "Submission Error", description: "Could not upload all images or save product details.", variant: "destructive" });
      imagePreviews.forEach(img => {
        if (img.storagePath) {
          const imageRef = ref(storage, img.storagePath);
          deleteObject(imageRef).catch(err => console.error("Cleanup: Error deleting image from storage:", err));
        }
      });
    } finally {
      setIsUploading(false);
    }
  };

  // Removed loading state based on authLoading or isPageLoading if it was tied to auth check
  // if (authLoading || isPageLoading) { ... } 

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Card className="max-w-3xl mx-auto shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl font-headline text-primary flex items-center">
              <UploadCloud className="mr-3 h-8 w-8" /> Add New Product
            </CardTitle>
            <CardDescription>Fill in the details for the new product and upload images.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl><Input placeholder="e.g., Handcrafted Wooden Bowl" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="description" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl><Textarea placeholder="Detailed description of the product..." {...field} rows={5} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField control={form.control} name="price" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl><Input placeholder="Rs. 1299.00" {...field} /></FormControl>
                      <FormDescription>Include 'Rs. ' prefix and optionally two decimal places.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="category" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl><Input placeholder="e.g., Wall Art, Decor, Kitchen" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
                
                <FormField control={form.control} name="imageUrls" render={() => (
                  <FormItem>
                    <FormLabel>Product Images (up to 5)</FormLabel>
                    <FormControl>
                       <>
                        <Input 
                            id="imageUpload"
                            type="file" 
                            multiple 
                            accept="image/png, image/jpeg, image/webp" 
                            onChange={handleFileChange}
                            className="hidden"
                        />
                        <Button type="button" variant="outline" onClick={() => document.getElementById('imageUpload')?.click()} className="w-full">
                           <ImagePlus className="mr-2 h-4 w-4"/> Select Images
                        </Button>
                       </>
                    </FormControl>
                     <FormDescription>Upload high-quality images of the product. First image will be the primary.</FormDescription>
                    {imagePreviews.length > 0 && (
                      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {imagePreviews.map((img, index) => (
                          <Card key={index} className="overflow-hidden relative group">
                            <Image src={img.previewUrl} alt={`Preview ${index + 1}`} width={150} height={150} className="object-cover w-full aspect-square" />
                            <div className="p-2 space-y-1">
                              <Input 
                                type="text" 
                                placeholder="AI Hint (e.g. 'wood bowl')" 
                                value={img.aiHint}
                                onChange={(e) => handleAiHintChange(index, e.target.value)}
                                className="text-xs h-8"
                              />
                              {img.uploadProgress !== undefined && img.uploadProgress > 0 && img.uploadProgress < 100 && !img.downloadUrl && (
                                <div className="w-full bg-muted rounded-full h-1.5">
                                  <div className="bg-primary h-1.5 rounded-full" style={{ width: `${img.uploadProgress}%` }}></div>
                                </div>
                              )}
                            </div>
                            <Button 
                                type="button" 
                                variant="destructive" 
                                size="icon" 
                                className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => handleRemoveImage(index)}
                            >
                                <Trash2 className="h-3 w-3" />
                            </Button>
                          </Card>
                        ))}
                      </div>
                    )}
                    <FormMessage />
                  </FormItem>
                )}/>

                <FormField control={form.control} name="sizeAndDimensions" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Size & Dimensions (Optional)</FormLabel>
                    <FormControl><Input placeholder="e.g., 12in x 8in x 3in or 30cm diameter" {...field} value={field.value ?? ''} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="material" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Material (Optional)</FormLabel>
                    <FormControl><Input placeholder="e.g., Mango Wood, Metal, Ceramic" {...field} value={field.value ?? ''} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                
                <FormField control={form.control} name="careInstructions" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Care Instructions (Optional)</FormLabel>
                    <FormControl><Textarea placeholder="e.g., Wipe clean with a dry cloth. Avoid direct sunlight." {...field} value={field.value ?? ''} rows={3} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="isLatest" render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
                    <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Mark as Latest Product</FormLabel>
                      <FormDescription>Featured on the homepage if marked.</FormDescription>
                    </div>
                  </FormItem>
                )} />
                
                {formState.errors?._form && (
                  <p className="text-sm font-medium text-destructive">{formState.errors._form.join(', ')}</p>
                )}

                <Button type="submit" className="w-full" disabled={isUploading || isActionPending}>
                  {(isUploading || isActionPending) ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <PlusCircle className="mr-2 h-4 w-4" />}
                  {isUploading ? 'Uploading Images...' : (isActionPending ? 'Saving Product...' : 'Add Product')}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
