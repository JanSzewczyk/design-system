import * as React from "react";

import { cn } from "~/utils";

export type CardDescriptionProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export function CardDescription({ className, ...props }: CardDescriptionProps) {
  return <p className={cn("text-body-2 text-gray-300", className)} {...props} />;
}
