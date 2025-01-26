import * as React from "react";

import { twMerge } from "tailwind-merge";

export type CardContentProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export function CardContent({ className, ...props }: CardContentProps) {
  return <div className={twMerge("p-6 pt-0", className)} {...props} />;
}
