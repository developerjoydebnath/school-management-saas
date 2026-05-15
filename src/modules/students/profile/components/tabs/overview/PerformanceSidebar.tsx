"use client";

import { Badge } from "@/shared/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Progress } from "@/shared/components/ui/progress";
import { Activity, Calendar, Phone } from "lucide-react";
import { useTranslations } from "next-intl";

interface PerformanceSidebarProps {
	student: any;
}

const subjectPerformance = [
	{ subject: "Bangla", score: 90 },
	{ subject: "English", score: 85 },
	{ subject: "Mathematics", score: 92 },
	{ subject: "Science", score: 88 },
	{ subject: "Social Science", score: 84 },
	{ subject: "Religion", score: 91 },
	{ subject: "ICT", score: 78 },
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

export function PerformanceSidebar({ student }: PerformanceSidebarProps) {
	const t = useTranslations("StudentProfile");

	return (
		<div className="space-y-6">
			{/* Subject Progress */}
			<Card className="gap-2">
				<CardHeader className="border-b pb-3">
					<CardTitle className="flex items-center gap-2 text-base font-semibold">
						<Activity className="text-muted-foreground h-4 w-4" />
						{t("performance")}
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4 pt-4">
					{subjectPerformance.map((sub) => (
						<div key={sub.subject} className="space-y-1.5">
							<div className="flex items-center justify-between text-sm">
								<span className="font-medium">{sub.subject}</span>
								<span className="text-muted-foreground text-xs">
									{sub.score}%
								</span>
							</div>
							<Progress value={sub.score} className="h-1.5" />
						</div>
					))}
				</CardContent>
			</Card>

			{/* Upcoming Events */}
			<Card className="gap-2">
				<CardHeader className="border-b pb-3">
					<CardTitle className="flex items-center gap-2 text-base font-semibold">
						<Calendar className="text-muted-foreground h-4 w-4" />
						Upcoming Events
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-3 pt-4">
					{upcomingEvents.map((event, i) => (
						<div key={i} className="flex items-center gap-3">
							<Badge
								variant="outline"
								className={`shrink-0 text-[10px] ${eventColors[event.type]}`}
							>
								{event.type}
							</Badge>
							<div className="min-w-0 flex-1">
								<p className="truncate text-sm font-medium">
									{event.title}
								</p>
								<p className="text-muted-foreground text-xs">
									{event.date}
								</p>
							</div>
						</div>
					))}
				</CardContent>
			</Card>

			{/* Recent Activity */}
			<Card className="gap-2">
				<CardHeader className="border-b pb-3">
					<CardTitle className="flex items-center gap-2 text-base font-semibold">
						<Activity className="text-muted-foreground h-4 w-4" />
						{t("recentActivity")}
					</CardTitle>
				</CardHeader>
				<CardContent className="pt-4">
					<div className="space-y-4">
						{recentActivity.map((act, i) => (
							<div key={i} className="flex gap-3">
								<div
									className={`mt-1 h-2 w-2 shrink-0 rounded-full ${activityColors[act.type]}`}
								/>
								<div>
									<p className="text-sm leading-tight font-medium">
										{act.title}
									</p>
									<p className="text-muted-foreground mt-0.5 text-xs">
										{act.date}
									</p>
								</div>
							</div>
						))}
					</div>
				</CardContent>
			</Card>

			{/* Emergency Contact Card */}
			<Card className="gap-4 bg-red-500/5">
				<CardHeader className="pb-2">
					<CardTitle className="flex items-center gap-2 text-base font-semibold text-red-700">
						<Phone className="h-4 w-4" />
						Emergency Contact
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-2">
					<div>
						<p className="text-muted-foreground text-xs">Father</p>
						<p className="text-sm font-semibold">{student.mobile || "—"}</p>
					</div>
					<div>
						<p className="text-muted-foreground text-xs">Emergency</p>
						<p className="text-sm font-semibold">
							{student.emergencyContact || "—"}
						</p>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
