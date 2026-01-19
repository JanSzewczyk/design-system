import * as React from "react";

import { cn } from "~/utils";

export type StatusLabelProps = React.ComponentProps<"div">;

export function StatusLabel({ className, ...labelProps }: StatusLabelProps) {
  return <div data-slot="status-label" {...labelProps} className={cn("leading-none", className)} />;
}
