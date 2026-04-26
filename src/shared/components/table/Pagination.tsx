import { cn } from "@/shared/lib/utils";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import RCPagination from "rc-pagination";

type TPaginationProps = {
  total: number;
  page: number;
  limit: number;
  onPageChange: (page: number) => void;
  className?: string;
};

export function Pagination({
  total,
  page,
  limit = 10,
  onPageChange,
  className,
}: TPaginationProps) {
  return (
    <RCPagination
      showTotal={(total, range) =>
        `Showing ${range[0]}-${range[1]} of ${total}`
      }
      align="start"
      current={page ?? 1}
      total={total ?? 1}
      pageSize={limit ?? 10}
      hideOnSinglePage
      showLessItems
      onChange={onPageChange}
      className={cn(
        "flex flex-row items-center justify-between gap-2",
        className,
      )}
      prevIcon={() => (
        <a href="#">
          <IconChevronLeft className="size-4" />
        </a>
      )}
      nextIcon={() => (
        <a href="#">
          <IconChevronRight className="size-4" />
        </a>
      )}
    />
  );
}
