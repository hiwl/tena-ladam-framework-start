
import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface FilterOption {
  id: string;
  label: string;
}

interface FilterSectionProps {
  title: string;
  options: FilterOption[];
  selectedOptions: string[];
  onChange: (selectedIds: string[]) => void;
}

const FilterSection = ({ title, options, selectedOptions, onChange }: FilterSectionProps) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (id: string) => {
    if (selectedOptions.includes(id)) {
      onChange(selectedOptions.filter(optionId => optionId !== id));
    } else {
      onChange([...selectedOptions, id]);
    }
  };

  return (
    <div className="mb-4">
      <h3 className="text-sm font-medium mb-2">{title}</h3>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-full justify-between">
            {selectedOptions.length > 0 
              ? `${selectedOptions.length} selected` 
              : `Select ${title.toLowerCase()}`}
            <ChevronDown className="h-4 w-4 ml-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          {options.map((option) => (
            <DropdownMenuCheckboxItem
              key={option.id}
              checked={selectedOptions.includes(option.id)}
              onSelect={() => handleSelect(option.id)}
            >
              {option.label}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default FilterSection;
