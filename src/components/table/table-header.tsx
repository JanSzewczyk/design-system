import * as React from "react";

import { cn } from "~/utils";

export type TableHeaderProps = React.ComponentProps<"thead">;

export function TableHeader({ className, ...props }: TableHeaderProps) {
  return <thead data-slot="table-header" className={cn("[&_tr]:border-b", className)} {...props} />;
}
