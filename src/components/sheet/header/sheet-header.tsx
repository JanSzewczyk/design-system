import * as React from "react";

import { twMerge } from "tailwind-merge";

export type SheetHeaderProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export function SheetHeader({ className, ...props }: SheetHeaderProps) {
  return <div className={twMerge("flex flex-col space-y-2 text-center sm:text-left", className)} {...props} />;
}
