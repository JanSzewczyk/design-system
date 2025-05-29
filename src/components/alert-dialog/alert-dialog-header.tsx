import * as React from "react";

import { cn } from "~/utils";

export type AlertDialogHeaderProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export function AlertDialogHeader({ className, ...props }: AlertDialogHeaderProps) {
  return <div className={cn("mb-4 flex flex-col space-y-2 text-center sm:text-left", className)} {...props} />;
}
