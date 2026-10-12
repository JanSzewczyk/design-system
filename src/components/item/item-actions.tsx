import * as React from "react";

import { cn } from "~/utils";

export type ItemActionsProps = React.ComponentProps<"div">;

export function ItemActions({ className, ...props }: ItemActionsProps) {
  return <div className={cn("flex items-center gap-2", className)} data-slot="item-actions" {...props} />;
}
