import * as React from "react";

import { cn } from "~/utils";

export function BreadcrumbItem({ className, ...props }: React.ComponentProps<"li">) {
  return <li className={cn("inline-flex items-center gap-1.5", className)} data-slot="breadcrumb-item" {...props} />;
}
