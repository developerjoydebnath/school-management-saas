"use client";

import OrderFilterbar from "@/modules/dashboard/components/OrderFilterBar";
import OrderTable from "@/modules/dashboard/components/OrderTable";
import PageHeading from "@/shared/components/custom/PageHeading";
import TextEditor from "@/shared/components/form/editor/TextEditor";
import { SimpleEditor } from "@/shared/components/form/rich-editor/simple-editor";
import { Card, CardContent, CardHeader } from "@/shared/components/ui/card";
import { useState } from "react";

export type FilterOption = {
  label: string;
  value: string;
};

export type OrderFilter = {
  status: FilterOption[];
  orderType: FilterOption[];
  search: string;
  startDate?: Date;
  endDate?: Date;
};

export default function Orders() {
  const [filter, setFilter] = useState<OrderFilter>({
    status: [],
    orderType: [],
    search: "",
    startDate: undefined,
    endDate: undefined,
  });

  return (
    <div className="p-4 md:p-8">
      <PageHeading
        heading="Orders"
        subHeading="Manage your orders here. You can filter, search, and view details of each order."
      />

      <SimpleEditor value="" onValueChange={() => { }} className="mb-5" />

      <TextEditor value="" onValueChange={() => { }} className="mb-5" />

      <Card className="p-4">
        <CardHeader className="p-0">
          <OrderFilterbar filter={filter} setFilter={setFilter} />
        </CardHeader>

        <CardContent className="p-0">
          <OrderTable queryType="ACTIVE" filter={filter} />
        </CardContent>
      </Card>
    </div>
  );
}
