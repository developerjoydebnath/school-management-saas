"use client";

import React, { useEffect } from 'react';
import PageHeading from '@/shared/components/custom/PageHeading';
import { useBreadcrumbStore } from '@/shared/stores/breadcrumb-store';
import { PATHS } from '@/shared/configs/paths.config';

export default function AdmissionSettingsPage() {
  const { setBreadcrumbs } = useBreadcrumbStore();

  useEffect(() => {
    setBreadcrumbs([
      { label: "Home", href: "/" },
      { label: "Dashboard", href: PATHS.DASHBOARD },
      { label: "Admission Management", href: PATHS.ADMISSION.ROOT },
      { label: "Admission Settings", href: PATHS.ADMISSION.SETTINGS },
    ]);
  }, [setBreadcrumbs]);

  return (
    <div className="space-y-6">
      <PageHeading 
        heading="Admission Settings" 
        subHeading="Configure admission sessions, seat capacity, checklists, and auto-approval rules." 
      />
      
      <div className="p-6 bg-card border rounded-md">
        <p className="text-muted-foreground text-center">Settings Panel Coming Soon...</p>
      </div>
    </div>
  );
}
