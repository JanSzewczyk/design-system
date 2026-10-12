import * as React from "react";

import { cn } from "~/utils";

export type PaginationProps = React.ComponentProps<"nav">;

export function Pagination({ className, ...props }: PaginationProps) {
  return (
    <nav
      aria-label="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      data-slot="pagination"
      role="navigation"
      {...props}
    />
  );
}
