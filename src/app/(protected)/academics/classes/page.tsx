"use client";

import ClassForm from '@/modules/academics/components/ClassForm';
import ClassList from '@/modules/academics/components/ClassList';
import PageHeading from '@/shared/components/custom/PageHeading';
import { Button } from '@/shared/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/shared/components/ui/dialog';
import { PATHS } from '@/shared/configs/paths.config';
import { useBreadcrumbStore } from '@/shared/stores/breadcrumb-store';
import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ClassesPage() {
  const { setBreadcrumbs } = useBreadcrumbStore();
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  useEffect(() => {
    setBreadcrumbs([
      { label: "Dashboard", href: PATHS.DASHBOARD },
      { label: "Academics", href: PATHS.ACADEMICS.ROOT },
      { label: "Classes", href: PATHS.ACADEMICS.CLASSES },
    ]);
  }, [setBreadcrumbs]);

  return (
    <div className="space-y-6">
      <PageHeading
        heading="Classes"
        subHeading="Manage academic classes, sections, and room allocations."
      >
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger render={
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Class
            </Button>
          }>

          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Class</DialogTitle>
            </DialogHeader>
            <ClassForm onSuccess={() => setIsCreateOpen(false)} />
          </DialogContent>
        </Dialog>
      </PageHeading>

      <div className="w-full">
        <ClassList />
      </div>
    </div>
  );
}
