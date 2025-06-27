
'use client';

import { useState, type FormEvent, useEffect, useCallback, useRef } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Search, X } from 'lucide-react';
import { cn } from '../lib/utils';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
  placeholder?: string;
  initialValue?: string;
  className?: string;
  debounceDelay?: number;
}

export function SearchBar({
  onSearch,
  placeholder = "Search products...",
  initialValue = '',
  className,
  debounceDelay = 300,
}: SearchBarProps) {
  const [inputValue, setInputValue] = useState(initialValue);

  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInputValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    // If input is cleared immediately by user, reflect that quickly
    if (inputValue.trim() === '' && initialValue !== '') {
        onSearch('');
        return;
    }
    
    debounceTimeoutRef.current = setTimeout(() => {
      // Trigger search if value changed or if it was initially empty and now has content
      if (inputValue !== initialValue || (initialValue === '' && inputValue !== '')) { 
        onSearch(inputValue);
      }
    }, debounceDelay);

    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [inputValue, onSearch, debounceDelay, initialValue]);

  const handleSubmit = (event?: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    if (debounceTimeoutRef.current) { // Clear any pending debounce
      clearTimeout(debounceTimeoutRef.current);
    }
    onSearch(inputValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleClearSearch = () => {
    setInputValue('');
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    onSearch(''); 
  };

  return (
    <div className={cn("relative w-full max-w-lg", className)} ref={searchContainerRef}>
      <form onSubmit={handleSubmit} className="flex items-center space-x-2">
        <div className="relative flex-grow">
          <Input
            type="search" 
            placeholder={placeholder}
            value={inputValue}
            onChange={handleInputChange}
            className="pr-16" 
            aria-label={placeholder}
          />
          <div className="absolute right-8 top-1/2 -translate-y-1/2 h-7 w-7 flex items-center justify-center">
            {inputValue && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-full w-full p-0 text-muted-foreground hover:text-foreground flex items-center justify-center"
                onClick={handleClearSearch}
                aria-label="Clear search"
                tabIndex={-1} 
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
        <Button type="submit" aria-label="Search" variant="default">
          <Search className="h-5 w-5" />
        </Button>
      </form>
    </div>
  );
}
