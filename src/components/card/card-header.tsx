import * as React from "react";

import { twMerge } from "tailwind-merge";

export type CardHeaderProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export function CardHeader({ className, ...props }: CardHeaderProps) {
  return <div className={twMerge("flex flex-col p-6", className)} {...props} />;
}
