import * as React from "react";

import { cn } from "~/utils";

export type DialogFooterProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export function DialogFooter({ className, ...props }: DialogFooterProps) {
  return <div className={cn("mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)} {...props} />;
}
