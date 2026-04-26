import { 
  Building2, 
  BookOpen, 
  GraduationCap, 
  Users, 
  Banknote, 
  Library, 
  Settings, 
  LayoutDashboard,
  Megaphone,
  AlarmClockCheck,
  UserCheck,
  FileBadge2,
} from "lucide-react";

export type SidebarMenuType = {
  id: string;
  name: string;
  path: string;
  icon: React.ElementType;
  permissions: string[];
  matchPaths: string[];
  resetStore?: () => void;
  children?: SidebarMenuType[];
}

export const SidebarMenu: SidebarMenuType[] = [
  {
    id: 'dashboard',
    name: 'Dashboard',
    path: '/dashboard',
    icon: LayoutDashboard,
    permissions: ['dashboard.view'],
    matchPaths: ['/dashboard'],
  },
  {
    id: 'academics',
    name: 'Academics',
    path: '/dashboard/academics',
    icon: BookOpen,
    permissions: ['academics.view'],
    matchPaths: ['/dashboard/academics'],
    children: [
      {
        id: 'academics_classes',
        name: 'Classes & Sections',
        path: '/dashboard/academics/classes',
        icon: Building2,
        permissions: ['academics.classes.view'],
        matchPaths: ['/dashboard/academics/classes'],
      },
      {
        id: 'academics_subjects',
        name: 'Subjects',
        path: '/dashboard/academics/subjects',
        icon: BookOpen,
        permissions: ['academics.subjects.view'],
        matchPaths: ['/dashboard/academics/subjects'],
      },
      {
        id: 'academics_syllabus',
        name: 'Syllabus',
        path: '/dashboard/academics/syllabus',
        icon: FileBadge2,
        permissions: ['academics.syllabus.view'],
        matchPaths: ['/dashboard/academics/syllabus'],
      },
      {
        id: 'academics_timetable',
        name: 'Class Timetable',
        path: '/dashboard/academics/timetable',
        icon: AlarmClockCheck,
        permissions: ['academics.timetable.view'],
        matchPaths: ['/dashboard/academics/timetable'],
      },
    ]
  },
  {
    id: 'students',
    name: 'Students',
    path: '/dashboard/students',
    icon: GraduationCap,
    permissions: ['students.view'],
    matchPaths: ['/dashboard/students'],
    children: [
      {
        id: 'students_admission',
        name: 'Admissions',
        path: '/dashboard/students/admission',
        icon: GraduationCap,
        permissions: ['students.admission.view'],
        matchPaths: ['/dashboard/students/admission'],
      },
      {
        id: 'students_directory',
        name: 'Student Directory',
        path: '/dashboard/students/directory',
        icon: Users,
        permissions: ['students.directory.view'],
        matchPaths: ['/dashboard/students/directory'],
      },
      {
        id: 'students_attendance',
        name: 'Attendance',
        path: '/dashboard/students/attendance',
        icon: UserCheck,
        permissions: ['students.attendance.view'],
        matchPaths: ['/dashboard/students/attendance'],
      },
    ]
  },
  {
    id: 'staff',
    name: 'Staff & Teachers',
    path: '/dashboard/staff',
    icon: Users,
    permissions: ['staff.view'],
    matchPaths: ['/dashboard/staff'],
    children: [
      {
        id: 'staff_directory',
        name: 'Staff Directory',
        path: '/dashboard/staff/directory',
        icon: Users,
        permissions: ['staff.directory.view'],
        matchPaths: ['/dashboard/staff/directory'],
      },
      {
        id: 'staff_attendance',
        name: 'Staff Attendance',
        path: '/dashboard/staff/attendance',
        icon: UserCheck,
        permissions: ['staff.attendance.view'],
        matchPaths: ['/dashboard/staff/attendance'],
      },
    ]
  },
  {
    id: 'finance',
    name: 'Finance',
    path: '/dashboard/finance',
    icon: Banknote,
    permissions: ['finance.view'],
    matchPaths: ['/dashboard/finance'],
    children: [
      {
        id: 'finance_fees',
        name: 'Fee Collection',
        path: '/dashboard/finance/fees',
        icon: Banknote,
        permissions: ['finance.fees.view'],
        matchPaths: ['/dashboard/finance/fees'],
      },
      {
        id: 'finance_expenses',
        name: 'Expenses',
        path: '/dashboard/finance/expenses',
        icon: Banknote,
        permissions: ['finance.expenses.view'],
        matchPaths: ['/dashboard/finance/expenses'],
      },
      {
        id: 'finance_payroll',
        name: 'Payroll',
        path: '/dashboard/finance/payroll',
        icon: Banknote,
        permissions: ['finance.payroll.view'],
        matchPaths: ['/dashboard/finance/payroll'],
      },
    ]
  },
  {
    id: 'library',
    name: 'Library',
    path: '/dashboard/library',
    icon: Library,
    permissions: ['library.view'],
    matchPaths: ['/dashboard/library'],
  },
  {
    id: 'communications',
    name: 'Communications',
    path: '/dashboard/communications',
    icon: Megaphone,
    permissions: ['communications.view'],
    matchPaths: ['/dashboard/communications'],
  },
  {
    id: 'settings',
    name: 'Settings',
    path: '/dashboard/settings',
    icon: Settings,
    permissions: ['settings.view'],
    matchPaths: ['/dashboard/settings'],
  },
];