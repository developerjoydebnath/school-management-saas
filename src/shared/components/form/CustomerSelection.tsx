import { Loader } from "@/shared/components/custom/Loader";
import {
  Command,
  CommandEmpty,
  CommandItem,
  CommandList,
} from "@/shared/components/ui/command";
import { Input } from "@/shared/components/ui/input";
import { Popover, PopoverAnchor, PopoverContent } from "@/shared/components/ui/popover";
import { useSWR } from "@/shared/hooks/use-swr";
import { cn } from "@/shared/lib/utils";
import { Customer } from "@/shared/models/customer.model";
import { CommandLoading } from "cmdk";
import debounce from "lodash/debounce";
import { useCallback, useEffect, useMemo, useState } from "react";

interface CustomerSelectionProps {
  value: string;
  onChange: (e: any) => void;
  onValueChange?: (customer: Customer) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

const CustomerSelection = ({
  value,
  onChange,
  onValueChange,
  placeholder,
  className,
  disabled = false,
}: CustomerSelectionProps) => {
  const [phone, setPhone] = useState(value);
  const [isOpen, setIsOpen] = useState(false);

  const memoValue = useMemo(() => value, [value]);

  useEffect(() => {
    setPhone(memoValue);
  }, [memoValue]);

  // Create debounced version of the API call
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedPhoneChange = useCallback(
    debounce((phone: string) => {
      onChange({ target: { value: phone } });
    }, 500),
    [],
  );

  // Handler for input changes
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPhone = e.target.value;
    setPhone(newPhone);
    debouncedPhoneChange(newPhone);
  };

  // Fetch customer data when phone value changes or debounced phone value is set
  const { data, isLoading, isError } = useSWR("/customers", {
    search: value,
  });

  const customers =
    data?.data?.items?.map(
      (customer: Record<string, any>) => new Customer(customer),
    ) || [];

  // Updates form state with selected customer's details and phone input.
  const onSelectChange = (customer: Customer) => {
    onValueChange?.(customer);
    setPhone(customer.getPhone());
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverAnchor>
        <Input
          value={phone}
          onChange={handlePhoneChange}
          className={cn("", className)}
          placeholder={placeholder || "Enter customer phone"}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setIsOpen(false)}
          disabled={disabled}
        />
      </PopoverAnchor>

      <PopoverContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
        className="p-1"
      >
        <Command>
          <CommandList>
            {isLoading && (
              <CommandLoading className="px-2 py-1.5 text-sm">
                <Loader className="relative top-auto text-sm font-normal text-gray-500" />
              </CommandLoading>
            )}
            {isError && <CommandItem>Error loading customers</CommandItem>}
            {/* Render customer data if available */}

            {!!customers.length &&
              customers.map((customer: Customer) => (
                <CommandItem
                  key={customer.getId()}
                  onSelect={() => onSelectChange(customer)}
                >
                  {customer.getName()} - {customer.getPhone()}
                </CommandItem>
              ))}
            <CommandEmpty className="py-2 text-center text-sm text-gray-500">
              Customer not found
            </CommandEmpty>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default CustomerSelection;
