
'use client';

import { useState, type FormEvent, useEffect, useCallback, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
  fetchSuggestionsCallback: (query: string) => Promise<string[]>;
  placeholder?: string;
  initialValue?: string;
  className?: string;
}

export function SearchBar({
  onSearch,
  fetchSuggestionsCallback,
  placeholder = "Search products...",
  initialValue = '',
  className,
}: SearchBarProps) {
  const [inputValue, setInputValue] = useState(initialValue);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isSuggestionsVisible, setIsSuggestionsVisible] = useState(false);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1); 

  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInputValue(initialValue);
  }, [initialValue]);

  const handleFetchSuggestions = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSuggestions([]);
      setIsSuggestionsVisible(false);
      return;
    }
    setIsLoadingSuggestions(true);
    try {
      const fetchedSuggestions = await fetchSuggestionsCallback(query);
      setSuggestions(fetchedSuggestions);
      setIsSuggestionsVisible(fetchedSuggestions.length > 0);
      setActiveIndex(-1); 
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
      setIsSuggestionsVisible(false);
    } finally {
      setIsLoadingSuggestions(false);
    }
  }, [fetchSuggestionsCallback]);

  useEffect(() => {
    if (inputValue.trim() === '') {
      setSuggestions([]);
      setIsSuggestionsVisible(false);
      return;
    }

    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
      handleFetchSuggestions(inputValue);
    }, 300); 

    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [inputValue, handleFetchSuggestions]);

  const handleSubmit = (event?: FormEvent<HTMLFormElement>, term?: string) => {
    event?.preventDefault();
    const searchTermToSubmit = term || inputValue;
    // We only call onSearch if there's a term to submit.
    // If searchTermToSubmit is empty, onSearch won't be called from here.
    // The parent (e.g., homepage) handles what to do if onSearch receives an empty string from clear button.
    if (searchTermToSubmit.trim()) {
      onSearch(searchTermToSubmit.trim());
    }
    setIsSuggestionsVisible(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    setIsSuggestionsVisible(false);
    onSearch(suggestion); 
  };

  const handleClearSearch = () => {
    setInputValue('');
    setSuggestions([]);
    setIsSuggestionsVisible(false);
    onSearch(''); 
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isSuggestionsVisible || suggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prevIndex) => (prevIndex + 1) % suggestions.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prevIndex) => (prevIndex - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeIndex >= 0 && activeIndex < suggestions.length) {
        handleSuggestionClick(suggestions[activeIndex]);
      } else {
        handleSubmit(undefined, inputValue); 
      }
    } else if (e.key === 'Escape') {
      setIsSuggestionsVisible(false);
    }
  };
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSuggestionsVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  return (
    <div className={cn("relative w-full max-w-lg", className)} ref={searchContainerRef}>
      <form onSubmit={handleSubmit} className="flex items-center space-x-2">
        <div className="relative flex-grow">
          <Input
            type="search"
            placeholder={placeholder}
            value={inputValue}
            onChange={handleInputChange}
            onFocus={() => {
              if (inputValue.trim() && suggestions.length > 0) {
                 setIsSuggestionsVisible(true);
              } else if (inputValue.trim()) {
                handleFetchSuggestions(inputValue);
              }
            }}
            onKeyDown={handleKeyDown}
            className="pr-16" 
            aria-autocomplete="list"
            aria-expanded={isSuggestionsVisible}
            aria-controls="search-suggestions-list"
          />
          <div className="absolute right-8 top-1/2 -translate-y-1/2 h-7 w-7 flex items-center justify-center">
            {isLoadingSuggestions && (
              <Loader2 className="h-5 w-5 text-muted-foreground animate-spin" />
            )}
            {inputValue && !isLoadingSuggestions && (
              <Button
                type="button"
                variant="ghost"
                size="icon" // This prop might be redundant with explicit h/w
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

      {isSuggestionsVisible && suggestions.length > 0 && (
        <ul
          id="search-suggestions-list"
          className="absolute z-10 mt-1 w-full max-h-60 overflow-y-auto rounded-md border bg-background shadow-lg"
          role="listbox"
        >
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              onMouseEnter={() => setActiveIndex(index)}
              className={cn(
                "cursor-pointer px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground",
                index === activeIndex && "bg-accent text-accent-foreground"
              )}
              role="option"
              aria-selected={index === activeIndex}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
