import * as React from "react";

import { cn } from "~/utils";

export type SheetHeaderProps = React.ComponentProps<"div">;

export function SheetHeader({ className, ...props }: SheetHeaderProps) {
  return <div data-slot="sheet-header" className={cn("flex flex-col gap-0.5 p-4", className)} {...props} />;
}
