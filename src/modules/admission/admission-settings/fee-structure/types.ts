export type FeeType = "One-time" | "Monthly" | "Yearly";

export interface FeeHead {
	id: string;
	name: string;
	type: FeeType;
	amount: number;
	isShown: boolean;
	isRequired: boolean;
	isSystem: boolean;
}

export const DEMO_FEES: FeeHead[] = [
	{
		id: "f1",
		name: "Admission Fee",
		type: "One-time",
		amount: 500,
		isShown: true,
		isRequired: true,
		isSystem: true,
	},
	{
		id: "f2",
		name: "Registration Fee",
		type: "One-time",
		amount: 300,
		isShown: true,
		isRequired: false,
		isSystem: true,
	},
	{
		id: "f3",
		name: "Session Fee",
		type: "Yearly",
		amount: 1200,
		isShown: true,
		isRequired: false,
		isSystem: true,
	},
	{
		id: "f4",
		name: "ID Card Fee",
		type: "One-time",
		amount: 150,
		isShown: true,
		isRequired: false,
		isSystem: false,
	},
	{
		id: "f5",
		name: "Library Security Fee",
		type: "One-time",
		amount: 200,
		isShown: false,
		isRequired: false,
		isSystem: false,
	},
];
