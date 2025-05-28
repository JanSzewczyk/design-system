import * as React from "react";

import { twMerge } from "tailwind-merge";

export type AlertDialogFooterProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export function AlertDialogFooter({ className, ...props }: AlertDialogFooterProps) {
  return <div className={twMerge("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)} {...props} />;
}
