import * as React from "react";

import { twMerge } from "tailwind-merge";

export type DialogHeaderProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export function DialogHeader({ className, ...props }: DialogHeaderProps) {
  return <div className={twMerge("mb-4 flex flex-col space-y-1.5 text-center sm:text-left", className)} {...props} />;
}
