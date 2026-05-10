"use client";

import { FileText } from "lucide-react";

interface AdmissionPreviewProps {
	fields: any[];
	values: any;
}

export default function AdmissionPreview({ fields, values }: AdmissionPreviewProps) {
	return (
		<div className="space-y-6">
			<div className="flex items-center gap-3 border-b pb-2">
				<div className="bg-primary/10 text-primary flex h-8 w-8 items-center justify-center rounded-lg">
					<FileText className="h-4 w-4" />
				</div>
				<h3 className="text-foreground text-sm font-bold tracking-tight uppercase">
					Preview Admission Details
				</h3>
			</div>
			<div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
				{fields.map((field) => (
					<div key={field.id} className="space-y-1 rounded-lg border p-3">
						<p className="text-xs text-muted-foreground">{field.label}</p>
						<p className="font-medium">
							{typeof values[field.id] === "object" && values[field.id] !== null
								? JSON.stringify(values[field.id])
								: (values[field.id]?.toString() || "N/A")}
						</p>
					</div>
				))}
			</div>
		</div>
	);
}
