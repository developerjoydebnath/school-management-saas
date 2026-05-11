"use client";

import ConfirmationModal from "@/shared/components/custom/ConfirmationModal";
import { TOption } from "@/shared/components/form/FilterButton";
import DataTable from "@/shared/components/table/DataTable";
import TableFilter from "@/shared/components/table/TableFilter";
import { AlertDialogTrigger } from "@/shared/components/ui/alert-dialog";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardHeader } from "@/shared/components/ui/card";
import { PATHS } from "@/shared/configs/paths.config";
import { useTableData } from "@/shared/hooks/use-table-data";
import axios from "@/shared/lib/axios";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import ApplicationFilterBar from "./ApplicationFilterBar";

export type ApplicationFilter = {
	search: string;
	status: TOption[];
};

const initialFilters: ApplicationFilter = { search: "", status: [] };

export default function ApplicationList() {
	const [applicationToDelete, setApplicationToDelete] = useState<string | null>(null);
	const [isDeleting, setIsDeleting] = useState(false);

	const t = useTranslations("Applications");
	const tc = useTranslations("Common");

	const [filter, setFilter] = useState<ApplicationFilter>(initialFilters);
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(10);

	const {
		data: applications,
		meta,
		isLoading,
		mutate,
	} = useTableData("/admissions", {
		// page,
		// limit,
		// ...filter,
	});

	const confirmDelete = async (id: string) => {
		setApplicationToDelete(id);
		setIsDeleting(true);
		try {
			await axios.delete(`/admissions/${id}`);
			toast.success("Application deleted successfully");
			mutate();
		} catch (err: any) {
			toast.error("Failed to delete application. Please try again.");
		} finally {
			setIsDeleting(false);
			setApplicationToDelete(null);
		}
	};

	const columns: ColumnDef<any>[] = [
		{
			id: "studentName",
			accessorKey: "fullName",
			header: t("studentName"),
			cell: ({ row }) => (
				<div className="flex flex-col">
					<span className="font-medium">
						{row.original.fullName || row.original.studentName}
					</span>
					<span className="text-muted-foreground text-xs">{row.original.id}</span>
				</div>
			),
		},
		{
			id: "class",
			accessorKey: "class",
			header: t("class"),
			cell: ({ row }) => <span className="text-sm font-medium">{row.original.class}</span>,
		},
		{
			id: "guardianName",
			accessorKey: "fatherName",
			header: t("guardianName"),
			cell: ({ row }) => (
				<div className="flex flex-col">
					<span className="text-sm font-medium">
						{row.original.fatherName || row.original.guardianName || "-"}
					</span>
					<span className="text-muted-foreground text-xs">
						{row.original.mobile || row.original.contact}
					</span>
				</div>
			),
		},
		{
			id: "status",
			header: t("status"),
			cell: ({ row }) => {
				const app = row.original;
				const status = app.status || "Pending";

				return (
					<div
						className={`w-fit rounded-full px-2.5 py-1 text-xs font-medium ${
							status === "Approved"
								? "bg-green-100 text-green-800"
								: status === "Rejected"
									? "bg-red-100 text-red-800"
									: "bg-orange-100 text-orange-800"
						}`}
					>
						{status}
					</div>
				);
			},
		},
		{
			id: "actions",
			header: t("actions"),
			cell: ({ row }) => {
				const app = row.original;
				return (
					<div className="flex items-center gap-2">
						<Link href={PATHS.ADMISSION.LIST.DETAILS(app.id)} passHref>
							<Button variant="outline" size="icon-sm">
								<span>
									<Eye className="text-muted-foreground hover:text-foreground h-4 w-4" />
								</span>
							</Button>
						</Link>
						<Link href={PATHS.ADMISSION.LIST.EDIT(app.id)} passHref>
							<Button variant="outline" size="icon-sm">
								<span>
									<Pencil className="text-muted-foreground hover:text-foreground h-4 w-4" />
								</span>
							</Button>
						</Link>
						<ConfirmationModal
							onConfirm={() => confirmDelete(app.id)}
							title={t("deleteTitle")}
							description={t("deleteDescription")}
							confirmText={tc("delete")}
							variant="destructive"
							isLoading={isDeleting && applicationToDelete === app.id}
						>
							<AlertDialogTrigger
								render={
									<Button variant="destructive" size="icon-sm">
										<Trash2 className="h-4 w-4 text-red-500 hover:text-red-600" />
									</Button>
								}
							/>
						</ConfirmationModal>
					</div>
				);
			},
		},
	];

	const resetFilters = () => {
		setFilter(initialFilters);
		setPage(1);
		setLimit(10);
	};

	return (
		<Card className="p-4 shadow-none ring-0 sm:p-6">
			<CardHeader className="p-0">
				<ApplicationFilterBar filter={filter} setFilter={setFilter} />
			</CardHeader>
			<CardContent className="space-y-4 p-0">
				<TableFilter filter={filter} setFilter={setFilter} resetFilters={resetFilters} />

				<DataTable<any>
					data={applications || []}
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
	);
}
