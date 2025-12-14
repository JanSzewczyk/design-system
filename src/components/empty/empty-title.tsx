import * as React from "react";

import { cn } from "~/utils";

export type EmptyTitleProps = React.ComponentProps<"div">;

export function EmptyTitle({ className, ...props }: EmptyTitleProps) {
  return <div data-slot="empty-title" className={cn("text-lg font-medium tracking-tight", className)} {...props} />;
}
