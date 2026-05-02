"use client";

import React, { useEffect } from 'react';
import PageHeading from '@/shared/components/custom/PageHeading';
import { useBreadcrumbStore } from '@/shared/stores/breadcrumb-store';
import { PATHS } from '@/shared/configs/paths.config';

export default function TransferStudentsPage() {
  const { setBreadcrumbs } = useBreadcrumbStore();

  useEffect(() => {
    setBreadcrumbs([
      { label: "Home", href: "/" },
      { label: "Dashboard", href: PATHS.DASHBOARD },
      { label: "Admission Management", href: PATHS.ADMISSION.ROOT },
      { label: "Transfer Students", href: PATHS.ADMISSION.TRANSFER },
    ]);
  }, [setBreadcrumbs]);

  return (
    <div className="space-y-6">
      <PageHeading 
        heading="Transfer Students" 
        subHeading="Handle inter-school transfers, TC verification, and previous results." 
      />
      
      <div className="p-6 bg-card border rounded-md">
        <p className="text-muted-foreground text-center">Transfer Student Flow Coming Soon...</p>
      </div>
    </div>
  );
}
