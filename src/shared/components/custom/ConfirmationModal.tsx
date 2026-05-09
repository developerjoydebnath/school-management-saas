"use client";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/shared/components/ui/alert-dialog";
import { useTranslations } from "next-intl";

interface ConfirmationModalProps {
	children: React.ReactNode;
	onConfirm: () => void;
	title?: string;
	description?: string;
	confirmText?: string;
	cancelText?: string;
	isLoading?: boolean;
	variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
}

export default function ConfirmationModal({
	children,
	onConfirm,
	title = "Are you sure?",
	description = "This action cannot be undone.",
	confirmText,
	cancelText,
	isLoading = false,
	variant = "default",
}: ConfirmationModalProps) {
	const t = useTranslations("Forms");

	const cancelAltText = cancelText || t("cancel");
	const confirmAltText = confirmText || t("confirm");
	const titleAltText = title || t("areYouSure");
	const descriptionAltText = description || t("thisActionCannotBeUndone");

	return (
		<AlertDialog>
			{children}
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>{titleAltText}</AlertDialogTitle>
					<AlertDialogDescription>{descriptionAltText}</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel disabled={isLoading}>{cancelAltText}</AlertDialogCancel>
					<AlertDialogAction onClick={onConfirm} disabled={isLoading} variant={variant}>
						{isLoading ? t("processing") : confirmAltText}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
