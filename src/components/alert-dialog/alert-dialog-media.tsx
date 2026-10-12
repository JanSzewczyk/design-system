import * as React from "react";

import { cn } from "~/utils";

export type AlertDialogMediaProps = React.ComponentProps<"div">;

export function AlertDialogMedia({ className, ...props }: AlertDialogMediaProps) {
  return (
    <div
      className={cn(
        "mb-2 inline-flex size-10 items-center justify-center rounded bg-muted sm:group-data-[size=default]/alert-dialog-content:row-span-2 *:[svg:not([class*='size-'])]:size-6",
        className
      )}
      data-slot="alert-dialog-media"
      {...props}
    />
  );
}
