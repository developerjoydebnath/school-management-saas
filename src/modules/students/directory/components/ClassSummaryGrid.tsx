"use client";

import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/shared/components/ui/select";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { useSWR } from "@/shared/hooks/use-swr";
import { getLocalizedName } from "@/shared/utils/localization";
import { ArrowRight, GraduationCap, Users } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { useMemo, useState } from "react";

export default function ClassSummaryGrid() {
	const t = useTranslations("StudentsDirectory");
	const locale = useLocale();
	const [selectedSession, setSelectedSession] = useState<string>("all");

	const { data: classes, isLoading: isLoadingClasses } = useSWR("/classes");
	const { data: students, isLoading: isLoadingStudents } = useSWR("/students");
	const { data: sessions, isLoading: isLoadingSessions } = useSWR("/sessions");

	const isLoading = isLoadingClasses || isLoadingStudents || isLoadingSessions;

	const classSummaries = useMemo(() => {
		if (!classes || !students) return [];

		return classes.map((cls: any) => {
			const sections = cls.sections || [];
			const filteredStudents = students.filter((s: any) => {
				const matchesClass = s.class === cls.id || s.class === `class-${cls.id}`;
				const matchesSession = selectedSession === "all" || s.session === selectedSession;
				return matchesClass && matchesSession;
			});

			const sectionCounts = sections.map((sec: any) => ({
				name: typeof sec === "string" ? sec : sec.name || sec,
				count: filteredStudents.filter(
					(s: any) => s.section === (typeof sec === "string" ? sec : sec.name || sec)
				).length,
			}));

			return {
				id: cls.id,
				name: cls.name,
				totalStudents: filteredStudents.length,
				sections: sectionCounts,
			};
		});
	}, [classes, students, selectedSession]);

	return (
		<div className="space-y-6">
			{/* Session Filter */}
			<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<h2 className="text-lg font-semibold">{t("classOverview")}</h2>
				<div className="w-full sm:w-[220px]">
					<Select value={selectedSession} onValueChange={setSelectedSession}>
						<SelectTrigger className="bg-background h-10! w-full">
							<SelectValue placeholder={t("selectSession")} />
						</SelectTrigger>
						<SelectContent className="p-1">
							<SelectItem value="all" className="p-2">
								{t("allSessions")}
							</SelectItem>
							{sessions?.map((session: any) => (
								<SelectItem key={session.id} value={session.id} className="p-2">
									{getLocalizedName(session.name, locale)}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
			</div>

			{/* Cards Grid */}
			{isLoading ? (
				<div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					{Array.from({ length: 8 }).map((_, i) => (
						<Skeleton key={i} className="h-[200px] rounded-xl" />
					))}
				</div>
			) : classSummaries.length === 0 ? (
				<Card className="border-dashed py-16 text-center">
					<CardContent>
						<GraduationCap className="text-muted-foreground/40 mx-auto h-12 w-12" />
						<p className="text-muted-foreground mt-4">{t("noClasses")}</p>
					</CardContent>
				</Card>
			) : (
				<div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					{classSummaries.map((cls: any) => (
						<div key={cls.id}>
							<Card className="group h-full">
								<CardHeader className="pb-3">
									<div className="flex items-center justify-between">
										<CardTitle className="text-base font-bold">
											{getLocalizedName(cls.name, locale)}
										</CardTitle>
										<div className="bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground flex h-9 w-9 items-center justify-center rounded-lg transition-colors">
											<GraduationCap className="h-4.5 w-4.5" />
										</div>
									</div>
								</CardHeader>
								<CardContent className="space-y-4">
									<div className="flex items-center gap-2">
										<Users className="text-muted-foreground h-4 w-4" />
										<span className="text-muted-foreground text-sm">
											{t("totalStudents")}:
										</span>
										<span className="text-lg font-bold">
											{cls.totalStudents}
										</span>
									</div>

									{cls.sections.length > 0 && (
										<div className="space-y-2">
											<p className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
												{t("sections")}
											</p>
											<div className="flex flex-wrap gap-2">
												{cls.sections.map((sec: any) => (
													<Badge
														key={sec.name}
														variant="secondary"
														className="gap-1 text-xs"
													>
														{sec.name}
														<span className="text-muted-foreground">
															({sec.count})
														</span>
													</Badge>
												))}
											</div>
										</div>
									)}

									<Link
										key={cls.id}
										href={`/students/directory/${cls.id}${selectedSession !== "all" ? `?session=${selectedSession}` : ""}`}
										passHref
									>
										<Button
											variant="ghost"
											size="sm"
											className="group-hover:bg-primary/10 group-hover:text-primary w-full gap-2 text-xs font-semibold transition-all"
										>
											{t("viewStudents")}
											<ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
										</Button>
									</Link>
								</CardContent>
							</Card>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
