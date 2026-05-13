"use client";

import { Badge } from "@/shared/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/shared/components/ui/chart";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/shared/components/ui/table";
import { cn } from "@/shared/lib/utils";
import {
	Calendar,
	CheckCircle2,
	ChevronLeft,
	ChevronRight,
	Clock,
	XCircle,
} from "lucide-react";
import { useState } from "react";
import {
	Bar,
	BarChart,
	CartesianGrid,
	Cell,
	Line,
	LineChart,
	Pie,
	PieChart,
	XAxis,
	YAxis,
} from "recharts";
import { Button } from "@/shared/components/ui/button";

// --- Types ---
type AttendanceStatus = "P" | "A" | "L" | "D";
type DayRecord = { day: number; status: AttendanceStatus };

// --- Demo Data ---

// Generate a full year of attendance data
const generateCalendarData = (): Record<string, DayRecord[]> => {
	const months: Record<string, DayRecord[]> = {};
	const year = 2026;
	const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

	for (let m = 0; m < 12; m++) {
		const daysInMonth = new Date(year, m + 1, 0).getDate();
		const key = `${year}-${String(m + 1).padStart(2, "0")}`;
		const days: DayRecord[] = [];

		for (let d = 1; d <= daysInMonth; d++) {
			const date = new Date(year, m, d);
			const dayOfWeek = date.getDay();
			// Skip Fridays (5) and Saturdays (6) — typical BD weekend
			if (dayOfWeek === 5 || dayOfWeek === 6) continue;

			// Random status weighted towards present
			const rand = Math.random();
			let status: AttendanceStatus;
			if (rand < 0.82) status = "P";
			else if (rand < 0.90) status = "A";
			else if (rand < 0.95) status = "L";
			else status = "D";

			days.push({ day: d, status });
		}
		months[key] = days;
	}
	return months;
};

const calendarData = generateCalendarData();

const monthlyAttendance = [
	{ month: "Jul", present: 22, absent: 2, late: 1, leave: 0, total: 25 },
	{ month: "Aug", present: 20, absent: 1, late: 2, leave: 2, total: 25 },
	{ month: "Sep", present: 23, absent: 0, late: 1, leave: 1, total: 25 },
	{ month: "Oct", present: 21, absent: 2, late: 1, leave: 1, total: 25 },
	{ month: "Nov", present: 24, absent: 0, late: 1, leave: 0, total: 25 },
	{ month: "Dec", present: 18, absent: 2, late: 3, leave: 2, total: 25 },
	{ month: "Jan", present: 22, absent: 1, late: 1, leave: 1, total: 25 },
	{ month: "Feb", present: 20, absent: 1, late: 2, leave: 2, total: 25 },
	{ month: "Mar", present: 23, absent: 1, late: 0, leave: 1, total: 25 },
	{ month: "Apr", present: 24, absent: 0, late: 1, leave: 0, total: 25 },
];

const attendancePercentTrend = monthlyAttendance.map((m) => ({
	month: m.month,
	percent: Math.round((m.present / m.total) * 100),
}));

const attendanceSummary = [
	{ name: "Present", value: 217, fill: "hsl(142, 76%, 36%)" },
	{ name: "Absent", value: 10, fill: "hsl(0, 84%, 60%)" },
	{ name: "Late", value: 13, fill: "hsl(45, 93%, 47%)" },
	{ name: "Leave", value: 10, fill: "hsl(200, 80%, 50%)" },
];

const recentAbsences = [
	{ date: "Apr 22, 2026", day: "Tuesday", reason: "Fever", status: "Excused", type: "A" },
	{ date: "Mar 10, 2026", day: "Monday", reason: "Family Event", status: "Excused", type: "L" },
	{ date: "Feb 14, 2026", day: "Wednesday", reason: "No reason", status: "Unexcused", type: "A" },
	{ date: "Feb 08, 2026", day: "Thursday", reason: "Doctor Visit", status: "Excused", type: "L" },
	{ date: "Jan 20, 2026", day: "Monday", reason: "Weather", status: "Excused", type: "A" },
	{ date: "Dec 18, 2025", day: "Thursday", reason: "—", status: "Unexcused", type: "A" },
	{ date: "Dec 15, 2025", day: "Monday", reason: "Sick", status: "Excused", type: "A" },
];

const streakData = {
	currentStreak: 18,
	longestStreak: 34,
	totalWorkingDays: 250,
	consecutiveLateCount: 0,
};

const barConfig = {
	present: { label: "Present", color: "hsl(142, 76%, 36%)" },
	absent: { label: "Absent", color: "hsl(0, 84%, 60%)" },
	late: { label: "Late", color: "hsl(45, 93%, 47%)" },
	leave: { label: "Leave", color: "hsl(200, 80%, 50%)" },
} satisfies ChartConfig;

