export const ADMISSION_FIELD_CATEGORIES = [
	{ label: "Student Info", value: "student_info" },
	{ label: "Parent Info", value: "parent_info" },
	{ label: "Address", value: "address" },
	{ label: "Academic Info", value: "academic_info" },
	{ label: "Documents", value: "documents" },
	{ label: "Health Info", value: "health_info" },
	{ label: "Payment", value: "payment" },
];

export const ADMISSION_FIELD_TYPES = [
	{ label: "Text", value: "text" },
	{ label: "Number", value: "number" },
	{ label: "Date", value: "date" },
	{ label: "Dropdown", value: "select" },
	{ label: "File Upload", value: "file" },
];

export const ADD_CUSTOM_FIELD_FORM_FIELDS = [
	{
		name: "label",
		label: "Field Label",
		placeholder: "e.g. Passport Number",
		type: "text",
		required: true,
	},
	{
		name: "category",
		label: "Category",
		type: "select",
		placeholder: "Select Category",
		options: ADMISSION_FIELD_CATEGORIES,
		required: true,
	},
	{
		name: "type",
		label: "Input Type",
		type: "select",
		placeholder: "Select Input Type",
		options: ADMISSION_FIELD_TYPES,
		required: true,
	},
	{
		name: "isStep1",
		label: "Show in initial Admission Form",
		type: "switch",
		required: false,
	},
];
