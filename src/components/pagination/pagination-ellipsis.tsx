import * as React from "react";

import { MoreHorizontalIcon } from "lucide-react";

import { cn } from "~/utils";

export type PaginationEllipsisProps = React.ComponentProps<"span">;

export function PaginationEllipsis({ className, ...props }: PaginationEllipsisProps) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn("flex size-8 items-center justify-center [&_svg:not([class*='size-'])]:size-4", className)}
      {...props}
    >
      <MoreHorizontalIcon />
      <span className="sr-only">More pages</span>
    </span>
  );
}
