import * as React from "react";

import { cn } from "~/utils";

export type DialogHeaderProps = React.ComponentProps<"div">;

export function DialogHeader({ className, ...props }: DialogHeaderProps) {
  return (
    <div
      className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
      data-slot="dialog-header"
      {...props}
    />
  );
}
