import { z } from "zod";

export const sessionSchema = z.object({
	name: z.string().min(1, "Session name is required"),
	status: z.enum(["ACTIVE", "INACTIVE"]).default("ACTIVE"),
});

export type SessionFormValues = z.infer<typeof sessionSchema>;

export interface Session extends SessionFormValues {
	id: string;
}
