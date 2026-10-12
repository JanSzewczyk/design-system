import { MoreHorizontalIcon } from "lucide-react";
import * as React from "react";

import { cn } from "~/utils";

export type PaginationEllipsisProps = React.ComponentProps<"span">;

export function PaginationEllipsis({ className, ...props }: PaginationEllipsisProps) {
  return (
    <span
      aria-hidden
      className={cn("flex size-8 items-center justify-center [&_svg:not([class*='size-'])]:size-4", className)}
      data-slot="pagination-ellipsis"
      {...props}
    >
      <MoreHorizontalIcon />
      <span className="sr-only">More pages</span>
    </span>
  );
}
