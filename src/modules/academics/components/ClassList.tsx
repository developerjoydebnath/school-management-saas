"use client";

import { ClassFormValues } from "@/modules/academics/dto/class.dto";
import ConfirmationModal from "@/shared/components/custom/ConfirmationModal";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { Switch } from "@/shared/components/ui/switch";
import { useSWR } from "@/shared/hooks/use-swr";
import axios from "@/shared/lib/axios";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import ClassForm from "./ClassForm";

interface ClassType extends ClassFormValues {
  id: string;
}

export default function ClassList() {
  const { data: classes, isLoading, mutate } = useSWR("/classes");
  const [editingClass, setEditingClass] = useState<ClassType | null>(null);
  const [classToDelete, setClassToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [classToChangeStatus, setClassToChangeStatus] = useState<{ cls: ClassType, newStatus: boolean } | null>(null);
  const [isChangingStatus, setIsChangingStatus] = useState(false);

  const confirmDelete = async () => {
    if (!classToDelete) return;
    setIsDeleting(true);
    try {
      await axios.delete(`/classes/${classToDelete}`);
      toast.success("Class deleted successfully");
      mutate();
    } catch (err: any) {
      toast.error("Failed to delete the class. Please try again.");
    } finally {
      setIsDeleting(false);
      setClassToDelete(null);
    }
  };

  const confirmStatusChange = async () => {
    if (!classToChangeStatus) return;
    setIsChangingStatus(true);
    try {
      const { cls, newStatus } = classToChangeStatus;
      const status = newStatus ? "Active" : "Inactive";
      await axios.patch(`/classes/${cls.id}`, { status });
      toast.success(`Status updated to ${status}`);
      mutate();
    } catch (err: any) {
      toast.error("Failed to update status.");
    } finally {
      setIsChangingStatus(false);
      setClassToChangeStatus(null);
    }
  };

  return (
    <>
      <Card className="w-full shadow-none ring-0">
        <CardHeader>
          <CardTitle className="text-lg">Class List</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-[88px] w-full" />
              <Skeleton className="h-[88px] w-full" />
              <Skeleton className="h-[88px] w-full" />
            </div>
          ) : !classes || classes.length === 0 ? (
            <p className="text-sm text-muted-foreground">No classes found.</p>
          ) : (
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
              {classes.map((cls: ClassType) => (
                <div key={cls.id} className="p-4 border rounded-md flex justify-between items-center bg-card group">
                  <div className="space-y-1.5">
                    <p className="font-medium text-lg flex items-center gap-2">
                      {cls.name}
                      {cls.sections && cls.sections.length > 0 && (
                        <span className="flex items-center gap-1">
                          {cls.sections.map((sec) => (
                            <Badge key={sec} variant="outline" className="px-1.5 py-0 text-xs rounded-sm bg-accent font-normal h-5">
                              {sec}
                            </Badge>
                          ))}
                        </span>
                      )}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Room: {cls.roomNumber} | Capacity: {cls.capacity} students
                    </p>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={cls.status === "Active"}
                        onCheckedChange={(checked) => setClassToChangeStatus({ cls, newStatus: checked })}
                      />
                      <div
                        className={`text-xs px-2.5 py-1 rounded-full font-medium ${cls.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                          }`}
                      >
                        {cls.status}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="icon" onClick={() => setEditingClass(cls)}>
                        <Pencil className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => setClassToDelete(cls.id)}>
                        <Trash2 className="h-4 w-4 text-red-500 hover:text-red-600" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={!!editingClass} onOpenChange={(open) => !open && setEditingClass(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Class</DialogTitle>
          </DialogHeader>
          {editingClass && (
            <ClassForm initialData={editingClass} onSuccess={() => setEditingClass(null)} />
          )}
        </DialogContent>
      </Dialog>

      <ConfirmationModal
        isOpen={!!classToDelete}
        onClose={() => setClassToDelete(null)}
        onConfirm={confirmDelete}
        title="Delete Class"
        description="Are you sure you want to delete this class? This action cannot be undone."
        confirmText="Delete"
        variant="destructive"
        isLoading={isDeleting}
      />

      <ConfirmationModal
        isOpen={!!classToChangeStatus}
        onClose={() => setClassToChangeStatus(null)}
        onConfirm={confirmStatusChange}
        title="Change Class Status"
        description={`Are you sure you want to change the status to ${classToChangeStatus?.newStatus ? 'Active' : 'Inactive'}?`}
        confirmText="Change Status"
        variant="default"
        isLoading={isChangingStatus}
      />
    </>
  );
}
