"use client";

import React, { useEffect } from 'react';
import PageHeading from '@/shared/components/custom/PageHeading';
import NewAdmissionForm from '@/modules/admission/new-admission/components/NewAdmissionForm';
import { useBreadcrumbStore } from '@/shared/stores/breadcrumb-store';
import { PATHS } from '@/shared/configs/paths.config';
import { useRouter } from 'next/navigation';

export default function NewAdmissionPage() {
  const { setBreadcrumbs } = useBreadcrumbStore();
  const router = useRouter();

  useEffect(() => {
    setBreadcrumbs([
      { label: "Home", href: "/" },
      { label: "Dashboard", href: PATHS.DASHBOARD },
      { label: "Admission Management", href: PATHS.ADMISSION.ROOT },
      { label: "New Admission", href: PATHS.ADMISSION.NEW.ROOT },
    ]);
  }, [setBreadcrumbs]);

  const handleSuccess = () => {
    // Optionally redirect to application list on success
    router.push(PATHS.ADMISSION.LIST.ROOT);
  };

  return (
    <div className="space-y-6">
      <PageHeading 
        routeName="AdmissionNew" 
      />
      
      <div className="max-w-4xl mx-auto">
        <NewAdmissionForm onSuccess={handleSuccess} />
      </div>
    </div>
  );
}
