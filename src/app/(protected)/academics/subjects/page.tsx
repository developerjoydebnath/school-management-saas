"use client";

import SubjectForm from '@/modules/academics/components/SubjectForm';
import SubjectList from '@/modules/academics/components/SubjectList';
import PageHeading from '@/shared/components/custom/PageHeading';
import { Button } from '@/shared/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/shared/components/ui/dialog';
import { PATHS } from '@/shared/configs/paths.config';
import { useBreadcrumbStore } from '@/shared/stores/breadcrumb-store';
import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function SubjectsPage() {
  const { setBreadcrumbs } = useBreadcrumbStore();
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  useEffect(() => {
    setBreadcrumbs([
      { label: "Dashboard", href: PATHS.DASHBOARD },
      { label: "Academics", href: PATHS.ACADEMICS.ROOT },
      { label: "Subjects", href: PATHS.ACADEMICS.SUBJECTS },
    ]);
  }, [setBreadcrumbs]);

  return (
    <div className="space-y-6">
      <PageHeading
        heading="Subjects"
        subHeading="Manage subjects according to the curriculum."
      >
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger render={
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Subject
            </Button>
          }>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Subject</DialogTitle>
            </DialogHeader>
            <SubjectForm onSuccess={() => setIsCreateOpen(false)} />
          </DialogContent>
        </Dialog>
      </PageHeading>

      <div className="w-full">
        <SubjectList />
      </div>
    </div>
  );
}
