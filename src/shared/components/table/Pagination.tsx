"use client";

import { cn } from "@/shared/lib/utils";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import RCPagination, { type PaginationProps } from "rc-pagination";
import { useState } from "react";

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
  const [goToValue, setGoToValue] = useState("");

  const currentPage = page ?? 1;
  const safeTotalPages = totalPages ?? Math.ceil(total / limit) ?? 1;

  const handleGoTo = () => {
    const num = parseInt(goToValue, 10);
    if (!isNaN(num) && num >= 1 && num <= safeTotalPages) {
      onPageChange(num);
    }
    setGoToValue("");
  };

  const itemRender: PaginationProps["itemRender"] = (pageNum, type) => {
    if (type === "prev") {
      return (
        <button
          disabled={currentPage <= 1}
          className="flex items-center gap-1 h-7 px-2.5 text-sm border border-gray-300 rounded text-gray-600 hover:bg-gray-50 transition-colors select-none disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <IconChevronLeft className="size-3.5" />
          <span>Prev</span>
        </button>
      );
    }

    if (type === "next") {
      return (
        <button
          disabled={currentPage >= safeTotalPages}
          className="flex items-center gap-1 h-7 px-2.5 text-sm border border-gray-300 rounded text-gray-600 hover:bg-gray-50 transition-colors select-none disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <span>Next</span>
          <IconChevronRight className="size-3.5" />
        </button>
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
      <button
        className={cn(
          "flex items-center justify-center h-7 w-7 text-sm rounded border transition-colors select-none",
          isActive
            ? "bg-primary border-primary text-white font-medium"
            : "border-gray-300 text-gray-600 hover:bg-gray-50",
        )}
      >
        {pageNum}
      </button>
    );
  };

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {/* Top row */}
      <div className="flex items-center justify-between flex-wrap gap-3">

        {/* Left: Result per page + Go to page */}
        <div className="flex items-center gap-4 flex-wrap">
          {/* Result per page */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 whitespace-nowrap">
              Result per page
            </span>
            <div className="relative">
              <select
                value={limit}
                onChange={(e) => onLimitChange?.(Number(e.target.value))}
                className={cn(
                  "appearance-none h-7 pl-2 pr-6 text-sm border border-gray-300 rounded",
                  "bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-primary",
                  onLimitChange ? "cursor-pointer" : "pointer-events-none opacity-60",
                )}
              >
                {PAGE_SIZE_OPTIONS.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
              <IconChevronRight className="absolute right-1.5 top-1/2 -translate-y-1/2 rotate-90 size-3 text-gray-500 pointer-events-none" />
            </div>
          </div>

          {/* Go to page */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 whitespace-nowrap">
              Go to page
            </span>
            <input
              type="number"
              min={1}
              max={safeTotalPages}
              value={goToValue}
              onChange={(e) => setGoToValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleGoTo()}
              onBlur={handleGoTo}
              className="h-7 w-14 px-2 text-sm border border-gray-300 rounded text-center bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-primary [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
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
      <div className="flex items-center gap-6 text-sm text-gray-600">
        <span>
          Page{" "}
          <span className="font-medium text-gray-800">{currentPage}</span>{" "}
          of{" "}
          <span className="font-medium text-gray-800">{safeTotalPages}</span>
        </span>
        <span>
          Total data{" "}
          <span className="font-medium text-gray-800">{total}</span>
        </span>
      </div>
    </div>
  );
}
