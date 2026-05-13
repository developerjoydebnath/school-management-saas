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
import { Award, BookMarked, BookOpen, CheckCircle2, Clock, GraduationCap, MessageSquare, TrendingDown, TrendingUp } from "lucide-react";
import {
	Bar,
	BarChart,
	CartesianGrid,
	Cell,
	Line,
	LineChart,
	Pie,
	PieChart,
	Radar,
	RadarChart,
	PolarGrid,
	PolarAngleAxis,
	PolarRadiusAxis,
	XAxis,
	YAxis,
} from "recharts";

// --- Demo Data ---
const examResults = [
	{ exam: "1st Term", bangla: 82, english: 74, math: 91, science: 85, socialSci: 78, religion: 88, ict: 76, average: 82 },
	{ exam: "2nd Term", bangla: 85, english: 78, math: 88, science: 82, socialSci: 81, religion: 90, ict: 80, average: 83 },
	{ exam: "Midterm", bangla: 78, english: 80, math: 95, science: 88, socialSci: 76, religion: 85, ict: 82, average: 83 },
	{ exam: "Final", bangla: 90, english: 85, math: 92, science: 91, socialSci: 84, religion: 92, ict: 86, average: 89 },
];

const subjectPerformance = [
	{ subject: "Bangla", marks: 90, total: 100, grade: "A+", gpa: 5.0, trend: "up", position: 3 },
	{ subject: "English", marks: 85, total: 100, grade: "A", gpa: 4.0, trend: "up", position: 8 },
	{ subject: "Mathematics", marks: 92, total: 100, grade: "A+", gpa: 5.0, trend: "up", position: 1 },
	{ subject: "Science", marks: 91, total: 100, grade: "A+", gpa: 5.0, trend: "down", position: 4 },
	{ subject: "Social Science", marks: 84, total: 100, grade: "A", gpa: 4.0, trend: "up", position: 6 },
	{ subject: "Religion", marks: 92, total: 100, grade: "A+", gpa: 5.0, trend: "up", position: 2 },
	{ subject: "ICT", marks: 86, total: 100, grade: "A", gpa: 4.0, trend: "up", position: 10 },
];

const radarData = [
	{ subject: "Bangla", score: 90, classAvg: 72 },
	{ subject: "English", score: 85, classAvg: 68 },
	{ subject: "Math", score: 92, classAvg: 65 },
	{ subject: "Science", score: 91, classAvg: 70 },
	{ subject: "Social", score: 84, classAvg: 74 },
	{ subject: "Religion", score: 92, classAvg: 78 },
	{ subject: "ICT", score: 86, classAvg: 71 },
];

const gradeDistribution = [
	{ name: "A+", value: 4, fill: "hsl(142, 76%, 36%)" },
	{ name: "A", value: 3, fill: "hsl(200, 80%, 50%)" },
];

const rankProgress = [
	{ exam: "1st Term", rank: 8 },
	{ exam: "2nd Term", rank: 6 },
	{ exam: "Midterm", rank: 4 },
	{ exam: "Final", rank: 2 },
];

const assignments = [
	{ title: "Mathematics Problem Set 8", subject: "Math", dueDate: "May 18, 2026", status: "Pending", marks: "—" },
	{ title: "Essay: Climate Change", subject: "English", dueDate: "May 15, 2026", status: "Submitted", marks: "—" },
	{ title: "Science Lab Report", subject: "Science", dueDate: "May 10, 2026", status: "Graded", marks: "18/20" },
	{ title: "History Research Paper", subject: "Social Science", dueDate: "May 05, 2026", status: "Graded", marks: "15/20" },
	{ title: "Bangla Poem Analysis", subject: "Bangla", dueDate: "Apr 28, 2026", status: "Graded", marks: "19/20" },
	{ title: "ICT Project: Website", subject: "ICT", dueDate: "Apr 20, 2026", status: "Graded", marks: "17/20" },
];

