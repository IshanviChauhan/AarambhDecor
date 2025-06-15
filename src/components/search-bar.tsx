
'use client';

import { useState, type FormEvent, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react'; // Added X for clear button
import { cn } from '@/lib/utils';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
  placeholder?: string;
  initialValue?: string;
  className?: string;
}

export function SearchBar({ 
  onSearch, 
  placeholder = "Search products...", 
  initialValue = '', 
  className 
}: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState(initialValue);

  useEffect(() => {
    setSearchTerm(initialValue);
  }, [initialValue]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(searchTerm.trim());
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    onSearch(''); 
  };

  return (
    <form onSubmit={handleSubmit} className={cn("flex w-full max-w-lg items-center space-x-2", className)}>
      <div className="relative flex-grow">
        <Input
          type="search"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pr-10" // Add padding for the clear button
        />
        {searchTerm && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            onClick={handleClearSearch}
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Button type="submit" aria-label="Search" variant="default">
        <Search className="h-5 w-5" />
      </Button>
    </form>
  );
}
