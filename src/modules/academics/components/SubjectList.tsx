"use client";

import { SubjectFormValues } from "@/modules/academics/dto/subject.dto";
import ConfirmationModal from "@/shared/components/custom/ConfirmationModal";
import { TOption } from "@/shared/components/form/FilterButton";
import DataTable from "@/shared/components/table/DataTable";
import TableFilter from "@/shared/components/table/TableFilter";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardHeader } from "@/shared/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { Switch } from "@/shared/components/ui/switch";
import { useTableData } from "@/shared/hooks/use-table-data";
import axios from "@/shared/lib/axios";
import { Subject } from "@/shared/models/subject.model";
import { StatusEnum } from "@/shared/types/enums";
import { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import SubjectFilterBar from "./SubjectFilterBar";
import SubjectForm from "./SubjectForm";

interface SubjectType extends SubjectFormValues {
  id: string;
}

export type SubjectFilter = {
  search: string;
  subjectType: TOption[];
  status: TOption[];
};

const initialFilters: SubjectFilter = { search: "", subjectType: [], status: [] };

export default function SubjectList() {
  const [filter, setFilter] = useState<SubjectFilter>(initialFilters);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);
  const [subjectToDelete, setSubjectToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [subjectToChangeStatus, setSubjectToChangeStatus] = useState<{ subject: Subject, newStatus: boolean } | null>(null);
  const [isChangingStatus, setIsChangingStatus] = useState(false);

  const { data: subjects, meta, isLoading, mutate } = useTableData("/subjects", {
    // page,
    // limit,
    // ...filter
  });

  // serialize the data 
  const serializedSubjects = subjects?.map((subject: any) => new Subject(subject));

  const confirmDelete = async () => {
    if (!subjectToDelete) return;
    setIsDeleting(true);
    try {
      await axios.delete(`/subjects/${subjectToDelete}`);
      toast.success("Subject deleted successfully");
      mutate();
    } catch (err: any) {
      toast.error("Failed to delete the subject. Please try again.");
    } finally {
      setIsDeleting(false);
      setSubjectToDelete(null);
    }
  };

  const confirmStatusChange = async () => {
    if (!subjectToChangeStatus) return;
    setIsChangingStatus(true);
    try {
      const { subject, newStatus } = subjectToChangeStatus;
      const status = newStatus ? "Active" : "Inactive";
      await axios.patch(`/subjects/${subject.id}`, { status });
      toast.success(`Status updated to ${status}`);
      mutate();
    } catch (err: any) {
      toast.error("Failed to update status.");
    } finally {
      setIsChangingStatus(false);
      setSubjectToChangeStatus(null);
    }
  };

  const columns: ColumnDef<Subject>[] = [
    {
      id: "name",
      accessorKey: "name",
      header: "Subject Name",
      cell: ({ row }) => <span className="font-medium">{row.original.name}</span>,
    },
    {
      id: "code",
      accessorKey: "code",
      header: "Code",
      cell: ({ row }) => (
        row.original.code ? (
          <Badge variant="secondary" className="px-1.5 py-0 text-xs rounded-sm h-5">
            {row.original.code}
          </Badge>
        ) : (
          <span className="text-muted-foreground">-</span>
        )
      ),
    },
    {
      id: "type",
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => row.original.type,
    },
    {
      id: "status",
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const sub = row.original;
        return (
          <div className="flex items-center gap-2">
            <Switch
              checked={sub.status === StatusEnum.ACTIVE}
              onCheckedChange={(checked) => setSubjectToChangeStatus({ subject: sub, newStatus: checked })}
            />
            <div
              className={`text-xs px-2.5 py-1 rounded-full font-medium w-fit ${sub.status === StatusEnum.ACTIVE
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
                }`}
            >
              {sub.status}
            </div>
          </div>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const sub = row.original;
        return (
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon-sm" onClick={() => setEditingSubject(sub)}>
              <Pencil />
            </Button>
            <Button variant="destructive" size="icon-sm" onClick={() => setSubjectToDelete(sub.id)}>
              <Trash2 />
            </Button>
          </div>
        );
      },
    },
  ];

  // reset filters
  const resetFilters = () => {
    setFilter(initialFilters);
    setPage(1);
    setLimit(10);
  };

  return (
    <>
      <Card className="p-6 ring-0 shadow-none">

        <CardHeader className="p-0">
          <SubjectFilterBar filter={filter} setFilter={setFilter} />
        </CardHeader>
        <CardContent className="p-0 space-y-4">
          <TableFilter filter={filter} setFilter={setFilter} resetFilters={resetFilters} />

          <DataTable<Subject>
            data={serializedSubjects || []}
            isLoading={isLoading}
            pagination={{
              page: meta.page,
              limit: meta.limit,
              total: meta.total,
              totalPages: meta.totalPages,
              onPageChange: setPage,
              onLimitChange: setLimit,
            }}
            columns={columns}
          />
        </CardContent>
      </Card>

      <Dialog open={!!editingSubject} onOpenChange={(open) => !open && setEditingSubject(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Subject</DialogTitle>
          </DialogHeader>
          {editingSubject && (
            <SubjectForm initialData={editingSubject} onSuccess={() => setEditingSubject(null)} />
          )}
        </DialogContent>
      </Dialog>

      <ConfirmationModal
        isOpen={!!subjectToDelete}
        onClose={() => setSubjectToDelete(null)}
        onConfirm={confirmDelete}
        title="Delete Subject"
        description="Are you sure you want to delete this subject? This action cannot be undone."
        confirmText="Delete"
        variant="destructive"
        isLoading={isDeleting}
      />

      <ConfirmationModal
        isOpen={!!subjectToChangeStatus}
        onClose={() => setSubjectToChangeStatus(null)}
        onConfirm={confirmStatusChange}
        title="Change Subject Status"
        description={`Are you sure you want to change the status to ${subjectToChangeStatus?.newStatus ? 'Active' : 'Inactive'}?`}
        confirmText="Change Status"
        variant="default"
        isLoading={isChangingStatus}
      />
    </>
  );
}
