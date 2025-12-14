import * as React from "react";

import { cn } from "~/utils";

export type AlertTitleProps = React.ComponentProps<"div">;

export function AlertTitle({ className, ...props }: AlertTitleProps) {
  return (
    <div
      data-slot="alert-title"
      className={cn("col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight", className)}
      {...props}
    />
  );
}
