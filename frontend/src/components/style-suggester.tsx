
// This component (src/components/style-suggester.tsx) is deprecated.
// It has been replaced by ImageBasedProductRecommender.tsx.
// This file can be safely deleted.

'use client';

import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Wand2 } from 'lucide-react';
import { useToast } from "../hooks/use-toast";
import Link from 'next/link';

export function StyleSuggester() {
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
          <CardTitle className="font-headline text-2xl">AI Style Advisor (Deprecated)</CardTitle>
        </div>
        <CardDescription className="pt-2">
          This feature has been updated. Try our new{' '}
          <Link href="/#ai-decor-advisor" className="underline hover:text-accent">
            Image-Based Product Recommender
          </Link>
          {' '}on the homepage to get suggestions by uploading a photo of your space!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          The previous text-based style suggester is no longer active.
        </p>
      </CardContent>
      <CardFooter className="flex flex-col items-stretch">
        <Button onClick={handleSubmit} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
          <Wand2 className="mr-2 h-4 w-4" />
          Go to New AI Advisor
        </Button>
      </CardFooter>
    </Card>
  );
}
