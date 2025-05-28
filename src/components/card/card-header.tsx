import * as React from "react";

import { cn } from "~/utils";

export type CardHeaderProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export function CardHeader({ className, ...props }: CardHeaderProps) {
  return <div className={cn("flex flex-col p-6", className)} {...props} />;
}
