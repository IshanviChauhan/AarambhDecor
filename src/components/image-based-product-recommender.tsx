
'use client';

import { useState, useRef, type ChangeEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { recommendProductsFromImage, type RecommendProductsFromImageInput, type RecommendedProduct } from '@/ai/flows/recommend-products-from-image-flow';
import { MOCK_PRODUCTS, type Product } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { Wand2, Loader2, FileImage, ImageUp, CheckCircle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SimplifiedProductInfo {
  id: string;
  name: string;
  description: string;
  category?: string;
}

export function ImageBasedProductRecommender() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<RecommendedProduct[]>([]);
  const [overallFeedback, setOverallFeedback] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
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
      setRecommendations([]); // Clear previous recommendations
      setOverallFeedback(null);
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile || !previewUrl) {
      toast({
        title: "No Image Selected",
        description: "Please upload an image of your space first.",
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);
    setRecommendations([]);
    setOverallFeedback(null);

    try {
      const simplifiedProducts: SimplifiedProductInfo[] = MOCK_PRODUCTS.map(p => ({
        id: p.id,
        name: p.name,
        description: p.description.substring(0, 200) + (p.description.length > 200 ? '...' : ''), // Keep it concise
        category: p.category,
      }));

      const input: RecommendProductsFromImageInput = {
        imageDataUri: previewUrl,
        availableProductsJson: JSON.stringify(simplifiedProducts),
      };
      const result = await recommendProductsFromImage(input);
      setRecommendations(result.recommendations || []);
      setOverallFeedback(result.overallFeedback || null);

      if (!result.recommendations || result.recommendations.length === 0) {
        toast({
          title: "No Specific Recommendations",
          description: result.overallFeedback || "The AI couldn't find specific product matches for this image, but check out the general feedback!",
          variant: "default"
        });
      }

    } catch (error) {
      console.error('Error getting recommendations:', error);
      let errorMessage = "Failed to get recommendations. Please try again.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const getFullProductDetails = (productId: string): Product | undefined => {
    return MOCK_PRODUCTS.find(p => p.id === productId);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-xl rounded-lg border-border/70">
      <CardHeader>
        <div className="flex items-center space-x-3">
          <ImageUp className="h-8 w-8 text-primary" />
          <CardTitle className="font-headline text-2xl">AI Decor Advisor</CardTitle>
        </div>
        <CardDescription className="pt-2">
          Upload an image of your space, and our AI will recommend Aarambh Decor products that complement your style!
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
            className="w-full border-dashed border-primary/50 hover:border-primary text-primary/80 hover:text-primary-foreground"
            aria-label="Upload an image of your space"
          >
            <FileImage className="mr-2 h-5 w-5" />
            {selectedFile ? `Selected: ${selectedFile.name}` : "Choose an image (PNG, JPG, WEBP, max 5MB)"}
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
        <Button onClick={handleSubmit} disabled={isLoading || !selectedFile} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing Your Space...
            </>
          ) : (
            <>
              <Wand2 className="mr-2 h-4 w-4" />
              Get Product Recommendations
            </>
          )}
        </Button>

        {overallFeedback && !isLoading && (
            <Alert className="mt-6 text-left bg-secondary/30 border-secondary/50">
                <Info className="h-5 w-5 text-primary" />
                <AlertTitle className="font-headline text-lg text-primary">AI Observations</AlertTitle>
                <AlertDescription className="mt-2 whitespace-pre-wrap font-body text-foreground">
                {overallFeedback}
                </AlertDescription>
            </Alert>
        )}
        
        {recommendations.length > 0 && !isLoading && (
          <div className="mt-8 space-y-6">
            <div className="flex items-center space-x-2">
                <CheckCircle className="h-6 w-6 text-green-600" />
                <h3 className="text-xl font-headline text-foreground">Our AI Recommends:</h3>
            </div>
            {recommendations.map((rec, index) => {
              const product = getFullProductDetails(rec.productId);
              if (!product) return null;
              const displayImage = product.imageUrls && product.imageUrls.length > 0 ? product.imageUrls[0] : { url: 'https://placehold.co/300x300.png', dataAiHint: 'placeholder decor' };

              return (
                <Card key={index} className="overflow-hidden shadow-md border-border/70 animate-pop-in">
                  <div className="md:flex">
                    <div className="md:w-1/3 relative aspect-square md:aspect-auto">
                       <Image
                        src={displayImage.url}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover"
                        data-ai-hint={displayImage.dataAiHint}
                      />
                    </div>
                    <div className="md:w-2/3 p-4 flex flex-col">
                      <CardTitle className="font-headline text-lg text-primary mb-1">{rec.productName}</CardTitle>
                      <p className="text-sm text-muted-foreground mb-2 font-semibold">AI's Reason:</p>
                      <CardDescription className="text-sm text-foreground mb-3 flex-grow">{rec.reason}</CardDescription>
                      <Button asChild variant="outline" size="sm" className="mt-auto self-start">
                        <Link href={`/product/${rec.productId}`}>View Product</Link>
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}

      </CardFooter>
    </Card>
  );
}
