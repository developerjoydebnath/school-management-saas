"use client";

import { cn } from "@/shared/lib/utils";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import RCPagination, { type PaginationProps } from "rc-pagination";
import { Button } from "../ui/button";
import { DebouncedInput } from "../ui/debounced-input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

type TPaginationProps = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onLimitChange?: (limit: number) => void;
  className?: string;
};

const PAGE_SIZE_OPTIONS = [10, 20, 50, 100];

export function Pagination({
  total,
  page,
  limit,
  totalPages,
  onPageChange,
  onLimitChange,
  className,
}: TPaginationProps) {
  const currentPage = page ?? 1;
  const safeTotalPages = totalPages ?? Math.ceil(total / limit) ?? 1;

  const itemRender: PaginationProps["itemRender"] = (pageNum, type) => {
    if (type === "prev") {
      return (
        <Button
          disabled={currentPage <= 1}
          variant={"outline"}
          className="shadow-none"
        >
          <IconChevronLeft className="size-3.5" />
          <span>Prev</span>
        </Button>
      );
    }

    if (type === "next") {
      return (
        <Button
          disabled={currentPage >= safeTotalPages}
          variant={"outline"}
          className="shadow-none"
        >
          <span>Next</span>
          <IconChevronRight className="size-3.5" />
        </Button>
      );
    }

    if (type === "jump-prev" || type === "jump-next") {
      return (
        <span className="flex items-center justify-center h-7 w-7 text-sm text-gray-500 select-none">
          ...
        </span>
      );
    }

    // type === "page"
    const isActive = pageNum === currentPage;
    return (
      <Button
        variant={isActive ? "default" : "outline"}
        className={cn("shadow-none", pageNum < 100 ? "min-w-9" : "")}
      >
        {pageNum}
      </Button>
    );
  };

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {/* Top row */}
      <div className="flex items-center justify-between flex-wrap gap-3">

        {/* Left: Result per page + Go to page */}
        <div className="flex items-center gap-4 flex-wrap">
          {/* Result per page */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground whitespace-nowrap">
              Result per page
            </span>
            <Select value={limit.toString()} onValueChange={(v) => onLimitChange?.(Number(v))}>
              <SelectTrigger className="w-[70px]! h-9! shadow-none">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="p-1 min-w-0!" align="center">
                {PAGE_SIZE_OPTIONS.map((size) => (
                  <SelectItem key={size} value={size.toString()}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Go to page */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground whitespace-nowrap">
              Go to page
            </span>
            <DebouncedInput
              type="number"
              min={1}
              max={safeTotalPages}
              value={page}
              onChange={(value) => onPageChange(Number(value))}
              className="w-14 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>
        </div>

        {/* Right: rc-pagination for Prev / numbers / Next */}
        <RCPagination
          current={currentPage}
          total={total}
          pageSize={limit}
          onChange={onPageChange}
          showLessItems
          hideOnSinglePage
          itemRender={itemRender}
          className="flex items-center gap-1 list-none m-0 p-0 [&>li]:p-0 [&>li]:m-0 [&>li]:border-0 [&>li]:bg-transparent [&>li]:leading-none [&>li]:min-w-0"
        />
      </div>

      {/* Bottom row: Page info + Total */}
      <div className="flex items-center gap-6 text-sm text-muted-foreground">
        <span>
          Page{" "}
          <span className="font-medium text-muted-foreground">{currentPage}</span>{" "}
          of{" "}
          <span className="font-medium text-muted-foreground">{safeTotalPages}</span>
        </span>
        <span>
          Total data{" "}
          <span className="font-medium text-muted-foreground">{total}</span>
        </span>
      </div>
    </div>
  );
}
