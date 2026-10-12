import * as React from "react";

import { cn } from "~/utils";

export type TableHeaderProps = React.ComponentProps<"thead">;

export function TableHeader({ className, ...props }: TableHeaderProps) {
  return <thead className={cn("[&_tr]:border-b", className)} data-slot="table-header" {...props} />;
}
