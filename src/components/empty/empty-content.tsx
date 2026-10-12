import * as React from "react";

import { cn } from "~/utils";

export type EmptyContentProps = React.ComponentProps<"div">;

export function EmptyContent({ className, ...props }: EmptyContentProps) {
  return (
    <div
      className={cn("flex w-full min-w-0 max-w-sm flex-col items-center gap-4 text-balance text-sm", className)}
      data-slot="empty-content"
      {...props}
    />
  );
}
