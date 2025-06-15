'use client';

import { useState } from 'react';
import { generateStyleSuggestions, type GenerateStyleSuggestionsInput } from '@/ai/flows/generate-style-suggestions';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Wand2, Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

export function StyleSuggester() {
  const [productDetails, setProductDetails] = useState('');
  const [suggestions, setSuggestions] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!productDetails.trim()) {
      toast({
        title: "Input Required",
        description: "Please describe the products or your style preferences.",
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);
    setSuggestions('');
    try {
      const input: GenerateStyleSuggestionsInput = { productDetails };
      const result = await generateStyleSuggestions(input);
      setSuggestions(result.styleSuggestions);
    } catch (error) {
      console.error('Error generating style suggestions:', error);
      toast({
        title: "Error",
        description: "Failed to generate style suggestions. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl rounded-lg border-border/70">
      <CardHeader>
        <div className="flex items-center space-x-3">
          <Wand2 className="h-8 w-8 text-primary" />
          <CardTitle className="font-headline text-2xl">AI Style Advisor</CardTitle>
        </div>
        <CardDescription className="pt-2">
          Describe the Aarambh Decor products you're interested in, or your general decor preferences, and let our AI provide personalized style suggestions.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Textarea
          placeholder="e.g., 'I love the Intricate Mandala Wall Art and the Bohemian Tasseled Mirror. I'm looking for a warm, eclectic style for my living room.'"
          value={productDetails}
          onChange={(e) => setProductDetails(e.target.value)}
          rows={5}
          className="focus:ring-accent focus:border-accent"
          aria-label="Product details or style preferences for AI suggestions"
        />
      </CardContent>
      <CardFooter className="flex flex-col items-stretch">
        <Button onClick={handleSubmit} disabled={isLoading} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Wand2 className="mr-2 h-4 w-4" />
              Get Style Suggestions
            </>
          )}
        </Button>
        
        {suggestions && !isLoading && (
          <Alert className="mt-6 text-left bg-secondary/50 border-secondary">
            <Wand2 className="h-5 w-5 text-primary" />
            <AlertTitle className="font-headline text-lg text-primary">Your Style Suggestions</AlertTitle>
            <AlertDescription className="mt-2 whitespace-pre-wrap font-body text-foreground">
              {suggestions}
            </AlertDescription>
          </Alert>
        )}
      </CardFooter>
    </Card>
  );
}
