"use client";

import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/shared/components/ui/select";
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
import React, { useMemo, useState } from "react";
import { toast } from "sonner";
import { ADMISSION_FIELDS } from "../../shared/constants/admission-fields";
import { useAdmissionSettingsStore } from "../../shared/stores/admission-settings-store";

export default function NewAdmissionForm({ onSuccess }: { onSuccess: () => void }) {
	const [loading, setLoading] = useState(false);
	const [step, setStep] = useState<"form" | "success">("form");
	const [createdStudent, setCreatedStudent] = useState<any>(null);

	const { fieldSettings, customFields } = useAdmissionSettingsStore();

	const allFields = useMemo(() => {
		return [...ADMISSION_FIELDS, ...customFields];
	}, [customFields]);

	const categories = useMemo(() => {
		return Array.from(new Set(allFields.map((f) => f.category)));
	}, [allFields]);

	const admissionFields = useMemo(() => {
		return allFields.filter((f) => fieldSettings[f.id]);
	}, [allFields, fieldSettings]);

	const [formData, setFormData] = useState<Record<string, string>>(() => {
		const initial: Record<string, string> = {};
		admissionFields.forEach((f) => {
			initial[f.id] = "";
		});
		return initial;
	});

	const handleChange = (id: string, value: string) => {
		setFormData((prev) => ({ ...prev, [id]: value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		try {
			// Split data into fixed and custom (JSON)
			const fixedData: Record<string, any> = {};
			const customData: Record<string, any> = {};

			Object.entries(formData).forEach(([key, value]) => {
				const field = allFields.find((f) => f.id === key);
				if (field?.isCustom) {
					customData[key] = value;
				} else {
					fixedData[key] = value;
				}
			});

			const payload = {
				...fixedData,
				customData: JSON.stringify(customData), // Saved as JSON string
				status: "Pending",
				date: new Date().toISOString(),
			};

			console.log("Submitting Admission Payload:", payload);

			// Mock API call
			await new Promise((resolve) => setTimeout(resolve, 1500));

			const studentId = `STU${Math.floor(1000 + Math.random() * 9000)}`;
			setCreatedStudent({
				id: studentId,
				name: formData.fullName,
				class: formData.class,
				completion: 42,
			});

			setStep("success");
			toast.success("Student admission successful!");
		} catch (err) {
			console.error("Error creating admission:", err);
			toast.error("Failed to process admission. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	if (step === "success" && createdStudent) {
		return (
			<Card className="overflow-hidden border-green-100 bg-green-50/30">
				<div className="h-2 bg-green-500" />
				<CardContent className="pt-8 pb-10 text-center">
					<div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
						<CheckCircle2 className="h-8 w-8 text-green-600" />
					</div>
					<h2 className="mb-2 text-2xl font-bold text-green-900">
						Admission Successful!
					</h2>
					<p className="mx-auto mb-8 max-w-md text-green-700">
						Student <strong>{createdStudent.name}</strong> has been admitted to{" "}
						<strong>{createdStudent.class}</strong>. Student ID:{" "}
						<code className="rounded bg-green-100 px-2 py-1 font-mono text-green-800">
							{createdStudent.id}
						</code>
					</p>

					<div className="mx-auto mb-8 max-w-lg rounded-xl border border-green-200 bg-white p-6 text-left shadow-sm">
						<div className="mb-4 flex items-center justify-between">
							<span className="text-sm font-medium text-gray-600">
								Profile Completion
							</span>
							<Badge
								variant="outline"
								className="border-amber-200 bg-amber-50 text-amber-700"
							>
								{createdStudent.completion}% Complete
							</Badge>
						</div>
						<div className="mb-6 h-2 w-full rounded-full bg-gray-100">
							<div
								className="h-2 rounded-full bg-amber-500 transition-all duration-1000"
								style={{ width: `${createdStudent.completion}%` }}
							/>
						</div>

						<div className="mb-6 flex gap-3 rounded-lg border border-amber-100 bg-amber-50 p-4">
							<AlertCircle className="h-5 w-5 shrink-0 text-amber-600" />
							<div>
								<p className="text-sm font-semibold text-amber-900">
									Action Required
								</p>
								<p className="text-sm text-amber-700">
									Complete the full profile within 7 days to finalize records.
								</p>
							</div>
						</div>

						<div className="space-y-3">
							<p className="text-xs font-bold tracking-wider text-gray-400 uppercase">
								Missing Documents/Info
							</p>
							<ul className="space-y-2">
								{[
									"Mother's Details",
									"Permanent Address",
									"Birth Certificate Scan",
									"Medical Records",
								].map((item, i) => (
									<li
										key={i}
										className="flex items-center gap-2 text-sm text-gray-600"
									>
										<div className="h-1.5 w-1.5 rounded-full bg-gray-300" />
										{item}
									</li>
								))}
							</ul>
						</div>
					</div>

					<div className="flex flex-col justify-center gap-3 sm:flex-row">
						<Button onClick={() => setStep("form")} variant="outline" className="gap-2">
							<UserPlus className="h-4 w-4" />
							New Admission
						</Button>
						<Button className="gap-2 bg-green-600 hover:bg-green-700">
							Go to Profile
							<ArrowRight className="h-4 w-4" />
						</Button>
					</div>
				</CardContent>
			</Card>
		);
	}

	return (
		<form onSubmit={handleSubmit} className="w-full space-y-6">
			<Card className="overflow-hidden border-blue-100 shadow-lg shadow-blue-500/5">
				<CardHeader className="bg-blue-600 pb-8 text-white">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-3">
							<div className="rounded-lg bg-white/20 p-2 backdrop-blur-md">
								<UserPlus className="h-6 w-6 text-white" />
							</div>
							<div>
								<CardTitle className="text-xl">Fast Admission Form</CardTitle>
								<CardDescription className="text-blue-100">
									Quick enrollment for new students
								</CardDescription>
							</div>
						</div>
						<div className="hidden items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 backdrop-blur-md md:flex">
							<Database className="h-3 w-3 text-blue-200" />
							<span className="text-[10px] font-medium tracking-wider uppercase">
								Session 2024-25
							</span>
						</div>
					</div>
				</CardHeader>
				<CardContent className="bg-white pt-8">
					<div className="grid grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-2">
						{categories.map((category) => {
							const fieldsInCategory = admissionFields.filter(
								(f) => f.category === category
							);
							if (fieldsInCategory.length === 0) return null;

							return (
								<div key={category} className="space-y-6">
									<div className="flex items-center gap-2 border-b border-gray-100 pb-2">
										<div className="rounded-md bg-blue-50 p-1.5">
											{category === "student_info" && (
												<FileText className="h-4 w-4 text-blue-600" />
											)}
											{category === "academic_info" && (
												<CheckCircle2 className="h-4 w-4 text-blue-600" />
											)}
											{category === "parent_info" && (
												<UserPlus className="h-4 w-4 text-blue-600" />
											)}
											{category === "payment" && (
												<CreditCard className="h-4 w-4 text-blue-600" />
											)}
											{category === "health_info" && (
												<AlertCircle className="h-4 w-4 text-blue-600" />
											)}
											{category === "documents" && (
												<Database className="h-4 w-4 text-blue-600" />
											)}
										</div>
										<h3 className="text-sm font-bold tracking-tight text-gray-900 uppercase">
											{category.replace("_", " ")}
										</h3>
									</div>

									<div className="space-y-5">
										{fieldsInCategory.map((field) => (
											<div key={field.id} className="group space-y-2">
												<div className="flex items-center justify-between">
													<Label
														htmlFor={field.id}
														className="text-gray-700 transition-colors group-focus-within:text-blue-600"
													>
														{field.label}
														{field.isFixed && (
															<span className="ml-1 text-red-500">
																*
															</span>
														)}
													</Label>
													{field.isCustom && (
														<Badge
															variant="outline"
															className="h-3.5 border-blue-100 px-1 py-0 text-[9px] text-blue-500"
														>
															JSON
														</Badge>
													)}
												</div>

												{field.type === "select" ? (
													<Select
														onValueChange={(v) =>
															handleChange(field.id, v)
														}
													>
														<SelectTrigger className="border-gray-200 transition-all focus:border-blue-500 focus:ring-blue-500/20">
															<SelectValue
																placeholder={`Select ${field.label}`}
															/>
														</SelectTrigger>
														<SelectContent>
															{field.id === "gender" && (
																<>
																	<SelectItem value="male">
																		Male
																	</SelectItem>
																	<SelectItem value="female">
																		Female
																	</SelectItem>
																</>
															)}
															{field.id === "admissionType" && (
																<>
																	<SelectItem value="new">
																		New
																	</SelectItem>
																	<SelectItem value="transfer">
																		Transfer
																	</SelectItem>
																</>
															)}
															{field.id === "class" && (
																<>
																	<SelectItem value="Class 1">
																		Class 1
																	</SelectItem>
																	<SelectItem value="Class 2">
																		Class 2
																	</SelectItem>
																	<SelectItem value="Class 3">
																		Class 3
																	</SelectItem>
																</>
															)}
															{/* Fallback for other selects */}
															{![
																"gender",
																"admissionType",
																"class",
															].includes(field.id) && (
																<SelectItem value="placeholder">
																	No options configured
																</SelectItem>
															)}
														</SelectContent>
													</Select>
												) : (
													<Input
														id={field.id}
														type={field.type}
														placeholder={`Enter ${field.label.toLowerCase()}`}
														required={field.isFixed}
														value={formData[field.id] || ""}
														onChange={(e) =>
															handleChange(field.id, e.target.value)
														}
														className="border-gray-200 transition-all placeholder:text-gray-300 focus:border-blue-500 focus:ring-blue-500/20"
													/>
												)}
											</div>
										))}
									</div>
								</div>
							);
						})}
					</div>

					<div className="mt-12 flex items-start gap-4 rounded-xl border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 p-5">
						<div className="rounded-full bg-white p-2 shadow-sm">
							<Info className="h-5 w-5 text-blue-600" />
						</div>
						<div className="space-y-1">
							<p className="text-sm font-semibold text-blue-900 italic">
								Fast Enrollment Mode
							</p>
							<p className="text-xs leading-relaxed text-blue-700/80">
								Only mandatory and custom admission fields are displayed. Additional
								profile data (Address, Mother&apos;s Info, Health, etc.) can be
								completed within 7 days from the <strong>Student Directory</strong>.
							</p>
						</div>
					</div>
				</CardContent>
				<div className="flex items-center justify-between border-t bg-gray-50 px-8 py-6">
					<p className="text-muted-foreground flex items-center gap-2 text-xs">
						<Database className="h-3.5 w-3.5" />
						Values for custom fields will be stored as JSON.
					</p>
					<Button
						type="submit"
						disabled={loading}
						className="h-12 bg-blue-600 px-10 shadow-xl shadow-blue-600/20 transition-all hover:bg-blue-700 active:scale-95"
					>
						{loading ? (
							<>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								Processing Admission...
							</>
						) : (
							<span className="flex items-center gap-2 text-base font-semibold">
								Complete Admission
								<ArrowRight className="h-5 w-5" />
							</span>
						)}
					</Button>
				</div>
			</Card>
		</form>
	);
}
