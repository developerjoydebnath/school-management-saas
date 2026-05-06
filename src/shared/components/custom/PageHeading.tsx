"use client";

import { cn } from "@/shared/lib/utils";
import { useEffect, useState } from "react";

type Props = {
	heading: string;
	subHeading: string;
	children?: React.ReactNode;
	className?: string;
};

export default function PageHeading({ heading, subHeading, children, className }: Props) {
	const [time, setTime] = useState(new Date());

	useEffect(() => {
		const timer = setInterval(() => setTime(new Date()), 1000);
		return () => clearInterval(timer);
	}, []);

	return (
		<div className={cn("flex items-center justify-between gap-4", className)}>
			<div className="flex flex-col gap-1">
				<h1 className="text-2xl font-bold">{heading}</h1>
				<p className="text-muted-foreground text-sm">{subHeading}</p>
			</div>
			{children}
		</div>
	);
}