const pieConfig = {
	Present: { label: "Present", color: "hsl(142, 76%, 36%)" },
	Absent: { label: "Absent", color: "hsl(0, 84%, 60%)" },
	Late: { label: "Late", color: "hsl(45, 93%, 47%)" },
	Leave: { label: "Leave", color: "hsl(200, 80%, 50%)" },
} satisfies ChartConfig;

const lineConfig = {
	percent: { label: "Attendance %", color: "hsl(262, 83%, 58%)" },
} satisfies ChartConfig;

const totalPresent = 217;
const totalAbsent = 10;
const totalLate = 13;
const totalLeave = 10;
const totalDays = 250;
const attendancePercent = Math.round((totalPresent / totalDays) * 100);

// --- Status helpers ---
const statusStyle: Record<AttendanceStatus, string> = {
	P: "bg-green-500/15 text-green-700 dark:text-green-400",
	A: "bg-red-500/15 text-red-700 dark:text-red-400",
	L: "bg-blue-500/15 text-blue-700 dark:text-blue-400",
	D: "bg-yellow-500/15 text-yellow-700 dark:text-yellow-400",
};

const statusLabel: Record<AttendanceStatus, string> = {
	P: "Present",
	A: "Absent",
	L: "Leave",
	D: "Late",
};

// --- Calendar Component ---
function AttendanceCalendar() {
	const [currentDate, setCurrentDate] = useState(new Date(2026, 3, 1)); // April 2026
	const year = currentDate.getFullYear();
	const month = currentDate.getMonth();
	const key = `${year}-${String(month + 1).padStart(2, "0")}`;
	const days = calendarData[key] || [];
	const daysInMonth = new Date(year, month + 1, 0).getDate();
	const firstDayOfWeek = new Date(year, month, 1).getDay(); // 0=Sun

	const dayNames = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
	const monthName = currentDate.toLocaleString("en", { month: "long", year: "numeric" });

	// Build full grid
	const grid: (DayRecord | null)[] = [];
	// Adjust for Saturday start
	const adjustedFirstDay = (firstDayOfWeek + 1) % 7;
	for (let i = 0; i < adjustedFirstDay; i++) grid.push(null);
	for (let d = 1; d <= daysInMonth; d++) {
		const record = days.find((r) => r.day === d);
		const date = new Date(year, month, d);
		const dayOfWeek = date.getDay();
		if (dayOfWeek === 5 || dayOfWeek === 6) {
			grid.push({ day: d, status: "P" }); // weekend placeholder
		} else {
			grid.push(record || { day: d, status: "P" });
		}
	}

	const isWeekend = (dayNum: number) => {
		const date = new Date(year, month, dayNum);
		return date.getDay() === 5 || date.getDay() === 6;
	};

	return (
		<Card className="border-none shadow-sm">
			<CardHeader className="border-b pb-3">
				<div className="flex items-center justify-between">
					<CardTitle className="text-base font-semibold">Daily Attendance Calendar</CardTitle>
					<div className="flex items-center gap-2">
						<Button
							variant="outline"
							size="icon-sm"
							onClick={() => setCurrentDate(new Date(year, month - 1, 1))}
						>
							<ChevronLeft className="h-4 w-4" />
						</Button>
						<span className="min-w-[140px] text-center text-sm font-semibold">
							{monthName}
						</span>
						<Button
							variant="outline"
							size="icon-sm"
							onClick={() => setCurrentDate(new Date(year, month + 1, 1))}
						>
							<ChevronRight className="h-4 w-4" />
						</Button>
					</div>
				</div>
			</CardHeader>
			<CardContent className="pt-4">
				{/* Legend */}
				<div className="mb-4 flex flex-wrap gap-4">
					{(Object.keys(statusLabel) as AttendanceStatus[]).map((s) => (
						<div key={s} className="flex items-center gap-1.5 text-xs">
							<span className={cn("flex h-5 w-5 items-center justify-center rounded text-[10px] font-bold", statusStyle[s])}>
								{s}
							</span>
							<span className="text-muted-foreground">{statusLabel[s]}</span>
						</div>
					))}
					<div className="flex items-center gap-1.5 text-xs">
						<span className="flex h-5 w-5 items-center justify-center rounded bg-muted text-[10px] font-bold text-muted-foreground">—</span>
						<span className="text-muted-foreground">Weekend / Holiday</span>
					</div>
				</div>

				{/* Calendar Grid */}
				<div className="grid grid-cols-7 gap-1">
					{/* Header */}
					{dayNames.map((d) => (
						<div key={d} className="py-1.5 text-center text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
							{d}
						</div>
					))}
					{/* Days */}
					{grid.map((cell, i) => {
						if (!cell) {
							return <div key={`empty-${i}`} className="aspect-square" />;
						}
						const weekend = isWeekend(cell.day);
						return (
							<div
								key={`day-${cell.day}`}
								className={cn(
									"flex aspect-square flex-col items-center justify-center rounded-lg text-xs transition-all",
									weekend
										? "bg-muted/50 text-muted-foreground"
										: statusStyle[cell.status],
									!weekend && "cursor-default hover:ring-2 hover:ring-primary/30"
								)}
							>
								<span className="text-[10px] leading-none opacity-60">{cell.day}</span>
								<span className="text-xs font-bold leading-none">
									{weekend ? "—" : cell.status}
								</span>
							</div>
						);
					})}
				</div>
			</CardContent>
		</Card>
	);
}

