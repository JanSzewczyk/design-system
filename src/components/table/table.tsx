import * as React from "react";

import { cn } from "~/utils";

export type TableProps = React.ComponentProps<"table">;

export function Table({ className, ...props }: TableProps) {
  return (
    <div className="relative w-full overflow-x-auto" data-slot="table-container">
      <table className={cn("w-full caption-bottom text-sm", className)} data-slot="table" {...props} />
    </div>
  );
}
