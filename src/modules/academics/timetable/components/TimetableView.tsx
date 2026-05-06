"use client";

import ConfirmationModal from "@/shared/components/custom/ConfirmationModal";
import SubjectSingleSelection from "@/shared/components/form/SubjectSingleSelection";
import TeacherSelection from "@/shared/components/form/TeacherSelection";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardHeader } from "@/shared/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/shared/components/ui/dialog";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { ScrollArea } from "@/shared/components/ui/scroll-area";
import { useSWR } from "@/shared/hooks/use-swr";
import { cn } from "@/shared/lib/utils";
import { ClassModel } from "@/shared/models/class.model";
import {
	CalendarDays,
	Check,
	Download,
	LayoutGrid,
	Pencil,
	Plus,
	Printer,
	Trash2,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export type PeriodType = "Period" | "Break" | "Lunch" | "Assembly" | "Activity" | "Prayer";

export const PERIOD_TYPES: PeriodType[] = [
	"Period",
	"Break",
	"Lunch",
	"Assembly",
	"Activity",
	"Prayer",
];

export const getPeriodTypeColor = (type: PeriodType) => {
	switch (type) {
		case "Period":
			return "bg-primary/10 border-primary/20 text-primary-foreground";
		case "Break":
			return "bg-orange-100 border-orange-200 text-orange-800";
		case "Lunch":
			return "bg-green-100 border-green-200 text-green-800";
		case "Assembly":
			return "bg-blue-100 border-blue-200 text-blue-800";
		default:
			return "bg-gray-100 border-gray-200 text-gray-800";
	}
};

export default function TimetableView() {
	const { data: classes } = useSWR("/classes");
	const [selectedClass, setSelectedClass] = useState<string | null>("");
	const [selectedSection, setSelectedSection] = useState<string | null>("ALL");

	// Periods State
	const [periods, setPeriods] = useState<any[]>([
		{ id: "1", name: "Period 1", startTime: "08:00", endTime: "08:45", type: "Period" },
		{ id: "2", name: "Period 2", startTime: "08:45", endTime: "09:30", type: "Period" },
		{ id: "3", name: "Period 3", startTime: "09:30", endTime: "10:15", type: "Period" },
		{ id: "4", name: "Break", startTime: "10:15", endTime: "10:30", type: "Break" },
		{ id: "5", name: "Period 4", startTime: "10:30", endTime: "11:15", type: "Period" },
	]);

	// Assignments State (Day_PeriodId -> {subject, teacher})
	const [assignments, setAssignments] = useState<Record<string, any>>({});

	// Dialog States
	const [editingColumn, setEditingColumn] = useState<any | null>(null);
	const [assigningPeriod, setAssigningPeriod] = useState<any | null>(null);
	const [deleteTarget, setDeleteTarget] = useState<{
		type: "column" | "assignment";
		id: string;
		day?: string;
	} | null>(null);

	const serializedClasses: ClassModel[] = classes?.map((cls: any) => new ClassModel(cls)) || [];
	const activeClass = serializedClasses?.find((c: ClassModel) => c.id === selectedClass);
	const sections = activeClass?.sections || [];

	const handleAddColumn = () => {
		setEditingColumn({
			id: `new-${Date.now()}`,
			name: "",
			startTime: "",
			endTime: "",
			type: "Period",
		});
	};

	const handleSaveColumn = (data: any) => {
		if (periods.find((p) => p.id === data.id)) {
			setPeriods(periods.map((p) => (p.id === data.id ? data : p)));
		} else {
			setPeriods([...periods, data]);
		}
		setEditingColumn(null);
	};

	const handleDeleteColumn = () => {
		if (deleteTarget?.type === "column") {
			setPeriods(periods.filter((p) => p.id !== deleteTarget.id));
			setDeleteTarget(null);
			setEditingColumn(null);
			toast.success("Column deleted");
		}
	};

	const { data: subjectsData } = useSWR("/subjects");
	const { data: teachersData } = useSWR("/teachers");

	const handleAssignPeriod = (data: any) => {
		if (!assigningPeriod) return;
		const subject = subjectsData?.find((s: any) => s.id === data.subjectId);
		const teacher = teachersData?.find((t: any) => t.id === data.teacherId);

		const key = `${assigningPeriod.day}_${assigningPeriod.period.id}`;
		setAssignments({
			...assignments,
			[key]: {
				...data,
				subjectName: subject?.name || data.subjectId,
				teacherName: teacher?.name || data.teacherId,
			},
		});
		setAssigningPeriod(null);
	};

	const handleDeleteAssignment = () => {
		if (deleteTarget?.type === "assignment") {
			const key = `${deleteTarget.day}_${deleteTarget.id}`;
			const newAssignments = { ...assignments };
			delete newAssignments[key];
			setAssignments(newAssignments);
			setDeleteTarget(null);
			setAssigningPeriod(null);
			toast.success("Assignment cleared");
		}
	};

	return (
		<div className="flex flex-col gap-6 lg:flex-row">
			{/* Classes Sidebar */}
			<Card className="w-full flex-shrink-0 border shadow-none ring-0 lg:w-64">
				<CardHeader className="border-b p-4">
					<div className="flex items-center gap-2 font-semibold">
						<LayoutGrid className="text-primary size-4" />
						<span>Classes</span>
					</div>
				</CardHeader>
				<CardContent className="p-0">
					<ScrollArea className="h-[200px] lg:h-[600px]">
						<div className="space-y-1 p-2">
							{serializedClasses.map((cls) => (
								<button
									key={cls.id}
									onClick={() => {
										setSelectedClass(cls.id);
										setSelectedSection("ALL");
									}}
									className={cn(
										"group flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm transition-colors",
										selectedClass === cls.id
											? "bg-primary text-primary-foreground font-medium"
											: "hover:bg-accent text-muted-foreground hover:text-foreground"
									)}
								>
									<span>{cls.name}</span>
									{selectedClass === cls.id && <Check className="size-3" />}
								</button>
							))}
							{serializedClasses.length === 0 && (
								<p className="text-muted-foreground p-4 text-center text-xs">
									No classes found
								</p>
							)}
						</div>
					</ScrollArea>
				</CardContent>
			</Card>

			{/* Timetable Main Area */}
			<Card className="flex-1 overflow-hidden border shadow-none ring-0">
				<CardHeader className="flex flex-col justify-between gap-4 border-b p-4 md:flex-row md:items-center">
					<div className="flex items-center gap-4">
						<div className="bg-accent/50 flex rounded-lg border p-1">
							<Button
								variant={selectedSection === "ALL" ? "default" : "ghost"}
								size="sm"
								className="h-8 px-3 text-xs"
								onClick={() => setSelectedSection("ALL")}
							>
								All Sections
							</Button>
							{sections.map((sec: any) => (
								<Button
									key={sec.name}
									variant={selectedSection === sec.name ? "default" : "ghost"}
									size="sm"
									className="ml-1 h-8 px-3 text-xs"
									onClick={() => setSelectedSection(sec.name)}
								>
									Section {sec.name}
								</Button>
							))}
						</div>
					</div>

					<div className="flex gap-2">
						<Button variant="outline" size="sm" className="hidden sm:flex">
							<Printer className="mr-2 h-4 w-4" /> Print
						</Button>
						<Button variant="outline" size="sm" className="hidden sm:flex">
							<Download className="mr-2 h-4 w-4" /> Export
						</Button>
						<Button
							size="sm"
							onClick={handleAddColumn}
							className="bg-primary hover:bg-primary/90 text-primary-foreground"
						>
							<Plus className="mr-2 h-4 w-4" /> Add Column
						</Button>
					</div>
				</CardHeader>

				<CardContent className="p-0">
					{!selectedClass ? (
						<div className="text-muted-foreground flex flex-col items-center py-32 text-center">
							<div className="bg-accent/50 mb-6 flex h-20 w-20 items-center justify-center rounded-full">
								<CalendarDays className="text-muted-foreground/60 h-10 w-10" />
							</div>
							<p className="text-foreground mb-2 text-lg font-semibold">
								Select a Class
							</p>
							<p className="mx-auto max-w-xs text-sm">
								Choose a class from the sidebar to view and manage its timetable
								configuration.
							</p>
						</div>
					) : (
						<div className="custom-scrollbar overflow-x-auto">
							<table className="w-full min-w-[1000px] border-collapse text-left text-sm">
								<thead className="bg-accent/30 text-muted-foreground sticky top-0 z-10 border-b font-medium backdrop-blur-sm">
									<tr>
										<th className="text-foreground bg-background/50 w-[120px] border-r p-4 text-center font-bold">
											Day
										</th>
										{periods.map((p) => (
											<th
												key={p.id}
												className="group relative min-w-[160px] border-r p-3 text-center last:border-r-0"
											>
												<div className="flex flex-col items-center justify-center gap-1.5 pt-2 pb-6">
													<span className="text-foreground text-xs font-bold tracking-wider uppercase">
														{p.name}
													</span>
													<Badge
														variant="secondary"
														className="border-accent-foreground/10 bg-background/80 rounded-md px-2 py-0.5 font-mono text-[10px] shadow-sm"
													>
														{p.startTime} - {p.endTime}
													</Badge>
													<Badge
														className={cn(
															"mt-0.5 h-4 border px-1.5 text-[8px] tracking-tighter uppercase shadow-none",
															getPeriodTypeColor(p.type)
														)}
													>
														{p.type}
													</Badge>
												</div>

												<div className="absolute right-0 bottom-1.5 left-0 flex justify-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
													<Button
														variant="ghost"
														size="icon-xs"
														className="hover:bg-primary hover:text-primary-foreground h-6 w-6 rounded-full"
														onClick={() => setEditingColumn(p)}
													>
														<Pencil className="size-3" />
													</Button>
													<Button
														variant="ghost"
														size="icon-xs"
														className="h-6 w-6 rounded-full hover:bg-red-500 hover:text-white"
														onClick={() =>
															setDeleteTarget({
																type: "column",
																id: p.id,
															})
														}
													>
														<Trash2 className="size-3" />
													</Button>
												</div>
											</th>
										))}
									</tr>
								</thead>
								<tbody>
									{DAYS.map((day, dayIndex) => (
										<tr
											key={day}
											className="hover:bg-accent/5 group border-b last:border-0"
										>
											<td className="bg-accent/10 text-muted-foreground group-hover:text-foreground border-r p-4 text-center text-xs font-bold tracking-widest uppercase transition-colors">
												{day}
											</td>
											{periods.map((p) => {
												const assignment = assignments[`${day}_${p.id}`];

												if (
													p.type === "Break" ||
													p.type === "Lunch" ||
													p.type === "Assembly"
												) {
													if (dayIndex === 0) {
														return (
															<td
																key={p.id}
																rowSpan={DAYS.length}
																className="bg-accent/5 text-muted-foreground border-r p-4 text-center align-middle"
															>
																<div className="flex h-full items-center justify-center">
																	<div className="flex flex-col items-center gap-4">
																		<span
																			className="text-muted-foreground/30 text-[10px] font-black tracking-[0.5em] uppercase"
																			style={{
																				writingMode:
																					"vertical-lr",
																				transform:
																					"rotate(180deg)",
																			}}
																		>
																			{p.name}
																		</span>
																		<div
																			className={cn(
																				"h-12 w-1 rounded-full",
																				p.type === "Break"
																					? "bg-orange-200"
																					: p.type ===
																						  "Lunch"
																						? "bg-green-200"
																						: "bg-blue-200"
																			)}
																		/>
																	</div>
																</div>
															</td>
														);
													}
													return null;
												}

												return (
													<td
														key={p.id}
														className="group/cell relative min-h-[120px] border-r p-3 last:border-r-0"
													>
														{assignment ? (
															<div
																onClick={() =>
																	setAssigningPeriod({
																		day,
																		period: p,
																		assignment,
																	})
																}
																className="dark:bg-accent/10 border-primary/20 hover:border-primary hover:shadow-primary/5 group/item relative flex h-full min-h-[100px] cursor-pointer flex-col items-start justify-center overflow-hidden rounded-xl border-2 bg-white p-3 transition-all hover:shadow-lg"
															>
																<div className="bg-primary/5 absolute top-0 right-0 flex h-8 w-8 items-center justify-center rounded-bl-xl opacity-0 transition-opacity group-hover/item:opacity-100">
																	<Pencil className="text-primary size-3" />
																</div>
																<span className="text-foreground mb-1 line-clamp-1 text-sm font-bold">
																	{assignment.subjectName ||
																		"Subject"}
																</span>
																<div className="mt-auto flex items-center gap-2">
																	<div className="bg-primary/10 text-primary flex size-6 items-center justify-center rounded-full text-[10px] font-bold">
																		{assignment.teacherName
																			?.substring(0, 2)
																			.toUpperCase()}
																	</div>
																	<span className="text-muted-foreground line-clamp-1 text-[11px] font-medium">
																		{assignment.teacherName}
																	</span>
																</div>
															</div>
														) : (
															<div
																onClick={() =>
																	setAssigningPeriod({
																		day,
																		period: p,
																	})
																}
																className="hover:border-primary/30 hover:bg-primary/5 text-muted-foreground/20 hover:text-primary/40 bg-accent/5 group/empty flex h-full min-h-[100px] cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-transparent transition-all"
															>
																<Plus className="h-6 w-6 scale-90 transition-transform group-hover/empty:scale-110" />
															</div>
														)}
													</td>
												);
											})}
										</tr>
									))}
								</tbody>
							</table>
						</div>
					)}
				</CardContent>
			</Card>

			{/* Edit Column Dialog */}
			<Dialog open={!!editingColumn} onOpenChange={(open) => !open && setEditingColumn(null)}>
				<DialogContent className="px-0 sm:max-w-[425px]">
					<DialogHeader className="px-6 pb-2">
						<DialogTitle>
							{editingColumn?.id?.includes("new") ? "Add Column" : "Edit Column"}
						</DialogTitle>
					</DialogHeader>
					<ScrollArea className="max-h-[80vh] px-4 py-2">
						<div className="space-y-6 px-2">
							<div className="space-y-2">
								<Label htmlFor="col-name">Column Name</Label>
								<Input
									id="col-name"
									value={editingColumn?.name || ""}
									onChange={(e) =>
										setEditingColumn({ ...editingColumn, name: e.target.value })
									}
									placeholder="e.g. Period 1"
									className="h-10"
								/>
							</div>
							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label htmlFor="start-time">Start Time</Label>
									<Input
										id="start-time"
										type="time"
										value={editingColumn?.startTime || ""}
										onChange={(e) =>
											setEditingColumn({
												...editingColumn,
												startTime: e.target.value,
											})
										}
										className="h-10"
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="end-time">End Time</Label>
									<Input
										id="end-time"
										type="time"
										value={editingColumn?.endTime || ""}
										onChange={(e) =>
											setEditingColumn({
												...editingColumn,
												endTime: e.target.value,
											})
										}
										className="h-10"
									/>
								</div>
							</div>
							<div className="space-y-3">
								<Label>Type</Label>
								<div className="flex flex-wrap gap-2">
									{PERIOD_TYPES.map((type) => (
										<Button
											key={type}
											variant={
												editingColumn?.type === type ? "default" : "outline"
											}
											size="sm"
											onClick={() =>
												setEditingColumn({ ...editingColumn, type })
											}
											className={cn(
												"h-9 rounded-full px-4 text-xs font-medium",
												editingColumn?.type === type
													? "shadow-md"
													: "hover:bg-accent"
											)}
										>
											{type}
										</Button>
									))}
								</div>
							</div>
						</div>
					</ScrollArea>
					<DialogFooter className="mt-4 flex items-center justify-between border-t px-6 py-4">
						{!editingColumn?.id?.includes("new") && (
							<Button
								variant="ghost"
								size="sm"
								className="text-red-500 hover:bg-red-50 hover:text-red-600"
								onClick={() =>
									setDeleteTarget({ type: "column", id: editingColumn.id })
								}
							>
								<Trash2 className="mr-2 size-4" /> Delete Column
							</Button>
						)}
						<div className="ml-auto flex gap-2">
							<Button
								variant="outline"
								size="sm"
								onClick={() => setEditingColumn(null)}
							>
								Cancel
							</Button>
							<Button size="sm" onClick={() => handleSaveColumn(editingColumn)}>
								Save Changes
							</Button>
						</div>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			{/* Assign Period Dialog */}
			<Dialog
				open={!!assigningPeriod}
				onOpenChange={(open) => !open && setAssigningPeriod(null)}
			>
				<DialogContent className="px-0 sm:max-w-[425px]">
					<DialogHeader className="border-b px-6 pb-4">
						<DialogTitle>Assign Period</DialogTitle>
						<p className="text-muted-foreground mt-1 text-xs">
							{assigningPeriod?.day} • {assigningPeriod?.period?.name} •{" "}
							{assigningPeriod?.period?.startTime}-{assigningPeriod?.period?.endTime}
						</p>
					</DialogHeader>
					<ScrollArea className="max-h-[80vh] px-6 py-6">
						<div className="space-y-6">
							<div className="space-y-3">
								<Label>Subject</Label>
								<SubjectSingleSelection
									value={assigningPeriod?.assignment?.subjectId || ""}
									onChange={(val) => {
										setAssigningPeriod({
											...assigningPeriod,
											assignment: {
												...assigningPeriod?.assignment,
												subjectId: val,
											},
										});
									}}
								/>
							</div>
							<div className="space-y-3">
								<Label>Teacher</Label>
								<TeacherSelection
									value={assigningPeriod?.assignment?.teacherId || ""}
									onChange={(val) => {
										setAssigningPeriod({
											...assigningPeriod,
											assignment: {
												...assigningPeriod?.assignment,
												teacherId: val,
											},
										});
									}}
								/>
							</div>
						</div>
					</ScrollArea>
					<DialogFooter className="mt-4 flex items-center justify-between border-t px-6 py-4">
						{assigningPeriod?.assignment && (
							<Button
								variant="ghost"
								size="sm"
								className="text-red-500 hover:bg-red-50 hover:text-red-600"
								onClick={() =>
									assigningPeriod &&
									setDeleteTarget({
										type: "assignment",
										id: assigningPeriod.period.id,
										day: assigningPeriod.day,
									})
								}
							>
								<Trash2 className="mr-2 size-4" /> Clear Slot
							</Button>
						)}
						<div className="ml-auto flex gap-2">
							<Button
								variant="outline"
								size="sm"
								onClick={() => setAssigningPeriod(null)}
							>
								Cancel
							</Button>
							<Button
								size="sm"
								disabled={
									!assigningPeriod?.assignment?.subjectId ||
									!assigningPeriod?.assignment?.teacherId
								}
								onClick={() =>
									assigningPeriod &&
									handleAssignPeriod(assigningPeriod.assignment)
								}
							>
								Assign
							</Button>
						</div>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			{/* Confirmation Modal */}
			<ConfirmationModal
				isOpen={!!deleteTarget}
				onClose={() => setDeleteTarget(null)}
				onConfirm={
					deleteTarget?.type === "column" ? handleDeleteColumn : handleDeleteAssignment
				}
				title={deleteTarget?.type === "column" ? "Delete Column" : "Clear Assignment"}
				description={
					deleteTarget?.type === "column"
						? "Are you sure you want to delete this column? This will remove all assignments in this column across all days."
						: "Are you sure you want to clear this period assignment?"
				}
				confirmText={deleteTarget?.type === "column" ? "Delete" : "Clear"}
				variant="destructive"
			/>
		</div>
	);
}
