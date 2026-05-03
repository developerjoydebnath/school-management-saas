import { z } from "zod";

export const classSchema = z.object({
	name: z.string().min(1, { message: "Class name is required" }),
	sections: z.array(z.string()).optional(),
	capacity: z
		.number({ error: "Capacity must be a number" })
		.min(1, { message: "Capacity must be at least 1" }),
	roomNumber: z.string().min(1, { message: "Room number is required" }),
	status: z.enum(["Active", "Inactive"]),
});

export type ClassFormValues = z.infer<typeof classSchema>;
