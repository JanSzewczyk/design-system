import * as React from "react";

import { cn } from "~/utils";

export type TableCellProps = React.ComponentProps<"td">;

export function TableCell({ className, ...props }: TableCellProps) {
  return (
    <td
      className={cn("whitespace-nowrap p-2 align-middle [&:has([role=checkbox])]:pr-0", className)}
      data-slot="table-cell"
      {...props}
    />
  );
}