const teacherRemarks = [
	{ teacher: "Mr. Karim", subject: "Mathematics", remark: "Excellent problem-solving skills. Shows strong analytical thinking and consistently performs above class average.", date: "Apr 2026" },
	{ teacher: "Ms. Fatima", subject: "English", remark: "Good improvement in writing. Needs to focus more on spoken English and vocabulary building.", date: "Apr 2026" },
	{ teacher: "Mr. Rahman", subject: "Science", remark: "Very curious and attentive in lab sessions. Exceptional understanding of concepts.", date: "Mar 2026" },
];

const examSchedule = [
	{ subject: "Mathematics", date: "May 18, 2026", time: "10:00 AM", room: "Hall A" },
	{ subject: "English", date: "May 20, 2026", time: "10:00 AM", room: "Hall B" },
	{ subject: "Science", date: "May 22, 2026", time: "10:00 AM", room: "Lab 1" },
	{ subject: "Bangla", date: "May 24, 2026", time: "10:00 AM", room: "Hall A" },
	{ subject: "Social Science", date: "May 26, 2026", time: "10:00 AM", room: "Hall C" },
];

const lineChartConfig = {
	average: { label: "Average", color: "hsl(200, 80%, 50%)" },
	math: { label: "Math", color: "hsl(142, 76%, 36%)" },
	english: { label: "English", color: "hsl(24, 95%, 53%)" },
} satisfies ChartConfig;

const barChartConfig = {
	marks: { label: "Marks", color: "hsl(200, 80%, 50%)" },
} satisfies ChartConfig;

const pieConfig = {
	"A+": { label: "A+", color: "hsl(142, 76%, 36%)" },
	A: { label: "A", color: "hsl(200, 80%, 50%)" },
} satisfies ChartConfig;

const rankConfig = {
	rank: { label: "Class Rank", color: "hsl(262, 83%, 58%)" },
} satisfies ChartConfig;

const radarConfig = {
	score: { label: "Student", color: "hsl(200, 80%, 50%)" },
	classAvg: { label: "Class Avg", color: "hsl(0, 0%, 70%)" },
} satisfies ChartConfig;

