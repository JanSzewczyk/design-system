import * as React from "react";

import { cn } from "~/utils";

export type TableCellProps = React.ComponentProps<"td">;

export function TableCell({ className, ...props }: TableCellProps) {
  return (
    <td
      data-slot="table-cell"
      className={cn("p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0", className)}
      {...props}
    />
  );
}
