"use client";

import PageHeading from "@/shared/components/custom/PageHeading";
import { PATHS } from "@/shared/configs/paths.config";
import { useBreadcrumbStore } from "@/shared/stores/breadcrumb-store";
import { useEffect } from "react";

export default function OnlinePortalPage() {
	const { setBreadcrumbs } = useBreadcrumbStore();

	useEffect(() => {
		setBreadcrumbs([
			{ label: "Home", href: "/" },
			{ label: "Dashboard", href: PATHS.DASHBOARD },
			{ label: "Admission Management", href: PATHS.ADMISSION.ROOT },
			{ label: "Online Portal", href: PATHS.ADMISSION.PORTAL.ROOT },
		]);
	}, [setBreadcrumbs]);

	return (
		<div className="space-y-6">
			<PageHeading routeName="AdmissionPortal" />

			<div className="bg-card rounded-md border p-6">
				<p className="text-muted-foreground text-center">
					Portal Configuration Coming Soon...
				</p>
			</div>
		</div>
	);
}
