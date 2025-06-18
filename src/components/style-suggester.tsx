// This component is deprecated and has been replaced by ImageBasedProductRecommender.tsx
// This file can be safely deleted: src/components/style-suggester.tsx

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Wand2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

export function StyleSuggester() {
  const [productDetails, setProductDetails] = useState('');
  // const [suggestions, setSuggestions] = useState('');
  // const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    toast({
      title: "Feature Updated",
      description: "This AI Style Advisor has been upgraded! Please use the new Image-Based Recommender found on the homepage.",
      variant: "default",
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl rounded-lg border-border/70">
      <CardHeader>
        <div className="flex items-center space-x-3">
          <Wand2 className="h-8 w-8 text-primary" />
          <CardTitle className="font-headline text-2xl">AI Style Advisor (Updated)</CardTitle>
        </div>
        <CardDescription className="pt-2">
          This feature has been updated. Try our new <a href="/#ai-decor-advisor" className="underline hover:text-accent">Image-Based Product Recommender</a> on the homepage to get suggestions by uploading a photo of your space!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Textarea
          placeholder="e.g., 'I love the Intricate Mandala Wall Art and the Bohemian Tasseled Mirror...'"
          value={productDetails}
          onChange={(e) => setProductDetails(e.target.value)}
          rows={3}
          className="focus:ring-accent focus:border-accent"
          aria-label="Product details or style preferences for AI suggestions (Feature Updated)"
          readOnly
        />
      </CardContent>
      <CardFooter className="flex flex-col items-stretch">
        <Button onClick={handleSubmit} disabled={true} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
          <Wand2 className="mr-2 h-4 w-4" />
          Get Style Suggestions (Feature Updated)
        </Button>
      </CardFooter>
    </Card>
  );
}
