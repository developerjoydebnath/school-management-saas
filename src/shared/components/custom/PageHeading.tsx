"use client";

import { useBreadcrumbStore } from "@/shared/stores/breadcrumb-store";
import { useEffect } from "react";

type Props = {
  heading: string;
  subHeading: string;
}

export default function PageHeading({
  heading,
  subHeading,
}: Props) {
  const { setLayout } = useBreadcrumbStore();
  useEffect(() => {
    setLayout({
      heading,
      subHeading,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [heading, subHeading]);
  return null;
}
