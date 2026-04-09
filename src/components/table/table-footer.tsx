import * as React from "react";

import { cn } from "~/utils";

export type TableFooterProps = React.ComponentProps<"tfoot">;

export function TableFooter({ className, ...props }: TableFooterProps) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn("bg-muted/50 border-t font-medium [&>tr]:last:border-b-0", className)}
      {...props}
    />
  );
}
