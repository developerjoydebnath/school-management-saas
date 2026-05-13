"use client";

import { Badge } from "@/shared/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/shared/components/ui/chart";
import { Progress } from "@/shared/components/ui/progress";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/shared/components/ui/table";
import {
	Activity,
	Award,
	BookOpen,
	Bus,
	Calendar,
	CreditCard,
	GraduationCap,
	Heart,
	Library,
	MapPin,
	Phone,
	Shield,
	TrendingUp,
	User,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

interface ProfileOverviewTabProps {
	student: any;
}

// --- Demo Data ---
const performanceTrend = [
	{ month: "Jul", score: 78 },
	{ month: "Aug", score: 80 },
	{ month: "Sep", score: 82 },
	{ month: "Oct", score: 79 },
	{ month: "Nov", score: 85 },
	{ month: "Dec", score: 83 },
	{ month: "Jan", score: 87 },
	{ month: "Feb", score: 86 },
	{ month: "Mar", score: 89 },
	{ month: "Apr", score: 92 },
];

const subjectPerformance = [
	{ subject: "Bangla", score: 90, color: "hsl(200, 80%, 50%)" },
	{ subject: "English", score: 85, color: "hsl(142, 76%, 36%)" },
	{ subject: "Mathematics", score: 92, color: "hsl(262, 83%, 58%)" },
	{ subject: "Science", score: 88, color: "hsl(24, 95%, 53%)" },
	{ subject: "Social Science", score: 84, color: "hsl(340, 82%, 52%)" },
	{ subject: "Religion", score: 91, color: "hsl(45, 93%, 47%)" },
	{ subject: "ICT", score: 78, color: "hsl(180, 70%, 45%)" },
];

const upcomingEvents = [
	{ title: "Mathematics Exam", date: "May 18, 2026", type: "Exam" },
	{ title: "Science Project Due", date: "May 22, 2026", type: "Assignment" },
	{ title: "Parent-Teacher Meeting", date: "May 25, 2026", type: "Meeting" },
	{ title: "Annual Sports Day", date: "Jun 02, 2026", type: "Event" },
];

const recentActivity = [
	{ title: "Submitted Science Homework", date: "May 12, 2026", type: "success" },
	{ title: "Absent — Fever", date: "Apr 22, 2026", type: "warning" },
	{ title: "Scored A+ in Math Exam", date: "Apr 15, 2026", type: "success" },
	{ title: "Fee Payment — ৳3,000", date: "Apr 10, 2026", type: "info" },
	{ title: "Library Book Issued", date: "Apr 05, 2026", type: "info" },
	{ title: "Late to class", date: "Mar 28, 2026", type: "warning" },
];

const libraryBooks = [
	{ title: "Introduction to Physics", issueDate: "Apr 05, 2026", dueDate: "May 05, 2026", status: "Issued" },
	{ title: "Bangla Sahitya Vol. 2", issueDate: "Mar 15, 2026", dueDate: "Apr 15, 2026", status: "Returned" },
];

const areaConfig = {
	score: { label: "Score", color: "hsl(200, 80%, 50%)" },
} satisfies ChartConfig;

const activityColors: Record<string, string> = {
	success: "bg-green-500",
	warning: "bg-yellow-500",
	info: "bg-blue-500",
};

const eventColors: Record<string, string> = {
	Exam: "bg-red-500/10 text-red-700",
	Assignment: "bg-orange-500/10 text-orange-700",
	Meeting: "bg-blue-500/10 text-blue-700",
	Event: "bg-purple-500/10 text-purple-700",
};

export default function ProfileOverviewTab({ student }: ProfileOverviewTabProps) {
	const t = useTranslations("StudentProfile");

	return (
		<div className="space-y-6">
			{/* Quick Stats Row */}
			<div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
				<Card className="border-none bg-primary/5 shadow-sm">
					<CardContent className="flex flex-col items-center justify-center p-4 text-center">
						<div className="mb-1.5 rounded-full bg-primary/10 p-2 text-primary">
							<Calendar className="h-4 w-4" />
						</div>
						<p className="text-[10px] text-muted-foreground">{t("attendanceStat")}</p>
						<h3 className="text-lg font-bold">87%</h3>
					</CardContent>
				</Card>
				<Card className="border-none bg-green-500/5 shadow-sm">
					<CardContent className="flex flex-col items-center justify-center p-4 text-center">
						<div className="mb-1.5 rounded-full bg-green-500/10 p-2 text-green-600">
							<Award className="h-4 w-4" />
						</div>
						<p className="text-[10px] text-muted-foreground">{t("averageGrade")}</p>
						<h3 className="text-lg font-bold text-green-700">A</h3>
					</CardContent>
				</Card>
				<Card className="border-none bg-orange-500/5 shadow-sm">
					<CardContent className="flex flex-col items-center justify-center p-4 text-center">
						<div className="mb-1.5 rounded-full bg-orange-500/10 p-2 text-orange-600">
							<CreditCard className="h-4 w-4" />
						</div>
						<p className="text-[10px] text-muted-foreground">{t("totalDues")}</p>
						<h3 className="text-lg font-bold text-orange-700">৳5,500</h3>
					</CardContent>
				</Card>
				<Card className="border-none bg-blue-500/5 shadow-sm">
					<CardContent className="flex flex-col items-center justify-center p-4 text-center">
						<div className="mb-1.5 rounded-full bg-blue-500/10 p-2 text-blue-600">
							<BookOpen className="h-4 w-4" />
						</div>
						<p className="text-[10px] text-muted-foreground">{t("assignments")}</p>
						<h3 className="text-lg font-bold text-blue-700">42/50</h3>
					</CardContent>
				</Card>
				<Card className="border-none bg-purple-500/5 shadow-sm">
					<CardContent className="flex flex-col items-center justify-center p-4 text-center">
						<div className="mb-1.5 rounded-full bg-purple-500/10 p-2 text-purple-600">
							<TrendingUp className="h-4 w-4" />
						</div>
						<p className="text-[10px] text-muted-foreground">Class Rank</p>
						<h3 className="text-lg font-bold text-purple-700">2nd</h3>
					</CardContent>
				</Card>
				<Card className="border-none bg-pink-500/5 shadow-sm">
					<CardContent className="flex flex-col items-center justify-center p-4 text-center">
						<div className="mb-1.5 rounded-full bg-pink-500/10 p-2 text-pink-600">
							<GraduationCap className="h-4 w-4" />
						</div>
						<p className="text-[10px] text-muted-foreground">GPA</p>
						<h3 className="text-lg font-bold text-pink-700">3.85</h3>
					</CardContent>
				</Card>
			</div>

			<div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
				{/* Left Column - 2/3 width */}
				<div className="space-y-6 lg:col-span-2">
					{/* Performance Trend Chart */}
					<Card className="border-none shadow-sm">
						<CardHeader className="border-b pb-3">
							<CardTitle className="flex items-center gap-2 text-base font-semibold">
								<Activity className="h-4 w-4 text-muted-foreground" />
								Performance Trend
							</CardTitle>
						</CardHeader>
						<CardContent className="pt-4">
							<ChartContainer config={areaConfig} className="h-[220px] w-full">
								<AreaChart data={performanceTrend} margin={{ top: 5, right: 10, left: -15, bottom: 5 }}>
									<defs>
										<linearGradient id="gradientScore" x1="0" y1="0" x2="0" y2="1">
											<stop offset="0%" stopColor="hsl(200, 80%, 50%)" stopOpacity={0.3} />
											<stop offset="100%" stopColor="hsl(200, 80%, 50%)" stopOpacity={0.02} />
										</linearGradient>
									</defs>
									<CartesianGrid strokeDasharray="3 3" vertical={false} />
									<XAxis dataKey="month" fontSize={12} tickLine={false} axisLine={false} />
									<YAxis domain={[70, 100]} fontSize={12} tickLine={false} axisLine={false} />
									<ChartTooltip content={<ChartTooltipContent />} />
									<Area type="monotone" dataKey="score" stroke="var(--color-score)" strokeWidth={2.5} fill="url(#gradientScore)" dot={{ r: 3, fill: "hsl(200, 80%, 50%)" }} />
								</AreaChart>
							</ChartContainer>
						</CardContent>
					</Card>

					{/* Personal Information */}
					<Card className="border-none shadow-sm">
						<CardHeader className="border-b pb-3">
							<CardTitle className="flex items-center gap-2 text-base font-semibold">
								<User className="h-4 w-4 text-muted-foreground" />
								{t("personalDetails")}
							</CardTitle>
						</CardHeader>
						<CardContent className="grid grid-cols-1 gap-x-8 gap-y-3 pt-4 sm:grid-cols-2 lg:grid-cols-3">
							<div>
								<p className="text-xs text-muted-foreground">{t("dateOfBirth")}</p>
								<p className="text-sm font-medium">{student.dob || "—"}</p>
							</div>
							<div>
								<p className="text-xs text-muted-foreground">{t("gender")}</p>
								<p className="text-sm font-medium capitalize">{student.gender || "—"}</p>
							</div>
							<div>
								<p className="text-xs text-muted-foreground">{t("bloodGroup")}</p>
								<p className="text-sm font-medium">{student.bloodGroup || "—"}</p>
							</div>
							<div>
								<p className="text-xs text-muted-foreground">{t("religion")}</p>
								<p className="text-sm font-medium capitalize">{student.religion || "—"}</p>
							</div>
							<div>
								<p className="text-xs text-muted-foreground">Nationality</p>
								<p className="text-sm font-medium">{student.nationality || "Bangladeshi"}</p>
							</div>
							<div>
								<p className="text-xs text-muted-foreground">Admission Type</p>
								<p className="text-sm font-medium capitalize">{student.admissionType || "—"}</p>
							</div>
							{student.presentAddress && (
								<div className="sm:col-span-2 lg:col-span-3">
									<p className="text-xs text-muted-foreground">{t("presentAddress")}</p>
									<p className="text-sm font-medium">{student.presentAddress}</p>
								</div>
							)}
							{student.permanentAddress && (
								<div className="sm:col-span-2 lg:col-span-3">
									<p className="text-xs text-muted-foreground">Permanent Address</p>
									<p className="text-sm font-medium">{student.permanentAddress}</p>
								</div>
							)}
						</CardContent>
					</Card>

					{/* Parent Information */}
					<Card className="border-none shadow-sm">
						<CardHeader className="border-b pb-3">
							<CardTitle className="flex items-center gap-2 text-base font-semibold">
								<Shield className="h-4 w-4 text-muted-foreground" />
								{t("parentDetails")}
							</CardTitle>
						</CardHeader>
						<CardContent className="grid grid-cols-1 gap-x-8 gap-y-3 pt-4 sm:grid-cols-2">
							<div>
								<p className="text-xs text-muted-foreground">{t("fatherName")}</p>
								<p className="text-sm font-medium">{student.fatherName || "—"}</p>
							</div>
							<div>
								<p className="text-xs text-muted-foreground">Father's NID</p>
								<p className="text-sm font-medium">{student.fatherNid || "—"}</p>
							</div>
							<div>
								<p className="text-xs text-muted-foreground">{t("motherName")}</p>
								<p className="text-sm font-medium">{student.motherName || "—"}</p>
							</div>
							<div>
								<p className="text-xs text-muted-foreground">Mother's NID</p>
								<p className="text-sm font-medium">{student.motherNid || "—"}</p>
							</div>
							<div>
								<p className="text-xs text-muted-foreground">{t("fatherPhone")}</p>
								<p className="text-sm font-medium">{student.mobile || "—"}</p>
							</div>
							<div>
								<p className="text-xs text-muted-foreground">Emergency Contact</p>
								<p className="text-sm font-medium">{student.emergencyContact || "—"}</p>
							</div>
							{student.guardianDetails && (
								<div className="sm:col-span-2">
									<p className="text-xs text-muted-foreground">Guardian Details</p>
									<p className="text-sm font-medium">{student.guardianDetails}</p>
								</div>
							)}
						</CardContent>
					</Card>

					{/* Health Information */}
					<Card className="border-none shadow-sm">
						<CardHeader className="border-b pb-3">
							<CardTitle className="flex items-center gap-2 text-base font-semibold">
								<Heart className="h-4 w-4 text-muted-foreground" />
								Health Information
							</CardTitle>
						</CardHeader>
						<CardContent className="grid grid-cols-1 gap-x-8 gap-y-3 pt-4 sm:grid-cols-2 lg:grid-cols-3">
							<div>
								<p className="text-xs text-muted-foreground">{t("bloodGroup")}</p>
								<p className="text-sm font-medium">{student.bloodGroup || "—"}</p>
							</div>
							<div>
								<p className="text-xs text-muted-foreground">Allergies</p>
								<p className="text-sm font-medium">{student.allergies || "None reported"}</p>
							</div>
							<div>
								<p className="text-xs text-muted-foreground">Medical Conditions</p>
								<p className="text-sm font-medium">{student.conditions || "None reported"}</p>
							</div>
						</CardContent>
					</Card>

					{/* Transport & Library */}
					<div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
						{/* Transport Info */}
						<Card className="border-none shadow-sm">
							<CardHeader className="border-b pb-3">
								<CardTitle className="flex items-center gap-2 text-base font-semibold">
									<Bus className="h-4 w-4 text-muted-foreground" />
									Transport
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-3 pt-4">
								<div className="flex items-center justify-between text-sm">
									<span className="text-muted-foreground">Route</span>
									<span className="font-medium">Route 3 — Mirpur</span>
								</div>
								<div className="flex items-center justify-between text-sm">
									<span className="text-muted-foreground">Bus No.</span>
									<span className="font-medium">BUS-007</span>
								</div>
								<div className="flex items-center justify-between text-sm">
									<span className="text-muted-foreground">Stop</span>
									<div className="flex items-center gap-1 font-medium">
										<MapPin className="h-3 w-3" />
										Mirpur-10 Circle
									</div>
								</div>
								<div className="flex items-center justify-between text-sm">
									<span className="text-muted-foreground">Pickup</span>
									<span className="font-medium">7:15 AM</span>
								</div>
							</CardContent>
						</Card>

						{/* Library Books */}
						<Card className="border-none shadow-sm">
							<CardHeader className="border-b pb-3">
								<CardTitle className="flex items-center gap-2 text-base font-semibold">
									<Library className="h-4 w-4 text-muted-foreground" />
									Library Books
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-3 pt-4">
								{libraryBooks.map((book, i) => (
									<div key={i} className="rounded-lg border p-2.5">
										<p className="text-sm font-medium">{book.title}</p>
										<div className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
											<span>Due: {book.dueDate}</span>
											<Badge variant={book.status === "Issued" ? "secondary" : "default"} className="text-[10px]">
												{book.status}
											</Badge>
										</div>
									</div>
								))}
							</CardContent>
						</Card>
					</div>
				</div>

				{/* Right Column - 1/3 width */}
				<div className="space-y-6">
					{/* Subject Progress */}
					<Card className="border-none shadow-sm">
						<CardHeader className="border-b pb-3">
							<CardTitle className="flex items-center gap-2 text-base font-semibold">
								<Activity className="h-4 w-4 text-muted-foreground" />
								{t("performance")}
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4 pt-4">
							{subjectPerformance.map((sub) => (
								<div key={sub.subject} className="space-y-1.5">
									<div className="flex items-center justify-between text-sm">
										<span className="font-medium">{sub.subject}</span>
										<span className="text-xs text-muted-foreground">{sub.score}%</span>
									</div>
									<Progress value={sub.score} className="h-1.5" />
								</div>
							))}
						</CardContent>
					</Card>

					{/* Upcoming Events */}
					<Card className="border-none shadow-sm">
						<CardHeader className="border-b pb-3">
							<CardTitle className="flex items-center gap-2 text-base font-semibold">
								<Calendar className="h-4 w-4 text-muted-foreground" />
								Upcoming Events
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-3 pt-4">
							{upcomingEvents.map((event, i) => (
								<div key={i} className="flex items-center gap-3">
									<Badge variant="outline" className={`shrink-0 text-[10px] ${eventColors[event.type]}`}>
										{event.type}
									</Badge>
									<div className="min-w-0 flex-1">
										<p className="truncate text-sm font-medium">{event.title}</p>
										<p className="text-xs text-muted-foreground">{event.date}</p>
									</div>
								</div>
							))}
						</CardContent>
					</Card>

					{/* Recent Activity */}
					<Card className="border-none shadow-sm">
						<CardHeader className="border-b pb-3">
							<CardTitle className="flex items-center gap-2 text-base font-semibold">
								<Activity className="h-4 w-4 text-muted-foreground" />
								{t("recentActivity")}
							</CardTitle>
						</CardHeader>
						<CardContent className="pt-4">
							<div className="space-y-4">
								{recentActivity.map((act, i) => (
									<div key={i} className="flex gap-3">
										<div className={`mt-1 h-2 w-2 shrink-0 rounded-full ${activityColors[act.type]}`} />
										<div>
											<p className="text-sm font-medium leading-tight">{act.title}</p>
											<p className="mt-0.5 text-xs text-muted-foreground">{act.date}</p>
										</div>
									</div>
								))}
							</div>
						</CardContent>
					</Card>

					{/* Emergency Contact Card */}
					<Card className="border-none bg-red-500/5 shadow-sm">
						<CardHeader className="pb-2">
							<CardTitle className="flex items-center gap-2 text-base font-semibold text-red-700">
								<Phone className="h-4 w-4" />
								Emergency Contact
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-2">
							<div>
								<p className="text-xs text-muted-foreground">Father</p>
								<p className="text-sm font-semibold">{student.mobile || "—"}</p>
							</div>
							<div>
								<p className="text-xs text-muted-foreground">Emergency</p>
								<p className="text-sm font-semibold">{student.emergencyContact || "—"}</p>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
