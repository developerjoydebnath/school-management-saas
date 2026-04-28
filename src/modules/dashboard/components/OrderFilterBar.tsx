"use client";

import { OrderFilter } from "@/app/(protected)/dashboard/page";
import {
  FilterContainer,
  FilterContent,
  FilterTriggerButton,
} from "@/shared/components/custom/Filter";
import DateRangePicker from "@/shared/components/form/DateRangePicker";
import FilterButton from "@/shared/components/form/FilterButton";
import SearchInput from "@/shared/components/form/SearchInput";
import { IconFilter } from "@tabler/icons-react";

type Props = {
  filter: OrderFilter;
  setFilter: (filter: OrderFilter) => void;
  type?: "ACTIVE" | "HISTORY";
};

export default function OrderFilterBar({
  filter,
  setFilter,
  type = "ACTIVE",
}: Props) {
  return (
    <div className="@container/filter flex flex-wrap items-center gap-2 sm:gap-4">
      <FilterButton
        title="Status"
        selected={filter.status}
        onSelect={(opt) => setFilter({ ...filter, status: opt })}
        clearFilter={() => setFilter({ ...filter, status: [] })}
        options={
          type === "HISTORY"
            ? [
              { label: "Completed", value: 'completed' },
              { label: "Refunded", value: 'refunded' },
              { label: "Cancelled", value: 'cancelled' },
            ]
            : [
              { label: "Pending", value: 'pending' },
              { label: "Confirmed", value: 'confirmed' },
              { label: "Preparing", value: 'preparing' },
              { label: "Ready", value: 'ready' },
              { label: "Served", value: 'served' },
              {
                label: "Out For Delivered",
                value: 'out_for_delivery',
              },
              { label: "Delivered", value: 'delivered' },
              { label: "Completed", value: 'completed' },
              { label: "Refunded", value: 'refunded' },
              { label: "Cancelled", value: 'cancelled' },
            ]
        }
      />

      <FilterContainer>
        <FilterTriggerButton className="w-auto flex-1 @md/filter:max-w-fit @md/filter:shrink">
          <span className="flex items-center gap-2">
            <IconFilter strokeWidth={1.5} className="size-4" />
            <span>Filter</span>
          </span>
        </FilterTriggerButton>

        <FilterContent>
          <FilterButton
            title="Status"
            selected={filter.status}
            onSelect={(opt) => setFilter({ ...filter, status: opt })}
            clearFilter={() => setFilter({ ...filter, status: [] })}
            options={
              type === "HISTORY"
                ? [
                  { label: "Completed", value: 'completed' },
                  { label: "Refunded", value: 'refunded' },
                  { label: "Cancelled", value: 'cancelled' },
                ]
                : [
                  { label: "Pending", value: 'pending' },
                  { label: "Confirmed", value: 'confirmed' },
                  { label: "Preparing", value: 'preparing' },
                  { label: "Ready", value: 'ready' },
                  { label: "Served", value: 'served' },
                  {
                    label: "Out For Delivered",
                    value: 'out_for_delivery',
                  },
                  { label: "Delivered", value: 'delivered' },
                  { label: "Completed", value: 'completed' },
                  { label: "Refunded", value: 'refunded' },
                  { label: "Cancelled", value: 'cancelled' },
                ]
            }
          />

          <FilterButton
            title="Order Type"
            selected={filter.orderType}
            onSelect={(opt) => setFilter({ ...filter, orderType: opt })}
            clearFilter={() => setFilter({ ...filter, orderType: [] })}
            options={[
              { label: "Dine-in", value: 'dine_in' },
              { label: "Takeaway", value: 'takeaway' },
              { label: "Delivery", value: 'delivery' },
            ]}
          />

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-600">
              Date Range
            </label>

            <DateRangePicker
              className="w-full"
              align="end"
              value={{
                from: filter.startDate,
                to: filter.endDate,
              }}
              onValueChange={(date) =>
                setFilter({
                  ...filter,
                  startDate: date?.from,
                  endDate: date?.to,
                })
              }
            />
          </div>
        </FilterContent>
      </FilterContainer>

      <SearchInput
        value={filter.search}
        onValueChange={(search) => setFilter({ ...filter, search })}
        className="h-9 w-full @sm/filter:w-[clamp(200px,20vw,300px)]"
      />
    </div>
  );
}
