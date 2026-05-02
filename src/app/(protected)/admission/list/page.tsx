"use client";

import React, { useEffect } from 'react';
import PageHeading from '@/shared/components/custom/PageHeading';
import ApplicationList from '@/modules/admission/components/ApplicationList';
import { useBreadcrumbStore } from '@/shared/stores/breadcrumb-store';
import { PATHS } from '@/shared/configs/paths.config';

export default function ApplicationListPage() {
  const { setBreadcrumbs } = useBreadcrumbStore();

  useEffect(() => {
    setBreadcrumbs([
      { label: "Home", href: "/" },
      { label: "Dashboard", href: PATHS.DASHBOARD },
      { label: "Admission Management", href: PATHS.ADMISSION.ROOT },
      { label: "Application List", href: PATHS.ADMISSION.LIST },
    ]);
  }, [setBreadcrumbs]);

  return (
    <div className="space-y-6">
      <PageHeading 
        heading="Application List" 
        subHeading="Manage incoming admission applications." 
      />
      
      <div className="grid grid-cols-1 gap-8 items-start">
        <ApplicationList />
      </div>
    </div>
  );
}
