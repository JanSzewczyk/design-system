import * as React from "react";

import { cn } from "~/utils";

export type EmptyHeaderProps = React.ComponentProps<"div">;

export function EmptyHeader({ className, ...props }: EmptyHeaderProps) {
  return (
    <div
      data-slot="empty-header"
      className={cn("flex max-w-sm flex-col items-center gap-2 text-center", className)}
      {...props}
    />
  );
}
