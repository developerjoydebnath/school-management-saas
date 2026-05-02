"use client";

import React, { useEffect } from 'react';
import PageHeading from '@/shared/components/custom/PageHeading';
import NewAdmissionForm from '@/modules/admission/components/NewAdmissionForm';
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
      { label: "New Admission", href: PATHS.ADMISSION.NEW },
    ]);
  }, [setBreadcrumbs]);

  const handleSuccess = () => {
    // Optionally redirect to application list on success
    router.push(PATHS.ADMISSION.LIST);
  };

  return (
    <div className="space-y-6">
      <PageHeading 
        heading="New Admission" 
        subHeading="Create a new student admission application." 
      />
      
      <div className="grid lg:grid-cols-2 gap-8 items-start">
        <NewAdmissionForm onSuccess={handleSuccess} />
      </div>
    </div>
  );
}
