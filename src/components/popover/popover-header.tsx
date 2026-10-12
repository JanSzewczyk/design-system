import * as React from "react";

import { cn } from "~/utils";

export type PopoverHeaderProps = React.ComponentProps<"div">;

export function PopoverHeader({ className, ...props }: PopoverHeaderProps) {
  return <div className={cn("flex flex-col gap-0.5 text-sm", className)} data-slot="popover-header" {...props} />;
}
