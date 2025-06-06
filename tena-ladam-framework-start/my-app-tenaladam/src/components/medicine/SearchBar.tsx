
import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  initialValue?: string;
  className?: string;
}

const SearchBar = ({ 
  placeholder = "Search medicines...", 
  onSearch, 
  initialValue = "",
  className = ""
}: SearchBarProps) => {
  const [searchValue, setSearchValue] = useState(initialValue);
  
  useEffect(() => {
    setSearchValue(initialValue);
  }, [initialValue]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchValue);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  // Optional: Auto-search after a delay when typing
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchValue !== initialValue) {
        onSearch(searchValue);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [searchValue, initialValue, onSearch]);

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <div className="relative">
        <Input
          name="search"
          type="text"
          value={searchValue}
          onChange={handleChange}
          placeholder={placeholder}
          className="pl-10 pr-14 py-2 w-full"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Button 
          type="submit"
          size="sm"
          className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7"
        >
          Search
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;
