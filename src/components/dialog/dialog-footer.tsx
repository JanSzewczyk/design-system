import * as React from "react";

import { cn } from "~/utils";

export type DialogFooterProps = React.ComponentProps<"div">;

export function DialogFooter({ className, ...props }: DialogFooterProps) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)}
      {...props}
    />
  );
}
