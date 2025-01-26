import * as React from "react";

import { twMerge } from "tailwind-merge";

export type SheetFooterProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export function SheetFooter({ className, ...props }: SheetFooterProps) {
  return (
    <div className={twMerge("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...props} />
  );
}
