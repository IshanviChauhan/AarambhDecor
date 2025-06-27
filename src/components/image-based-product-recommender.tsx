
'use client';

import { useState, useRef, type ChangeEvent } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { FileImage, ImageUp, Ban } from 'lucide-react';

export function ImageBasedProductRecommender() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          title: "File Too Large",
          description: "Please upload an image smaller than 5MB.",
          variant: "destructive",
        });
        return;
      }
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-xl rounded-lg border-border/70">
      <CardHeader>
        <div className="flex items-center space-x-3">
          <ImageUp className="h-8 w-8 text-primary" />
          <CardTitle className="font-headline text-xl md:text-2xl">AI Decor Advisor</CardTitle>
        </div>
        <CardDescription className="pt-2 text-sm md:text-base">
          Upload an image of your space to get style recommendations!
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="imageUpload" className="block text-sm font-medium text-foreground mb-2">
            Upload Image of Your Space
          </Label>
          <Input
            id="imageUpload"
            type="file"
            accept="image/png, image/jpeg, image/webp"
            onChange={handleFileChange}
            ref={fileInputRef}
            className="hidden"
          />
          <Button
            variant="outline"
            onClick={triggerFileInput}
            className="w-full border-dashed border-primary/50 hover:border-primary text-primary/80 hover:text-primary-foreground flex justify-start items-center gap-1"
            aria-label="Upload an image of your space"
          >
            <FileImage className="h-5 w-5 flex-shrink-0" />
            <span className="truncate overflow-hidden whitespace-nowrap">
              {selectedFile ? `Selected: ${selectedFile.name}` : "Choose an image (PNG, JPG, WEBP, max 5MB)"}
            </span>
          </Button>
        </div>

        {previewUrl && (
          <div className="mt-4 p-2 border rounded-md bg-muted/30">
            <p className="text-sm font-medium text-center mb-2 text-muted-foreground">Image Preview:</p>
            <Image
              src={previewUrl}
              alt="Preview of uploaded space"
              width={600}
              height={400}
              className="rounded-md object-contain max-h-[300px] w-auto mx-auto shadow-md"
              data-ai-hint="user space"
            />
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col items-stretch">
        <Button disabled={true} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
            <>
              <Ban className="mr-2 h-4 w-4" />
              AI Advisor is Offline
            </>
        </Button>

        <Alert variant="destructive" className="mt-6 text-left">
            <Ban className="h-5 w-5" />
            <AlertTitle className="font-headline text-base md:text-lg">Feature Unavailable</AlertTitle>
            <AlertDescription className="mt-2 font-body text-sm">
            The AI Advisor backend has been removed and this feature is currently disabled.
            </AlertDescription>
        </Alert>

      </CardFooter>
    </Card>
  );
}
