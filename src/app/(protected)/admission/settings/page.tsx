"use client";

import AdmissionSettingsTabs from "@/modules/admission/admission-settings/components/AdmissionSettingsTabs";
import PageHeading from "@/shared/components/custom/PageHeading";
import { PATHS } from "@/shared/configs/paths.config";
import { useBreadcrumbStore } from "@/shared/stores/breadcrumb-store";
import { useEffect } from "react";

export default function AdmissionSettingsPage() {
	const { setBreadcrumbs } = useBreadcrumbStore();

	useEffect(() => {
		setBreadcrumbs([
			{ label: "Home", href: "/" },
			{ label: "Dashboard", href: PATHS.DASHBOARD },
			{ label: "Admission Management", href: PATHS.ADMISSION.ROOT },
			{ label: "Admission Settings", href: PATHS.ADMISSION.SETTINGS.ROOT },
		]);
	}, [setBreadcrumbs]);

	return (
		<div className="space-y-6">
			<PageHeading routeName="AdmissionSettings" />
			<AdmissionSettingsTabs />
		</div>
	);
}
