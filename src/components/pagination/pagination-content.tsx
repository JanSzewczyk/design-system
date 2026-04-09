import * as React from "react";

import { cn } from "~/utils";

export type PaginationContentProps = React.ComponentProps<"ul">;

export function PaginationContent({ className, ...props }: PaginationContentProps) {
  return <ul data-slot="pagination-content" className={cn("flex items-center gap-0.5", className)} {...props} />;
}
