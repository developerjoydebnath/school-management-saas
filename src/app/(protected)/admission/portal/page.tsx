"use client";

import React, { useEffect } from 'react';
import PageHeading from '@/shared/components/custom/PageHeading';
import { useBreadcrumbStore } from '@/shared/stores/breadcrumb-store';
import { PATHS } from '@/shared/configs/paths.config';

export default function OnlinePortalPage() {
  const { setBreadcrumbs } = useBreadcrumbStore();

  useEffect(() => {
    setBreadcrumbs([
      { label: "Home", href: "/" },
      { label: "Dashboard", href: PATHS.DASHBOARD },
      { label: "Admission Management", href: PATHS.ADMISSION.ROOT },
      { label: "Online Portal", href: PATHS.ADMISSION.PORTAL },
    ]);
  }, [setBreadcrumbs]);

  return (
    <div className="space-y-6">
      <PageHeading 
        heading="Online Application Portal" 
        subHeading="Configure and manage the public-facing admission portal." 
      />
      
      <div className="p-6 bg-card border rounded-md">
        <p className="text-muted-foreground text-center">Portal Configuration Coming Soon...</p>
      </div>
    </div>
  );
}
