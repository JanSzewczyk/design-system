import * as React from "react";

import { cn } from "~/utils";

export type EmptyTitleProps = React.ComponentProps<"div">;

export function EmptyTitle({ className, ...props }: EmptyTitleProps) {
  return <div className={cn("font-medium text-lg tracking-tight", className)} data-slot="empty-title" {...props} />;
}
