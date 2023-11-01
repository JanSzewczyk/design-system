import * as React from "react";

import { twMerge } from "tailwind-merge";

export type DialogFooterProps = React.HTMLAttributes<HTMLDivElement>;

export function DialogFooter({ className, ...props }: DialogFooterProps) {
  return (
    <div
      className={twMerge(
        "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
        className
      )}
      {...props}
    />
  );
}
