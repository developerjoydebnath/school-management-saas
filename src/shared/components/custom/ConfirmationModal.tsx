"use client";

import React, { useState } from "react";
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
	const [open, setOpen] = React.useState(false);

	const cancelAltText = cancelText || t("cancel");
	const confirmAltText = confirmText || t("confirm");
	const titleAltText = title || t("areYouSure");
	const descriptionAltText = description || t("thisActionCannotBeUndone");

	const handleConfirm = async (e: React.MouseEvent) => {
		e.preventDefault(); // Prevent default if any
		try {
			await onConfirm();
			setOpen(false);
		} catch (error) {
			// If it fails, we might want to keep it open
			console.error(error);
		}
	};

	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			{children}
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>{titleAltText}</AlertDialogTitle>
					<AlertDialogDescription>{descriptionAltText}</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel disabled={isLoading} onClick={() => setOpen(false)}>
						{cancelAltText}
					</AlertDialogCancel>
					<AlertDialogAction onClick={handleConfirm} disabled={isLoading} variant={variant}>
						{isLoading ? t("processing") : confirmAltText}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
