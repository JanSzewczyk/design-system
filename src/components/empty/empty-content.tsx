import * as React from "react";

import { cn } from "~/utils";

export type EmptyContentProps = React.ComponentProps<"div">;

export function EmptyContent({ className, ...props }: EmptyContentProps) {
  return (
    <div
      data-slot="empty-content"
      className={cn("flex w-full max-w-sm min-w-0 flex-col items-center gap-4 text-sm text-balance", className)}
      {...props}
    />
  );
}
