import * as React from "react";

import { cn } from "~/utils";

export type TableCaptionProps = React.ComponentProps<"caption">;

export function TableCaption({ className, ...props }: TableCaptionProps) {
  return (
    <caption className={cn("mt-4 text-muted-foreground text-sm", className)} data-slot="table-caption" {...props} />
  );
}
