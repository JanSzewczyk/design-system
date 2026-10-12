import * as React from "react";

import { cn } from "~/utils";

export function BreadcrumbList({ className, ...props }: React.ComponentProps<"ol">) {
  return (
    <ol
      className={cn(
        "flex flex-wrap items-center gap-1.5 break-words text-muted-foreground text-sm sm:gap-2.5",
        className
      )}
      data-slot="breadcrumb-list"
      {...props}
    />
  );
}
