import { z } from "zod";

export const customFieldSchema = z.object({
	label: z.string().min(1, "Label is required"),
	category: z.enum([
		"student_info",
		"parent_info",
		"address",
		"academic_info",
		"documents",
		"health_info",
		"payment",
	]),
	type: z.enum(["text", "number", "date", "select", "file"]),
	isStep1: z.boolean(),
});

export type CustomFieldFormValues = z.infer<typeof customFieldSchema>;