// --- Main Tab ---
export default function AttendanceTab() {
	return (
		<div className="space-y-6">
			{/* Summary Stats */}
			<div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
				<Card className="border-none bg-green-500/5 shadow-sm">
					<CardContent className="flex items-center gap-3 p-4">
						<div className="rounded-full bg-green-500/10 p-2 text-green-600">
							<CheckCircle2 className="h-4 w-4" />
						</div>
						<div>
							<p className="text-[10px] text-muted-foreground">Present</p>
							<p className="text-lg font-bold text-green-700">{totalPresent}</p>
						</div>
					</CardContent>
				</Card>
				<Card className="border-none bg-red-500/5 shadow-sm">
					<CardContent className="flex items-center gap-3 p-4">
						<div className="rounded-full bg-red-500/10 p-2 text-red-600">
							<XCircle className="h-4 w-4" />
						</div>
						<div>
							<p className="text-[10px] text-muted-foreground">Absent</p>
							<p className="text-lg font-bold text-red-700">{totalAbsent}</p>
						</div>
					</CardContent>
				</Card>
				<Card className="border-none bg-yellow-500/5 shadow-sm">
					<CardContent className="flex items-center gap-3 p-4">
						<div className="rounded-full bg-yellow-500/10 p-2 text-yellow-600">
							<Clock className="h-4 w-4" />
						</div>
						<div>
							<p className="text-[10px] text-muted-foreground">Late</p>
							<p className="text-lg font-bold text-yellow-700">{totalLate}</p>
						</div>
					</CardContent>
				</Card>
				<Card className="border-none bg-blue-500/5 shadow-sm">
					<CardContent className="flex items-center gap-3 p-4">
						<div className="rounded-full bg-blue-500/10 p-2 text-blue-600">
							<Calendar className="h-4 w-4" />
						</div>
						<div>
							<p className="text-[10px] text-muted-foreground">Leave</p>
							<p className="text-lg font-bold text-blue-700">{totalLeave}</p>
						</div>
					</CardContent>
				</Card>
				<Card className="border-none bg-purple-500/5 shadow-sm">
					<CardContent className="flex items-center gap-3 p-4">
						<div className="rounded-full bg-purple-500/10 p-2 text-purple-600">
							<CheckCircle2 className="h-4 w-4" />
						</div>
						<div>
							<p className="text-[10px] text-muted-foreground">Rate</p>
							<p className="text-lg font-bold text-purple-700">{attendancePercent}%</p>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Streak & Quick Info */}
			<div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
				<Card className="border-none shadow-sm">
					<CardContent className="p-4 text-center">
						<p className="text-3xl font-bold text-primary">{streakData.currentStreak}</p>
						<p className="mt-1 text-xs text-muted-foreground">Current Streak (days)</p>
					</CardContent>
				</Card>
				<Card className="border-none shadow-sm">
					<CardContent className="p-4 text-center">
						<p className="text-3xl font-bold text-green-600">{streakData.longestStreak}</p>
						<p className="mt-1 text-xs text-muted-foreground">Longest Streak</p>
					</CardContent>
				</Card>
				<Card className="border-none shadow-sm">
					<CardContent className="p-4 text-center">
						<p className="text-3xl font-bold">{streakData.totalWorkingDays}</p>
						<p className="mt-1 text-xs text-muted-foreground">Total Working Days</p>
					</CardContent>
				</Card>
				<Card className="border-none shadow-sm">
					<CardContent className="p-4 text-center">
						<p className="text-3xl font-bold text-yellow-600">{streakData.consecutiveLateCount}</p>
						<p className="mt-1 text-xs text-muted-foreground">Consecutive Late</p>
					</CardContent>
				</Card>
			</div>

			{/* Daily Attendance Calendar */}
			<AttendanceCalendar />

			{/* Charts Row */}
			<div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
				{/* Monthly Stacked Bar */}
				<Card className="border-none shadow-sm lg:col-span-2">
					<CardHeader className="border-b pb-3">
						<CardTitle className="text-base font-semibold">Monthly Attendance Breakdown</CardTitle>
					</CardHeader>
					<CardContent className="pt-4">
						<ChartContainer config={barConfig} className="h-[260px] w-full">
							<BarChart data={monthlyAttendance} margin={{ top: 5, right: 10, left: -15, bottom: 5 }}>
								<CartesianGrid strokeDasharray="3 3" vertical={false} />
								<XAxis dataKey="month" fontSize={12} tickLine={false} axisLine={false} />
								<YAxis fontSize={12} tickLine={false} axisLine={false} />
								<ChartTooltip content={<ChartTooltipContent />} />
								<Bar dataKey="present" stackId="a" fill="var(--color-present)" />
								<Bar dataKey="leave" stackId="a" fill="var(--color-leave)" />
								<Bar dataKey="late" stackId="a" fill="var(--color-late)" />
								<Bar dataKey="absent" stackId="a" fill="var(--color-absent)" radius={[4, 4, 0, 0]} />
							</BarChart>
						</ChartContainer>
					</CardContent>
				</Card>

				{/* Pie Chart */}
				<Card className="border-none shadow-sm">
					<CardHeader className="border-b pb-3">
						<CardTitle className="text-base font-semibold">Overall Breakdown</CardTitle>
					</CardHeader>
					<CardContent className="pt-4">
						<ChartContainer config={pieConfig} className="mx-auto h-[180px] w-full max-w-[220px]">
							<PieChart>
								<ChartTooltip content={<ChartTooltipContent hideLabel />} />
								<Pie data={attendanceSummary} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={4}>
									{attendanceSummary.map((entry, index) => (
										<Cell key={index} fill={entry.fill} />
									))}
								</Pie>
							</PieChart>
						</ChartContainer>
						<div className="mt-3 flex flex-wrap justify-center gap-3">
							{attendanceSummary.map((s) => (
								<div key={s.name} className="flex items-center gap-1.5 text-xs">
									<div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: s.fill }} />
									<span className="font-medium">{s.name}</span>
									<span className="text-muted-foreground">({s.value})</span>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Attendance % Trend */}
			<Card className="border-none shadow-sm">
				<CardHeader className="border-b pb-3">
					<CardTitle className="text-base font-semibold">Attendance Rate Trend (%)</CardTitle>
				</CardHeader>
				<CardContent className="pt-4">
					<ChartContainer config={lineConfig} className="h-[200px] w-full">
						<LineChart data={attendancePercentTrend} margin={{ top: 5, right: 10, left: -15, bottom: 5 }}>
							<CartesianGrid strokeDasharray="3 3" vertical={false} />
							<XAxis dataKey="month" fontSize={12} tickLine={false} axisLine={false} />
							<YAxis domain={[70, 100]} fontSize={12} tickLine={false} axisLine={false} />
							<ChartTooltip content={<ChartTooltipContent />} />
							<Line type="monotone" dataKey="percent" stroke="var(--color-percent)" strokeWidth={2.5} dot={{ r: 4, fill: "hsl(262, 83%, 58%)" }} />
						</LineChart>
					</ChartContainer>
				</CardContent>
			</Card>

			{/* Recent Absences / Leave Log */}
			<Card className="border-none shadow-sm">
				<CardHeader className="border-b pb-3">
					<CardTitle className="text-base font-semibold">Recent Absences & Leave Log</CardTitle>
				</CardHeader>
				<CardContent className="pt-0">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="font-semibold">Date</TableHead>
								<TableHead className="font-semibold">Day</TableHead>
								<TableHead className="text-center font-semibold">Type</TableHead>
								<TableHead className="font-semibold">Reason</TableHead>
								<TableHead className="text-center font-semibold">Status</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{recentAbsences.map((absence, i) => (
								<TableRow key={i}>
									<TableCell className="font-medium">{absence.date}</TableCell>
									<TableCell className="text-muted-foreground">{absence.day}</TableCell>
									<TableCell className="text-center">
										<span className={cn(
											"inline-flex h-6 w-6 items-center justify-center rounded text-xs font-bold",
											absence.type === "A" ? statusStyle.A : statusStyle.L
										)}>
											{absence.type}
										</span>
									</TableCell>
									<TableCell>{absence.reason}</TableCell>
									<TableCell className="text-center">
										<Badge variant={absence.status === "Excused" ? "secondary" : "destructive"} className="text-xs">
											{absence.status}
										</Badge>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	);
}
