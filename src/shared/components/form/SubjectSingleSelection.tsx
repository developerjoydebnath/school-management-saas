import * as React from "react"
import { useSWR } from "@/shared/hooks/use-swr"
import { Subject } from "@/shared/models/subject.model"
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
import { cn } from "@/shared/lib/utils"

interface SubjectSingleSelectionProps {
  value: string
  onChange: (value: string) => void
  className?: string
  placeholder?: string
}

export default function SubjectSingleSelection({
  value,
  onChange,
  className,
  placeholder = "Select subject...",
}: SubjectSingleSelectionProps) {
  const { data: subjects, isLoading } = useSWR("/subjects")
  const [searchValue, setSearchValue] = React.useState("")
  const anchor = useComboboxAnchor()

  const serializedSubjects = subjects?.map((s: any) => new Subject(s)) || []

  const filteredSubjects = serializedSubjects.filter((subject: Subject) =>
    subject.name.toLowerCase().includes(searchValue.toLowerCase())
  )

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

          <ComboboxContent anchor={anchor} className="w-(--anchor-width) min-w-[200px]">
            <ComboboxList>
              {filteredSubjects.length === 0 ? (
                <ComboboxEmpty>No subjects found.</ComboboxEmpty>
              ) : (
                filteredSubjects.map((subject: Subject) => (
                  <ComboboxItem key={subject.id} value={subject.id}>
                    {subject.name}
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
