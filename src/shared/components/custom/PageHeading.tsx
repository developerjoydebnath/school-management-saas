import { cn } from "@/shared/lib/utils";

type Props = {
  heading: string;
  subHeading: string;
  children?: React.ReactNode;
  className?: string;
}

export default function PageHeading({
  heading,
  subHeading,
  children,
  className
}: Props) {

  return (
    <div className={cn("flex justify-between items-center gap-4", className)}>
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold">{heading}</h1>
        <p className="text-sm text-muted-foreground">{subHeading}</p>
      </div>
      {children}
    </div>
  );
}
