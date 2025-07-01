"use client"

import { useState } from "react"
import { Check, ChevronDown, X } from "lucide-react"
import { cn } from "../../lib/utils"
import { Button } from "./button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from './popover'
import { Badge } from './badge'

export type MultiSelectOption = { value: string; label: string };

interface MultiSelectProps {
  options: MultiSelectOption[];
  header?: string;
  placeholder?: string;
  onChange?: (selected: string[]) => void;
  value?: string[];
}

const MultiSelect = ({ options, header = '', placeholder = '', onChange, value }: MultiSelectProps) => {
  const [open, setOpen] = useState(false);
  const [internalSelectedValues, setInternalSelectedValues] = useState<string[]>([]);
  const selectedValues = value !== undefined ? value : internalSelectedValues;

  const handleSelect = (val: string) => {
    const newValues = selectedValues.includes(val)
      ? selectedValues.filter((item) => item !== val)
      : [...selectedValues, val];
    if (value === undefined) setInternalSelectedValues(newValues);
    onChange?.(newValues);
  };

  const handleRemove = (val: string) => {
    const newValues = selectedValues.filter((item) => item !== val);
    if (value === undefined) setInternalSelectedValues(newValues);
    onChange?.(newValues);
  };

  const handleClearAll = () => {
    if (value === undefined) setInternalSelectedValues([]);
    onChange?.([]);
  };

  const selectedLabels = selectedValues
    .map((value) => options.find((option) => option.value === value)?.label)
    .filter(Boolean);

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      <div className="space-y-2">
        {header && <label className="text-sm font-medium">{header}</label>}
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between h-auto min-h-10 px-3 py-2 bg-transparent"
            >
              <div className="flex flex-wrap gap-1 flex-1">
                {selectedValues.length === 0 ? (
                  <span className="text-muted-foreground">{placeholder}</span>
                ) : (
                  <span className="text-foreground">{selectedValues.length} selected</span>
                )}
              </div>
              <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0" align="start">
            <Command>
              <CommandInput placeholder={placeholder} />
              <CommandList>
                <CommandEmpty>No option found.</CommandEmpty>
                <CommandGroup>
                  {options.map((option) => (
                    <CommandItem key={option.value} value={option.value} onSelect={() => handleSelect(option.value)}>
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedValues.includes(option.value) ? "opacity-100" : "opacity-0",
                        )}
                      />
                      {option.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      {selectedValues.length > 0 && (
        <div className="space-y-2">
          <label className="text-sm font-medium">Selected ({selectedValues.length})</label>
          <div className="flex flex-wrap gap-2">
            {selectedLabels.map((label) => (
              <Badge key={label} variant="default" className="text-xs">
                {label}
                <X
                  className="ml-1 h-3 w-3 hover:bg-primary/20 rounded-sm cursor-pointer"
                  onClick={() => {
                    const value = options.find((opt) => opt.label === label)?.value;
                    if (value) handleRemove(value);
                  }}
                />
              </Badge>
            ))}
          </div>
          <Button variant="outline" size="sm" onClick={handleClearAll} className="w-fit">
            Clear All
          </Button>
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
