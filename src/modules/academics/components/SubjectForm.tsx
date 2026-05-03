"use client";

import { SUBJECT_FORM_FIELDS } from "@/modules/academics/constants/subject.constant";
import { SubjectFormValues, subjectSchema } from "@/modules/academics/dto/subject.dto";
import InputField from "@/shared/components/form/InputField";
import { Button } from "@/shared/components/ui/button";
import axios from "@/shared/lib/axios";
import { StatusEnum, SubjectTypeEnum } from "@/shared/types/enums";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useSWRConfig } from "swr";

interface SubjectFormProps {
  onSuccess?: () => void;
  initialData?: SubjectFormValues & { id?: string };
}

export default function SubjectForm({ onSuccess, initialData }: SubjectFormProps) {
  const { mutate } = useSWRConfig();

  const form = useForm<SubjectFormValues>({
    resolver: zodResolver(subjectSchema),
    defaultValues: {
      name: initialData?.name || "",
      code: initialData?.code || "",
      type: initialData?.type || SubjectTypeEnum.MANDATORY,
      status: initialData?.status || StatusEnum.ACTIVE,
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
    }
  }, [initialData, form]);

  const onSubmit = async (data: SubjectFormValues) => {
    try {
      if (initialData?.id) {
        await axios.put(`/subjects/${initialData.id}`, data);
        toast.success("Subject updated successfully");
      } else {
        await axios.post("/subjects", data);
        toast.success("Subject added successfully");
      }
      form.reset();
      mutate("/subjects");
      if (onSuccess) {
        onSuccess();
      }
    } catch (err: any) {
      toast.error(
        `An error occurred while ${initialData?.id ? "updating" : "adding"
        } the subject. Please try again.`
      );
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      {SUBJECT_FORM_FIELDS.map((field) => (
        <InputField key={field.name} control={form.control} {...field} />
      ))}

      <Button type="submit" className="w-full h-10 mt-4" disabled={form.formState.isSubmitting}>
        {form.formState.isSubmitting
          ? initialData?.id
            ? "Updating..."
            : "Adding..."
          : initialData?.id
            ? "Update Subject"
            : "Add Subject"}
      </Button>
    </form>
  );
}
