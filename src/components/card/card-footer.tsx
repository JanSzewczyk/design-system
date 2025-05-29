import * as React from "react";

import { cn } from "~/utils";

export type CardFooterProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export function CardFooter({ className, ...props }: CardFooterProps) {
  return <div className={cn("flex items-center p-6 pt-0", className)} {...props} />;
}
