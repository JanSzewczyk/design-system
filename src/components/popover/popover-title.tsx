import * as React from "react";

import { cn } from "~/utils";

export type PopoverTitleProps = React.ComponentProps<"h2">;

export function PopoverTitle({ className, ...props }: PopoverTitleProps) {
  return <h2 className={cn("font-medium", className)} data-slot="popover-title" {...props} />;
}
