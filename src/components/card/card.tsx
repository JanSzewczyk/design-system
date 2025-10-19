import * as React from "react";

import { cn } from "~/utils";

export type CardProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export function Card({ className, ...props }: CardProps) {
  return <div className={cn("bg-app-foreground h-full rounded border border-gray-800", className)} {...props} />;
}
