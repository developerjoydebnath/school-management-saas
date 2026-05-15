"use client";

import { Calendar } from "@/shared/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";

interface AttendanceCalendarProps {
	selectedDate: Date;
	setSelectedDate: (date: Date) => void;
	today: Date;
}

export function AttendanceCalendar({
	selectedDate,
	setSelectedDate,
	today,
}: AttendanceCalendarProps) {
	return (
		<Card className="border-none shadow-sm">
			<CardHeader className="border-b pb-3">
				<CardTitle className="text-sm font-semibold">Select Date</CardTitle>
			</CardHeader>
			<CardContent className="flex justify-center pt-4">
				<Calendar
					mode="single"
					selected={selectedDate}
					onSelect={(d) => {
						if (d) setSelectedDate(d);
					}}
					disabled={(date) => {
						const dateOnly = new Date(date);
						dateOnly.setHours(0, 0, 0, 0);
						return dateOnly > today || date.getDay() === 5;
					}}
					className="rounded-md"
				/>
			</CardContent>
		</Card>
	);
}
