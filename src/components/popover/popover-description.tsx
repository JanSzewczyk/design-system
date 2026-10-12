import * as React from "react";

import { cn } from "~/utils";

export type PopoverDescriptionProps = React.ComponentProps<"p">;

export function PopoverDescription({ className, ...props }: PopoverDescriptionProps) {
  return <p className={cn("text-muted-foreground", className)} data-slot="popover-description" {...props} />;
}
