"use client";

import React, { useEffect } from 'react';
import PageHeading from '@/shared/components/custom/PageHeading';
import ApplicationList from '@/modules/admission/application-list/components/ApplicationList';
import { useBreadcrumbStore } from '@/shared/stores/breadcrumb-store';
import { PATHS } from '@/shared/configs/paths.config';
import { useTranslations } from "next-intl";

export default function ApplicationListPage() {
  const { setBreadcrumbs } = useBreadcrumbStore();
  const tNav = useTranslations("Navigation");

  useEffect(() => {
    setBreadcrumbs([
      { label: tNav("dashboard"), href: PATHS.DASHBOARD },
      { label: tNav("admission"), href: PATHS.ADMISSION.ROOT },
      { label: tNav("admission_list"), href: PATHS.ADMISSION.LIST.ROOT },
    ]);
  }, [setBreadcrumbs, tNav]);

  return (
    <div className="space-y-6">
      <PageHeading routeName="Applications" />
      
      <div className="grid grid-cols-1 gap-8 items-start">
        <ApplicationList />
      </div>
    </div>
  );
}
