import * as React from "react";

import { twMerge } from "tailwind-merge";

export type CardProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export function Card({ className, ...props }: CardProps) {
  return <div className={twMerge("bg-app-foreground h-full rounded border border-gray-400", className)} {...props} />;
}