export default function AcademicsTab() {
	const totalAssignments = 50;
	const submitted = 42;
	const graded = 38;
	const pending = 8;

	return (
		<div className="space-y-6">
			{/* Top Stats */}
			<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
				<Card className="border-none bg-green-500/5 shadow-sm">
					<CardContent className="flex items-center gap-3 p-4">
						<div className="rounded-full bg-green-500/10 p-2 text-green-600">
							<GraduationCap className="h-4 w-4" />
						</div>
						<div>
							<p className="text-[10px] text-muted-foreground">GPA</p>
							<p className="text-lg font-bold text-green-700">3.85</p>
						</div>
					</CardContent>
				</Card>
				<Card className="border-none bg-blue-500/5 shadow-sm">
					<CardContent className="flex items-center gap-3 p-4">
						<div className="rounded-full bg-blue-500/10 p-2 text-blue-600">
							<Award className="h-4 w-4" />
						</div>
						<div>
							<p className="text-[10px] text-muted-foreground">Class Rank</p>
							<p className="text-lg font-bold text-blue-700">2nd</p>
						</div>
					</CardContent>
				</Card>
				<Card className="border-none bg-purple-500/5 shadow-sm">
					<CardContent className="flex items-center gap-3 p-4">
						<div className="rounded-full bg-purple-500/10 p-2 text-purple-600">
							<BookOpen className="h-4 w-4" />
						</div>
						<div>
							<p className="text-[10px] text-muted-foreground">Subjects</p>
							<p className="text-lg font-bold text-purple-700">7</p>
						</div>
					</CardContent>
				</Card>
				<Card className="border-none bg-orange-500/5 shadow-sm">
					<CardContent className="flex items-center gap-3 p-4">
						<div className="rounded-full bg-orange-500/10 p-2 text-orange-600">
							<TrendingUp className="h-4 w-4" />
						</div>
						<div>
							<p className="text-[10px] text-muted-foreground">Best Subject</p>
							<p className="text-lg font-bold text-orange-700">Math</p>
						</div>
					</CardContent>
				</Card>
				<Card className="border-none bg-pink-500/5 shadow-sm">
					<CardContent className="flex items-center gap-3 p-4">
						<div className="rounded-full bg-pink-500/10 p-2 text-pink-600">
							<CheckCircle2 className="h-4 w-4" />
						</div>
						<div>
							<p className="text-[10px] text-muted-foreground">Submitted</p>
							<p className="text-lg font-bold text-pink-700">{submitted}/{totalAssignments}</p>
						</div>
					</CardContent>
				</Card>
				<Card className="border-none bg-yellow-500/5 shadow-sm">
					<CardContent className="flex items-center gap-3 p-4">
						<div className="rounded-full bg-yellow-500/10 p-2 text-yellow-600">
							<Clock className="h-4 w-4" />
						</div>
						<div>
							<p className="text-[10px] text-muted-foreground">Pending</p>
							<p className="text-lg font-bold text-yellow-700">{pending}</p>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Charts Row 1 */}
			<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
				{/* Performance Trend Line */}
				<Card className="border-none shadow-sm">
					<CardHeader className="border-b pb-3">
						<CardTitle className="text-base font-semibold">Exam Performance Trend</CardTitle>
					</CardHeader>
					<CardContent className="pt-4">
						<ChartContainer config={lineChartConfig} className="h-[260px] w-full">
							<LineChart data={examResults} margin={{ top: 5, right: 10, left: -15, bottom: 5 }}>
								<CartesianGrid strokeDasharray="3 3" vertical={false} />
								<XAxis dataKey="exam" fontSize={12} tickLine={false} axisLine={false} />
								<YAxis domain={[60, 100]} fontSize={12} tickLine={false} axisLine={false} />
								<ChartTooltip content={<ChartTooltipContent />} />
								<Line type="monotone" dataKey="average" stroke="var(--color-average)" strokeWidth={2.5} dot={{ r: 4 }} />
								<Line type="monotone" dataKey="math" stroke="var(--color-math)" strokeWidth={1.5} strokeDasharray="5 5" />
								<Line type="monotone" dataKey="english" stroke="var(--color-english)" strokeWidth={1.5} strokeDasharray="5 5" />
							</LineChart>
						</ChartContainer>
					</CardContent>
				</Card>

				{/* Radar Chart - Student vs Class */}
				<Card className="border-none shadow-sm">
					<CardHeader className="border-b pb-3">
						<CardTitle className="text-base font-semibold">Student vs Class Average</CardTitle>
					</CardHeader>
					<CardContent className="pt-4">
						<ChartContainer config={radarConfig} className="mx-auto h-[260px] w-full max-w-[350px]">
							<RadarChart data={radarData} cx="50%" cy="50%" outerRadius="75%">
								<PolarGrid strokeDasharray="3 3" />
								<PolarAngleAxis dataKey="subject" fontSize={10} />
								<PolarRadiusAxis domain={[0, 100]} fontSize={10} />
								<ChartTooltip content={<ChartTooltipContent />} />
								<Radar dataKey="score" stroke="var(--color-score)" fill="var(--color-score)" fillOpacity={0.25} strokeWidth={2} />
								<Radar dataKey="classAvg" stroke="var(--color-classAvg)" fill="var(--color-classAvg)" fillOpacity={0.1} strokeWidth={1.5} strokeDasharray="4 4" />
							</RadarChart>
						</ChartContainer>
						<div className="mt-2 flex justify-center gap-4">
							<div className="flex items-center gap-1.5 text-xs">
								<div className="h-2.5 w-2.5 rounded-full bg-blue-500" />
								<span>Student</span>
							</div>
							<div className="flex items-center gap-1.5 text-xs">
								<div className="h-2.5 w-2.5 rounded-full bg-gray-400" />
								<span>Class Average</span>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Charts Row 2 */}
			<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
				{/* Subject Marks Bar */}
				<Card className="border-none shadow-sm md:col-span-2">
					<CardHeader className="border-b pb-3">
						<CardTitle className="text-base font-semibold">Subject-wise Marks (Latest Exam)</CardTitle>
					</CardHeader>
					<CardContent className="pt-4">
						<ChartContainer config={barChartConfig} className="h-[250px] w-full">
							<BarChart data={subjectPerformance} margin={{ top: 5, right: 10, left: -15, bottom: 5 }}>
								<CartesianGrid strokeDasharray="3 3" vertical={false} />
								<XAxis dataKey="subject" fontSize={10} tickLine={false} axisLine={false} angle={-15} textAnchor="end" height={45} />
								<YAxis domain={[0, 100]} fontSize={12} tickLine={false} axisLine={false} />
								<ChartTooltip content={<ChartTooltipContent />} />
								<Bar dataKey="marks" radius={[4, 4, 0, 0]} fill="var(--color-marks)" />
							</BarChart>
						</ChartContainer>
					</CardContent>
				</Card>

				{/* Grade + Rank */}
				<div className="space-y-6">
					<Card className="border-none shadow-sm">
						<CardHeader className="border-b pb-3">
							<CardTitle className="text-base font-semibold">Grade Split</CardTitle>
						</CardHeader>
						<CardContent className="pt-4">
							<ChartContainer config={pieConfig} className="mx-auto h-[120px] w-full max-w-[180px]">
								<PieChart>
									<ChartTooltip content={<ChartTooltipContent hideLabel />} />
									<Pie data={gradeDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={35} outerRadius={55} paddingAngle={4}>
										{gradeDistribution.map((e, i) => (
											<Cell key={i} fill={e.fill} />
										))}
									</Pie>
								</PieChart>
							</ChartContainer>
							<div className="mt-2 flex justify-center gap-3">
								{gradeDistribution.map((g) => (
									<div key={g.name} className="flex items-center gap-1 text-xs">
										<div className="h-2 w-2 rounded-full" style={{ backgroundColor: g.fill }} />
										<span>{g.name} ({g.value})</span>
									</div>
								))}
							</div>
						</CardContent>
					</Card>

					<Card className="border-none shadow-sm">
						<CardHeader className="border-b pb-3">
							<CardTitle className="text-base font-semibold">Rank Progress</CardTitle>
						</CardHeader>
						<CardContent className="pt-4">
							<ChartContainer config={rankConfig} className="h-[120px] w-full">
								<LineChart data={rankProgress} margin={{ top: 5, right: 10, left: -15, bottom: 5 }}>
									<XAxis dataKey="exam" fontSize={9} tickLine={false} axisLine={false} />
									<YAxis reversed domain={[1, 10]} fontSize={10} tickLine={false} axisLine={false} />
									<ChartTooltip content={<ChartTooltipContent />} />
									<Line type="monotone" dataKey="rank" stroke="var(--color-rank)" strokeWidth={2.5} dot={{ r: 4, fill: "hsl(262, 83%, 58%)" }} />
								</LineChart>
							</ChartContainer>
						</CardContent>
					</Card>
				</div>
			</div>

			{/* Detailed Results Table */}
			<Card className="border-none shadow-sm">
				<CardHeader className="border-b pb-3">
					<CardTitle className="text-base font-semibold">Subject Performance Detail (Final Exam)</CardTitle>
				</CardHeader>
				<CardContent className="pt-0">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="font-semibold">Subject</TableHead>
								<TableHead className="text-center font-semibold">Marks</TableHead>
								<TableHead className="text-center font-semibold">Grade</TableHead>
								<TableHead className="text-center font-semibold">GPA</TableHead>
								<TableHead className="text-center font-semibold">Position</TableHead>
								<TableHead className="text-center font-semibold">Progress</TableHead>
								<TableHead className="text-center font-semibold">Trend</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{subjectPerformance.map((sub) => (
								<TableRow key={sub.subject}>
									<TableCell className="font-medium">{sub.subject}</TableCell>
									<TableCell className="text-center">
										<span className="font-mono font-semibold">{sub.marks}</span>
										<span className="text-muted-foreground">/{sub.total}</span>
									</TableCell>
									<TableCell className="text-center">
										<Badge variant={sub.grade === "A+" ? "default" : "secondary"} className="text-xs">{sub.grade}</Badge>
									</TableCell>
									<TableCell className="text-center font-mono font-semibold">{sub.gpa.toFixed(1)}</TableCell>
									<TableCell className="text-center">
										<Badge variant="outline" className="text-xs">{sub.position}{sub.position === 1 ? "st" : sub.position === 2 ? "nd" : sub.position === 3 ? "rd" : "th"}</Badge>
									</TableCell>
									<TableCell className="text-center">
										<div className="mx-auto w-20">
											<Progress value={sub.marks} className="h-1.5" />
										</div>
									</TableCell>
									<TableCell className="text-center">
										{sub.trend === "up" ? <TrendingUp className="mx-auto h-4 w-4 text-green-600" /> : <TrendingDown className="mx-auto h-4 w-4 text-red-500" />}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>

			{/* Assignments Tracker */}
			<Card className="border-none shadow-sm">
				<CardHeader className="border-b pb-3">
					<div className="flex items-center justify-between">
						<CardTitle className="flex items-center gap-2 text-base font-semibold">
							<BookMarked className="h-4 w-4 text-muted-foreground" />
							Assignment Tracker
						</CardTitle>
						<div className="flex gap-2 text-xs">
							<Badge variant="secondary">{submitted} Submitted</Badge>
							<Badge variant="outline">{pending} Pending</Badge>
						</div>
					</div>
				</CardHeader>
				<CardContent className="pt-0">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="font-semibold">Assignment</TableHead>
								<TableHead className="font-semibold">Subject</TableHead>
								<TableHead className="font-semibold">Due Date</TableHead>
								<TableHead className="text-center font-semibold">Status</TableHead>
								<TableHead className="text-center font-semibold">Marks</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{assignments.map((a, i) => (
								<TableRow key={i}>
									<TableCell className="font-medium">{a.title}</TableCell>
									<TableCell>
										<Badge variant="outline" className="text-xs">{a.subject}</Badge>
									</TableCell>
									<TableCell className="text-muted-foreground">{a.dueDate}</TableCell>
									<TableCell className="text-center">
										<Badge
											variant={a.status === "Graded" ? "default" : a.status === "Submitted" ? "secondary" : "outline"}
											className="text-xs"
										>
											{a.status}
										</Badge>
									</TableCell>
									<TableCell className="text-center font-mono text-sm">
										{a.marks}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>

			{/* Upcoming Exams */}
			<Card className="border-none shadow-sm">
				<CardHeader className="border-b pb-3">
					<CardTitle className="flex items-center gap-2 text-base font-semibold">
						<Clock className="h-4 w-4 text-muted-foreground" />
						Upcoming Exam Schedule
					</CardTitle>
				</CardHeader>
				<CardContent className="pt-0">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="font-semibold">Subject</TableHead>
								<TableHead className="font-semibold">Date</TableHead>
								<TableHead className="font-semibold">Time</TableHead>
								<TableHead className="font-semibold">Room</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{examSchedule.map((exam, i) => (
								<TableRow key={i}>
									<TableCell className="font-medium">{exam.subject}</TableCell>
									<TableCell>{exam.date}</TableCell>
									<TableCell className="text-muted-foreground">{exam.time}</TableCell>
									<TableCell>
										<Badge variant="outline" className="text-xs">{exam.room}</Badge>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>

			{/* Teacher Remarks */}
			<Card className="border-none shadow-sm">
				<CardHeader className="border-b pb-3">
					<CardTitle className="flex items-center gap-2 text-base font-semibold">
						<MessageSquare className="h-4 w-4 text-muted-foreground" />
						Teacher Remarks
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4 pt-4">
					{teacherRemarks.map((rem, i) => (
						<div key={i} className="rounded-xl border p-4">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-2">
									<div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
										{rem.teacher.split(" ").map(n => n[0]).join("")}
									</div>
									<div>
										<p className="text-sm font-semibold">{rem.teacher}</p>
										<p className="text-xs text-muted-foreground">{rem.subject}</p>
									</div>
								</div>
								<span className="text-xs text-muted-foreground">{rem.date}</span>
							</div>
							<p className="mt-3 text-sm leading-relaxed text-muted-foreground">
								&ldquo;{rem.remark}&rdquo;
							</p>
						</div>
					))}
				</CardContent>
			</Card>
		</div>
	);
}
