import {
	Combobox,
	ComboboxContent,
	ComboboxEmpty,
	ComboboxInput,
	ComboboxItem,
	ComboboxList,
	useComboboxAnchor,
} from "@/shared/components/ui/combobox";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { useSWR } from "@/shared/hooks/use-swr";
import { cn } from "@/shared/lib/utils";
import { Subject } from "@/shared/models/subject.model";
import * as React from "react";

interface SubjectSingleSelectionProps {
	value: string;
	onChange: (value: string) => void;
	className?: string;
	placeholder?: string;
}

export default function SubjectSingleSelection({
	value,
	onChange,
	className,
	placeholder = "Select subject...",
}: SubjectSingleSelectionProps) {
	const { data: subjects, isLoading } = useSWR("/subjects");
	const [searchValue, setSearchValue] = React.useState("");
	const [open, setOpen] = React.useState(false);
	const anchor = useComboboxAnchor();

	const serializedSubjects = subjects?.map((s: any) => new Subject(s)) || [];
	const selectedSubject = serializedSubjects.find((s: Subject) => s.id === value);

	React.useEffect(() => {
		if (selectedSubject) {
			// eslint-disable-next-line react-hooks/set-state-in-effect
			setSearchValue(selectedSubject.name);
		} else {
			setSearchValue("");
		}
	}, [selectedSubject]);

	const filteredSubjects = serializedSubjects.filter((subject: Subject) =>
		subject.name.toLowerCase().includes(searchValue.toLowerCase())
	);

	return (
		<div className={cn("w-full", className)}>
			{isLoading ? (
				<Skeleton className="h-10 w-full rounded-md" />
			) : (
				<Combobox
					open={open}
					onOpenChange={(newOpen) => {
						setOpen(newOpen);
						if (!newOpen) {
							setSearchValue(selectedSubject?.name || "");
						} else {
							setSearchValue("");
						}
					}}
					value={value}
					onValueChange={(val) => {
						onChange(val || "");
						setOpen(false);
					}}
				>
					<div ref={anchor}>
						<ComboboxInput
							placeholder={placeholder}
							value={searchValue}
							onChange={(e: any) => {
								setSearchValue(e.target.value);
								setOpen(true);
							}}
							onFocus={() => {
								if (!open) {
									setOpen(true);
									setSearchValue("");
								}
							}}
							className="text-sm"
							showClear
						/>
					</div>

					<ComboboxContent
						anchor={anchor}
						className="w-(--anchor-width) min-w-[200px] p-1"
					>
						<ComboboxList>
							{filteredSubjects.length === 0 ? (
								<ComboboxEmpty>No subjects found.</ComboboxEmpty>
							) : (
								filteredSubjects.map((subject: Subject) => (
									<ComboboxItem
										key={subject.id}
										value={subject.id}
										className="cursor-pointer"
									>
										{subject.name}
									</ComboboxItem>
								))
							)}
						</ComboboxList>
					</ComboboxContent>
				</Combobox>
			)}
		</div>
	);
}
