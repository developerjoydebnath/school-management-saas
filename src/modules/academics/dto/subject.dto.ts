import { StatusEnum, SubjectTypeEnum } from "@/shared/types/enums";
import { z } from "zod";

export const subjectSchema = z.object({
	name: z.string().min(1, { message: "Subject name is required" }),
	code: z.string().optional(),
	type: z.enum(SubjectTypeEnum),
	status: z.enum(StatusEnum),
});

export type SubjectFormValues = z.infer<typeof subjectSchema>;
