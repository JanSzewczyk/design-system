import * as React from "react";

import { cn } from "~/utils";

export type PaginationContentProps = React.ComponentProps<"ul">;

export function PaginationContent({ className, ...props }: PaginationContentProps) {
  return <ul className={cn("flex items-center gap-0.5", className)} data-slot="pagination-content" {...props} />;
}
