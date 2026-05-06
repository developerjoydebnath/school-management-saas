"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import axios from "@/shared/lib/axios"
import { useSWRConfig } from "swr"

import { Button } from "@/shared/components/ui/button"
import InputField from "@/shared/components/form/InputField"
import { StatusEnum } from "@/shared/types/enums"
import { teacherSchema, TeacherFormValues } from "../dto/teacher.dto"

interface TeacherFormProps {
  onSuccess?: () => void
  initialData?: any
}

export default function TeacherForm({ onSuccess, initialData }: TeacherFormProps) {
  const { mutate } = useSWRConfig()

  const form = useForm<TeacherFormValues>({
    resolver: zodResolver(teacherSchema),
    defaultValues: {
      name: initialData?.name || "",
      mobile: initialData?.mobileNumber || initialData?.mobile || initialData?.contact || "",
      email: initialData?.email || "",
      address: initialData?.address || "",
      subjects: initialData?.subjects || [],
      status: (initialData?.status?.toUpperCase() as StatusEnum) || StatusEnum.ACTIVE,
    },
  })

  const onSubmit = async (data: TeacherFormValues) => {
    try {
      if (initialData?.id) {
        await axios.put(`/teachers/${initialData.id}`, data)
        toast.success("Teacher updated successfully")
      } else {
        await axios.post("/teachers", data)
        toast.success("Teacher added successfully")
      }
      mutate("/teachers")
      if (onSuccess) {
        onSuccess()
      }
    } catch (err: any) {
      toast.error(
        `An error occurred while ${initialData?.id ? "updating" : "adding"} the teacher. Please try again.`
      )
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 px-2">
      <div className="space-y-4">
        <InputField
          control={form.control}
          name="name"
          label="Name"
          placeholder="Enter teacher's name"
          type="text"
        />
        <div className="grid grid-cols-2 gap-4">
          <InputField
            control={form.control}
            name="mobile"
            label="Mobile Number"
            placeholder="e.g. +1234567890"
            type="text"
          />
          <InputField
            control={form.control}
            name="email"
            label="Email Address"
            placeholder="e.g. teacher@school.com"
            type="email"
          />
        </div>
        <InputField
          control={form.control}
          name="address"
          label="Address"
          placeholder="Enter residential address"
          type="textarea"
          className="h-24"
        />
        <InputField
          control={form.control}
          name="subjects"
          label="Subjects"
          type="subjectSelection"
        />
        <InputField
          control={form.control}
          name="status"
          label="Status"
          type="select"
          options={[
            { label: "Active", value: "ACTIVE" },
            { label: "Inactive", value: "INACTIVE" },
          ]}
        />
      </div>

      <Button type="submit" className="w-full h-10" disabled={form.formState.isSubmitting}>
        {form.formState.isSubmitting
          ? initialData?.id
            ? "Updating..."
            : "Adding..."
          : initialData?.id
            ? "Update Teacher"
            : "Add Teacher"}
      </Button>
    </form>
  )
}
