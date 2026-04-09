import * as React from "react";

import { cn } from "~/utils";

export type TableProps = React.ComponentProps<"table">;

export function Table({ className, ...props }: TableProps) {
  return (
    <div data-slot="table-container" className="relative w-full overflow-x-auto">
      <table data-slot="table" className={cn("w-full caption-bottom text-sm", className)} {...props} />
    </div>
  );
}
