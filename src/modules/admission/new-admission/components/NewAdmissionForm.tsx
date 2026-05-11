"use client";

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
import { ArrowRight, Info, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { ADMISSION_FIELDS } from "../../admission-settings/constants/admission-fields";
import { useAdmissionSettingsStore } from "../../admission-settings/stores/admission-settings-store";
import AdmissionFormSection from "./AdmissionFormSection";
import AdmissionPreview from "./AdmissionPreview";
import AdmissionStepper from "./AdmissionStepper";
import AdmissionSuccessView from "./AdmissionSuccessView";

// Extracted impure logic outside the component to satisfy purity rules
const generateStudentId = () => `STU${Math.floor(1000 + Math.random() * 9000)}`;

export default function NewAdmissionForm({ onSuccess }: { onSuccess: () => void }) {
	const [loading, setLoading] = useState(false);
	const [step, setStep] = useState<"form" | "success">("form");
	const [createdStudent, setCreatedStudent] = useState<any>(null);

	const t = useTranslations("AdmissionNew");

	const { admissionMode, fieldVisibility, fieldRequired, customFields } =
		useAdmissionSettingsStore();

	const allFields = useMemo(() => {
		return [...ADMISSION_FIELDS, ...customFields];
	}, [customFields]);

	const admissionFields = useMemo(() => {
		return allFields.filter((f) => fieldVisibility[f.id] !== false);
	}, [allFields, fieldVisibility]);

	const categories = useMemo(() => {
		const cats = Array.from(new Set(admissionFields.map((f) => f.category)));
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

	const [currentStepIndex, setCurrentStepIndex] = useState(0);

	// Generate dynamic schema and default values
	const { schema, defaultValues } = useMemo(() => {
		const shape: Record<string, any> = {};
		const defaults: Record<string, string> = {};

		admissionFields.forEach((field) => {
			let fieldSchema: any;
			const isReq = fieldRequired[field.id];

			if (field.type === "number") {
				fieldSchema = z.union([z.string(), z.number()]);
				if (isReq) {
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
				if (isReq) {
					fieldSchema = z.string().min(1, `${field.label} is required`);
				} else {
					fieldSchema = z.string().optional().or(z.literal(""));
				}
			}

			shape[field.id] = fieldSchema;
			defaults[field.id] = "";
		});

		return {
			schema: z.object(shape),
			defaultValues: defaults,
		};
	}, [admissionFields, fieldRequired]);

	const form = useForm({
		resolver: zodResolver(schema),
		defaultValues,
		mode: "onChange",
	});

	const selectedClassId = form.watch("class") as string | undefined;

	const handleNext = async () => {
		const fieldsInCurrentStep = admissionFields
			.filter((f) => f.category === categories[currentStepIndex])
			.map((f) => f.id);
		const isValid = await form.trigger(fieldsInCurrentStep as any);
		if (isValid) {
			setCurrentStepIndex((prev) => prev + 1);
			window.scrollTo({ top: 0, behavior: "smooth" });
		}
	};

	const handlePrev = () => {
		setCurrentStepIndex((prev) => prev - 1);
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	const onSubmit = useCallback(
		async (values: any) => {
			setLoading(true);
			try {
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

				const response = await axios.post("/admissions", payload);

				setCreatedStudent({
					id: response.data.id || generateStudentId(),
					name: values.fullName,
					class: values.class,
					completion: admissionMode === "full" ? 100 : 42,
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
		[allFields, onSuccess, admissionMode]
	);

	if (step === "success" && createdStudent) {
		return (
			<AdmissionSuccessView
				student={createdStudent}
				onReset={() => {
					setStep("form");
					setCurrentStepIndex(0);
					form.reset();
				}}
			/>
		);
	}

	const isPreviewStep = admissionMode === "full" && currentStepIndex === categories.length;

	return (
		<div className="mx-auto w-full max-w-5xl">
			<Card className="gap-0 overflow-hidden border-0 py-0 shadow-none">
				<CardHeader className="bg-background space-y-1 border-b py-6 text-center">
					<CardTitle className="text-2xl font-bold">{t("formTitle")}</CardTitle>
					<CardDescription>{t("formDescription")}</CardDescription>
				</CardHeader>

				<CardContent className="py-6">
					{admissionMode === "full" && (
						<AdmissionStepper
							categories={categories}
							currentStepIndex={currentStepIndex}
							isPreviewStep={isPreviewStep}
						/>
					)}

					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						<div className="space-y-10">
							{admissionMode === "fast" ? (
								categories.map((category) => (
									<AdmissionFormSection
										key={category}
										category={category}
										admissionFields={admissionFields}
										fieldRequired={fieldRequired}
										control={form.control}
										admissionMode={admissionMode}
										selectedClassId={selectedClassId}
									/>
								))
							) : isPreviewStep ? (
								<AdmissionPreview
									fields={admissionFields}
									values={form.getValues()}
								/>
							) : (
								<AdmissionFormSection
									category={categories[currentStepIndex]}
									admissionFields={admissionFields}
									fieldRequired={fieldRequired}
									control={form.control}
									admissionMode={admissionMode}
									selectedClassId={selectedClassId}
								/>
							)}
						</div>

						{admissionMode === "fast" && (
							<div className="border-primary/10 bg-primary/5 flex gap-3 rounded-xl border p-4">
								<Info className="text-primary h-5 w-5 shrink-0" />
								<p className="text-primary/80 text-xs leading-relaxed">
									<strong>{t("fastEnrollmentMode")}</strong>{" "}
									{t("fastEnrollmentDesc")}
								</p>
							</div>
						)}

						<div className="flex flex-col gap-4 sm:flex-row">
							{admissionMode === "full" && currentStepIndex > 0 && (
								<Button
									type="button"
									variant="outline"
									onClick={handlePrev}
									className="h-12 flex-1 text-base font-semibold"
								>
									Previous
								</Button>
							)}
							{admissionMode === "full" && !isPreviewStep ? (
								<Button
									type="button"
									onClick={handleNext}
									className="h-12 flex-1 text-base font-semibold"
								>
									Next Step
									<ArrowRight className="ml-2 h-5 w-5" />
								</Button>
							) : (
								<Button
									type="submit"
									disabled={loading}
									className={cn(
										"h-12 flex-1 text-base font-semibold",
										admissionMode === "full"
											? "bg-green-600 hover:bg-green-700"
											: ""
									)}
								>
									{loading ? (
										<>
											<Loader2 className="mr-2 h-5 w-5 animate-spin" />
											{t("processingAdmission")}
										</>
									) : admissionMode === "full" ? (
										"Complete Admission"
									) : (
										<>
											{t("completeAdmission")}
											<ArrowRight className="ml-2 h-5 w-5" />
										</>
									)}
								</Button>
							)}
							{isPreviewStep && (
								<Button
									type="button"
									variant="destructive"
									onClick={() => {
										form.reset();
										setCurrentStepIndex(0);
									}}
									className="h-12 w-full text-base font-semibold"
								>
									Cancel Admission
								</Button>
							)}
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
