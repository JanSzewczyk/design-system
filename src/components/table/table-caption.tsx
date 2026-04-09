import * as React from "react";

import { cn } from "~/utils";

export type TableCaptionProps = React.ComponentProps<"caption">;

export function TableCaption({ className, ...props }: TableCaptionProps) {
  return (
    <caption data-slot="table-caption" className={cn("text-muted-foreground mt-4 text-sm", className)} {...props} />
  );
}
