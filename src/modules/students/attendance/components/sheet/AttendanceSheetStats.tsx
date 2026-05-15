"use client";

import { Card, CardContent } from "@/shared/components/ui/card";
import { Clock, TrendingUp, UserCheck, UserMinus, Users } from "lucide-react";

interface AttendanceSheetStatsProps {
	stats: {
		total: number;
		present: number;
		absent: number;
		late: number;
		rate: number;
	};
}

export function AttendanceSheetStats({ stats }: AttendanceSheetStatsProps) {
	return (
		<div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
			<Card className="border-none bg-blue-500/5 shadow-sm">
				<CardContent className="flex items-center gap-2.5 p-3">
					<div className="rounded-full bg-blue-500/10 p-2 text-blue-600">
						<Users className="h-4 w-4" />
					</div>
					<div>
						<p className="text-muted-foreground text-[10px]">Total</p>
						<p className="text-lg font-bold text-blue-700">{stats.total}</p>
					</div>
				</CardContent>
			</Card>
			<Card className="border-none bg-green-500/5 shadow-sm">
				<CardContent className="flex items-center gap-2.5 p-3">
					<div className="rounded-full bg-green-500/10 p-2 text-green-600">
						<UserCheck className="h-4 w-4" />
					</div>
					<div>
						<p className="text-muted-foreground text-[10px]">Present</p>
						<p className="text-lg font-bold text-green-700">
							{stats.present}
						</p>
					</div>
				</CardContent>
			</Card>
			<Card className="border-none bg-red-500/5 shadow-sm">
				<CardContent className="flex items-center gap-2.5 p-3">
					<div className="rounded-full bg-red-500/10 p-2 text-red-600">
						<UserMinus className="h-4 w-4" />
					</div>
					<div>
						<p className="text-muted-foreground text-[10px]">Absent</p>
						<p className="text-lg font-bold text-red-700">{stats.absent}</p>
					</div>
				</CardContent>
			</Card>
			<Card className="border-none bg-amber-500/5 shadow-sm">
				<CardContent className="flex items-center gap-2.5 p-3">
					<div className="rounded-full bg-amber-500/10 p-2 text-amber-600">
						<Clock className="h-4 w-4" />
					</div>
					<div>
						<p className="text-muted-foreground text-[10px]">Late</p>
						<p className="text-lg font-bold text-amber-700">{stats.late}</p>
					</div>
				</CardContent>
			</Card>
			<Card className="border-none bg-emerald-500/5 shadow-sm">
				<CardContent className="flex items-center gap-2.5 p-3">
					<div className="rounded-full bg-emerald-500/10 p-2 text-emerald-600">
						<TrendingUp className="h-4 w-4" />
					</div>
					<div>
						<p className="text-muted-foreground text-[10px]">Rate</p>
						<p className="text-lg font-bold text-emerald-700">
							{stats.rate}%
						</p>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
