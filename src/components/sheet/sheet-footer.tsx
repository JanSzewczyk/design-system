import * as React from "react";

import { cn } from "~/utils";

export type SheetFooterProps = React.ComponentProps<"div">;

export function SheetFooter({ className, ...props }: SheetFooterProps) {
  return <div className={cn("mt-auto flex flex-col gap-2 p-4", className)} data-slot="sheet-footer" {...props} />;
}
