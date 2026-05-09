"use client";

import InputField from "@/shared/components/form/InputField";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/shared/components/ui/card";
import axios from "@/shared/lib/axios";
import { cn } from "@/shared/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	AlertCircle,
	ArrowRight,
	CheckCircle2,
	CreditCard,
	Database,
	FileText,
	Info,
	Loader2,
	UserPlus,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { ADMISSION_FIELDS } from "../../shared/constants/admission-fields";
import { useAdmissionSettingsStore } from "../../shared/stores/admission-settings-store";

// Extracted impure logic outside the component to satisfy purity rules
const generateStudentId = () => `STU${Math.floor(1000 + Math.random() * 9000)}`;

export default function NewAdmissionForm({ onSuccess }: { onSuccess: () => void }) {
	const [loading, setLoading] = useState(false);
	const [step, setStep] = useState<"form" | "success">("form");
	const [createdStudent, setCreatedStudent] = useState<any>(null);

	const t = useTranslations("AdmissionNew");
	const tc = useTranslations("AdmissionSettings.categories");

	const { fieldSettings, customFields } = useAdmissionSettingsStore();

	const allFields = useMemo(() => {
		return [...ADMISSION_FIELDS, ...customFields];
	}, [customFields]);

	const admissionFields = useMemo(() => {
		return allFields.filter((f) => fieldSettings[f.id]);
	}, [allFields, fieldSettings]);

	const categories = useMemo(() => {
		const cats = Array.from(new Set(admissionFields.map((f) => f.category)));
		// Order categories for better flow
		const order = [
			"student_info",
			"academic_info",
			"parent_info",
			"address",
			"documents",
			"health_info",
			"payment",
		];
		return cats.sort((a, b) => order.indexOf(a) - order.indexOf(b));
	}, [admissionFields]);

	// Generate dynamic schema and default values
	const { schema, defaultValues } = useMemo(() => {
		const shape: Record<string, any> = {};
		const defaults: Record<string, string> = {};

		admissionFields.forEach((field) => {
			let fieldSchema: any;

			if (field.type === "number") {
				fieldSchema = z.union([z.string(), z.number()]);
				if (field.isFixed) {
					fieldSchema = fieldSchema.refine(
						(val: any) => val !== "" && val !== undefined,
						{
							message: `${field.label} is required`,
						}
					);
				} else {
					fieldSchema = fieldSchema.optional();
				}
			} else {
				if (field.isFixed) {
					fieldSchema = z.string().min(1, `${field.label} is required`);
				} else {
					fieldSchema = z.string().optional();
				}
			}

			shape[field.id] = fieldSchema;
			defaults[field.id] = "";
		});

		return {
			schema: z.object(shape),
			defaultValues: defaults,
		};
	}, [admissionFields]);

	const form = useForm({
		resolver: zodResolver(schema),
		defaultValues,
	});

	const selectedClassId = form.watch("class") as string | undefined;

	// Wrapped in useCallback to ensure stability and move impure calls away from render
	const onSubmit = useCallback(
		async (values: any) => {
			setLoading(true);
			try {
				// Split data into fixed and custom (JSON)
				const fixedData: Record<string, any> = {};
				const customData: Record<string, any> = {};

				Object.entries(values).forEach(([key, value]) => {
					const field = allFields.find((f) => f.id === key);
					if (field?.isCustom) {
						customData[key] = value;
					} else {
						fixedData[key] = value;
					}
				});

				const payload = {
					...fixedData,
					customData: JSON.stringify(customData),
					status: "Pending",
					date: new Date().toISOString(),
				};

				console.log("Submitting Admission Payload:", payload);

				// Mock API call
				await new Promise((resolve) => setTimeout(resolve, 1500));

				const studentId = generateStudentId();
				setCreatedStudent({
					id: studentId,
					name: values.fullName,
					class: values.class,
					completion: 42,
				});

				setStep("success");
				toast.success("Student admission successful!");
				onSuccess?.();
			} catch (err) {
				console.error("Error creating admission:", err);
				toast.error("Failed to process admission. Please try again.");
			} finally {
				setLoading(false);
			}
		},
		[allFields, onSuccess]
	);

	if (step === "success" && createdStudent) {
		return (
			<Card className="gap-0 overflow-hidden border-0 py-0 shadow-xl ring-1 ring-black/5 dark:ring-white/10">
				<div className="h-1.5 bg-green-500" />
				<CardContent className="py-8 text-center">
					<div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-50 dark:bg-green-900/20">
						<CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-400" />
					</div>
					<h2 className="text-foreground mb-2 text-2xl font-bold">
						Admission Successful!
					</h2>
					<p className="text-muted-foreground mx-auto mb-8 max-w-md">
						Student <strong>{createdStudent?.name}</strong> has been admitted to{" "}
						<strong>{createdStudent?.class}</strong>.
					</p>

					<div className="bg-muted mx-auto mb-8 flex max-w-xs items-center justify-center gap-2 rounded-lg p-3 font-mono text-lg font-bold tracking-wider">
						<span className="text-muted-foreground text-sm font-normal">ID:</span>
						{createdStudent?.id}
					</div>

					<div className="mx-auto mb-8 max-w-lg space-y-4 rounded-xl border p-6 text-left shadow-sm">
						<div className="flex items-center justify-between">
							<span className="text-muted-foreground text-sm font-medium">
								Profile Completion
							</span>
							<Badge
								variant="secondary"
								className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
							>
								{createdStudent?.completion}% Complete
							</Badge>
						</div>
						<div className="bg-muted h-2 w-full rounded-full">
							<div
								className="h-2 rounded-full bg-amber-500 transition-all duration-1000"
								style={{ width: `${createdStudent?.completion}%` }}
							/>
						</div>

						<div className="flex gap-3 rounded-lg border border-amber-100 bg-amber-50/50 p-4 dark:border-amber-900/30 dark:bg-amber-900/10">
							<AlertCircle className="h-5 w-5 shrink-0 text-amber-600" />
							<div>
								<p className="text-sm font-semibold text-amber-900 dark:text-amber-200">
									Action Required
								</p>
								<p className="text-sm text-amber-700/80 dark:text-amber-400/80">
									Complete the full profile within 7 days to finalize records.
								</p>
							</div>
						</div>
					</div>

					<div className="flex flex-col justify-center gap-3 sm:flex-row">
						<Button
							onClick={() => setStep("form")}
							variant="outline"
							className="h-11 gap-2"
						>
							<UserPlus className="h-4 w-4" />
							New Admission
						</Button>
						<Button className="bg-primary hover:bg-primary/90 h-11 gap-2">
							Go to Profile
							<ArrowRight className="h-4 w-4" />
						</Button>
					</div>
				</CardContent>
			</Card>
		);
	}

	return (
		<div className="mx-auto w-full max-w-5xl">
			<Card className="gap-0 overflow-hidden border-0 py-0 shadow-xl ring-1 ring-black/5 dark:ring-white/10">
				<CardHeader className="bg-muted/30 space-y-1 border-b py-6 text-center">
					<div className="bg-primary text-primary-foreground shadow-primary/20 mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl shadow-lg">
						<UserPlus className="h-7 w-7" />
					</div>
					<CardTitle className="text-2xl font-bold">{t("title")}</CardTitle>
					<CardDescription>{t("description")}</CardDescription>
				</CardHeader>

				<CardContent className="py-6">
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						<div className="space-y-10">
							{categories.map((category) => {
								const fieldsInCategory = admissionFields.filter(
									(f) => f.category === category
								);
								if (fieldsInCategory.length === 0) return null;

								return (
									<div key={category} className="space-y-5">
										<div className="flex items-center gap-3 border-b pb-2">
											<div className="bg-primary/10 text-primary flex h-8 w-8 items-center justify-center rounded-lg">
												{category === "student_info" && (
													<FileText className="h-4 w-4" />
												)}
												{category === "academic_info" && (
													<CheckCircle2 className="h-4 w-4" />
												)}
												{category === "parent_info" && (
													<UserPlus className="h-4 w-4" />
												)}
												{category === "payment" && (
													<CreditCard className="h-4 w-4" />
												)}
												{category === "health_info" && (
													<AlertCircle className="h-4 w-4" />
												)}
												{category === "documents" && (
													<Database className="h-4 w-4" />
												)}
											</div>
											<h3 className="text-foreground text-sm font-bold tracking-tight uppercase">
												{tc(category)}
											</h3>
										</div>

										<div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
											{fieldsInCategory.map((field) => {
												// Define options for specific select fields
												let options = undefined;
												if (field.id === "gender") {
													options = [
														{ label: "Male", value: "male" },
														{ label: "Female", value: "female" },
														{ label: "Other", value: "other" },
													];
												} else if (field.id === "admissionType") {
													options = [
														{ label: "New Admission", value: "new" },
														{ label: "Transfer", value: "transfer" },
													];
												}

												let inputType: string = field.type === "file" ? "text" : field.type;
												if (field.id === "class") inputType = "classSelect";
												if (field.id === "section") inputType = "sectionSelect";
												if (field.id === "session") inputType = "sessionSelect";

												const shouldSpanFull =
													field.id.toLowerCase().includes("address") ||
													field.id === "previousSchool" ||
													field.id === "conditions" ||
													field.id === "guardianDetails" ||
													field.type === "file";

												return (
													<div
														key={field.id}
														className={cn(
															"col-span-1",
															shouldSpanFull && "sm:col-span-2"
														)}
													>
														<InputField
															control={form.control}
															name={field.id}
															label={field.label}
															type={inputType} // Handled custom types
															placeholder={
																field.type === "select"
																	? `Select ${field.label}`
																	: `Enter ${field.label}`
															}
															required={field.isFixed}
															options={options}
															dependencyId={field.id === "section" ? selectedClassId : undefined}
														/>
													</div>
												);
											})}
										</div>
									</div>
								);
							})}
						</div>

						<div className="border-primary/10 bg-primary/5 flex gap-3 rounded-xl border p-4">
							<Info className="text-primary h-5 w-5 shrink-0" />
							<p className="text-primary/80 text-xs leading-relaxed">
								<strong>{t("fastEnrollmentMode")}</strong> {t("fastEnrollmentDesc")}
							</p>
						</div>

						<Button
							type="submit"
							disabled={loading}
							className="shadow-primary/20 h-12 w-full text-base font-semibold shadow-lg"
						>
							{loading ? (
								<>
									<Loader2 className="mr-2 h-5 w-5 animate-spin" />
									{t("processingAdmission")}
								</>
							) : (
								<>
									{t("completeAdmission")}
									<ArrowRight className="ml-2 h-5 w-5" />
								</>
							)}
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
