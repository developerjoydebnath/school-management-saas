"use client";

import TimetableView from '@/modules/academics/timetable/components/TimetableView';
import PageHeading from '@/shared/components/custom/PageHeading';
import { PATHS } from '@/shared/configs/paths.config';
import { useBreadcrumbStore } from '@/shared/stores/breadcrumb-store';
import { useEffect } from 'react';

export default function TimetablePage() {
  const { setBreadcrumbs } = useBreadcrumbStore();

  useEffect(() => {
    setBreadcrumbs([
      { label: "Dashboard", href: PATHS.DASHBOARD },
      { label: "Academics", href: PATHS.ACADEMICS.ROOT },
      { label: "Timetable", href: PATHS.ACADEMICS.TIMETABLE.ROOT },
    ]);
  }, [setBreadcrumbs]);

  return (
    <div className="space-y-6">
      <PageHeading
        heading="Class Timetable"
        subHeading="Manage and view weekly schedules for classes."
      />
      <div className="w-full">
        <TimetableView />
      </div>
    </div>
  );
}
