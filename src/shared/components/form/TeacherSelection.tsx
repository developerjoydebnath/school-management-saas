import * as React from "react"
import { useSWR } from "@/shared/hooks/use-swr"
import { Teacher } from "@/shared/models/teacher.model"
import {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxEmpty,
  useComboboxAnchor,
} from "@/shared/components/ui/combobox"
import { Skeleton } from "@/shared/components/ui/skeleton"
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar"
import { cn } from "@/shared/lib/utils"

interface TeacherSelectionProps {
  value: string
  onChange: (value: string) => void
  className?: string
  placeholder?: string
}

export default function TeacherSelection({
  value,
  onChange,
  className,
  placeholder = "Select teacher...",
}: TeacherSelectionProps) {
  const { data: teachers, isLoading } = useSWR("/teachers")
  const [searchValue, setSearchValue] = React.useState("")
  const anchor = useComboboxAnchor()

  const serializedTeachers = teachers?.map((t: any) => new Teacher(t)) || []

  const filteredTeachers = serializedTeachers.filter((teacher: Teacher) =>
    teacher.name.toLowerCase().includes(searchValue.toLowerCase())
  )

  const selectedTeacher = serializedTeachers.find((t: Teacher) => t.id === value)

  return (
    <div className={cn("w-full", className)}>
      {isLoading ? (
        <Skeleton className="h-10 w-full rounded-md" />
      ) : (
        <Combobox
          value={value}
          onValueChange={(val) => onChange(val || "")}
        >
          <div ref={anchor}>
            <ComboboxInput
              placeholder={placeholder}
              value={searchValue}
              onChange={(e: any) => setSearchValue(e.target.value)}
              className="text-sm"
              showClear
            />
          </div>

          <ComboboxContent anchor={anchor} className="w-(--anchor-width) min-w-[300px]">
            <ComboboxList>
              {filteredTeachers.length === 0 ? (
                <ComboboxEmpty>No teachers found.</ComboboxEmpty>
              ) : (
                filteredTeachers.map((teacher: Teacher) => (
                  <ComboboxItem key={teacher.id} value={teacher.id} className="py-2">
                    <div className="flex items-center gap-3">
                      <Avatar className="size-8">
                        <AvatarFallback>{teacher.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-medium">{teacher.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {teacher.subjects.join(", ") || "No subject assigned"}
                        </span>
                      </div>
                    </div>
                  </ComboboxItem>
                ))
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      )}
    </div>
  )
}
