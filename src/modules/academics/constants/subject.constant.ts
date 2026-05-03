export const SUBJECT_FORM_FIELDS = [
  {
    name: "name",
    label: "Subject Name",
    placeholder: "e.g. Bangla 1st Paper",
    type: "text",
  },
  {
    name: "code",
    label: "Subject Code",
    placeholder: "e.g. 101",
    type: "text",
  },
  {
    name: "type",
    label: "Subject Type",
    placeholder: "Select Type",
    type: "select",
    options: [
      { label: "Mandatory", value: "Mandatory" },
      { label: "Optional", value: "Optional" },
      { label: "Practical", value: "Practical" },
    ],
  },
  {
    name: "status",
    label: "Status",
    placeholder: "Select Status",
    type: "select",
    options: [
      { label: "Active", value: "Active" },
      { label: "Inactive", value: "Inactive" },
    ],
  },
];
