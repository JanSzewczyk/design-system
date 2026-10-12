import * as React from "react";

import { cn } from "~/utils";

export type AlertTitleProps = React.ComponentProps<"div">;

export function AlertTitle({ className, ...props }: AlertTitleProps) {
  return (
    <div
      className={cn("col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight", className)}
      data-slot="alert-title"
      {...props}
    />
  );
}
