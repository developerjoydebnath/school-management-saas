"use client";

import { CLASS_FORM_FIELDS } from "@/modules/academics/constants/class.constant";
import { ClassFormValues, classSchema } from "@/modules/academics/dto/class.dto";
import InputField from "@/shared/components/form/InputField";
import { Button } from "@/shared/components/ui/button";
import axios from "@/shared/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useSWRConfig } from "swr";
import { useEffect } from "react";

interface ClassFormProps {
  onSuccess?: () => void;
  initialData?: ClassFormValues & { id?: string };
}

export default function ClassForm({ onSuccess, initialData }: ClassFormProps) {
  const { mutate } = useSWRConfig();

  const form = useForm<ClassFormValues>({
    resolver: zodResolver(classSchema),
    defaultValues: {
      name: initialData?.name || "",
      sections: initialData?.sections || [],
      capacity: initialData?.capacity || 30,
      roomNumber: initialData?.roomNumber || "",
      status: initialData?.status || "Active",
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
    }
  }, [initialData, form]);

  const onSubmit = async (data: ClassFormValues) => {
    try {
      if (initialData?.id) {
        await axios.put(`/classes/${initialData.id}`, data);
        toast.success("Class updated successfully");
      } else {
        await axios.post("/classes", data);
        toast.success("Class added successfully");
      }
      form.reset();
      mutate("/classes");
      if (onSuccess) {
        onSuccess();
      }
    } catch (err: any) {
      toast.error(
        `An error occurred while ${
          initialData?.id ? "updating" : "adding"
        } the class. Please try again.`
      );
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      {CLASS_FORM_FIELDS.map((field) => (
        <InputField key={field.name} control={form.control} {...field} />
      ))}

      <Button type="submit" className="w-full h-10 mt-4" disabled={form.formState.isSubmitting}>
        {form.formState.isSubmitting
          ? initialData?.id
            ? "Updating..."
            : "Adding..."
          : initialData?.id
          ? "Update Class"
          : "Add Class"}
      </Button>
    </form>
  );
}
