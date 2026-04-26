"use client";

import { Loader } from "@/components/custom/Loader";
import { Command, CommandItem, CommandList } from "@/components/ui/command";
import { useSWRInfinite } from "@/shared/hooks/use-swr-infinite";
import { Category } from "@/shared/models/category.model";
import { IconCheck, IconChevronDown } from "@tabler/icons-react";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CommandLoading } from "cmdk";

type CategorySelectorProps = {
  category?: Category;
  onCategorySelect: (category: Category) => void;
};

export default function CategorySelector({
  category,
  onCategorySelect,
}: CategorySelectorProps) {
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<
    Category | undefined
  >(category);
  const { data, meta, size, setSize, isLoading } = useSWRInfinite(
    "/categories",
    { status: "ACTIVE" },
  );

  const categories = data?.map((cat: any) => new Category(cat)) || [];

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
    onCategorySelect(category);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="border-input flex h-10 w-full items-center rounded-md border bg-transparent px-3 py-1 text-left text-base">
        <div className="flex-1">
          {selectedCategory?.getName() || <span> Select category </span>}
        </div>
        <IconChevronDown />
      </PopoverTrigger>

      <PopoverContent className="p-1">
        <Command>
          <CommandList>
            {isLoading && (
              <CommandLoading className="py-2.5 text-center text-sm text-gray-500">
                Loading...
              </CommandLoading>
            )}
            <InfiniteScroll
              dataLength={data.length}
              next={() => setSize(size + 1)}
              hasMore={meta.hasNextPage}
              loader={<Loader />}
            >
              {categories.map((category) => (
                <CommandItem
                  key={category.getId()}
                  onSelect={() => handleCategorySelect(category)}
                >
                  <div className="flex-1">{category.getName()}</div>
                  {category.getId() === selectedCategory?.getId() && (
                    <IconCheck />
                  )}
                </CommandItem>
              ))}
            </InfiniteScroll>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
