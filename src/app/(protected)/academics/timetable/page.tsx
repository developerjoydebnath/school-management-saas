"use client";

import TimetableView from "@/modules/academics/timetable/components/TimetableView";
import PageHeading from "@/shared/components/custom/PageHeading";
import { PATHS } from "@/shared/configs/paths.config";
import { useBreadcrumbStore } from "@/shared/stores/breadcrumb-store";
import { useEffect } from "react";

export default function TimetablePage() {
	const { setBreadcrumbs } = useBreadcrumbStore();

	useEffect(() => {
		setBreadcrumbs([
			{ label: "Dashboard", href: PATHS.DASHBOARD },
			{ label: "Academics", href: PATHS.ACADEMICS.ROOT },
			{ label: "Timetable", href: PATHS.ACADEMICS.TIMETABLE.ROOT },
		]);
	}, [setBreadcrumbs]);

	return (
		<div className="min-w-0 space-y-6">
			<PageHeading routeName="Timetable" />
			<div className="w-full min-w-0">
				<TimetableView />
			</div>
		</div>
	);
}
