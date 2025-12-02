import * as React from "react";

import { cn } from "~/utils";

export type DialogHeaderProps = React.ComponentProps<"div">;

export function DialogHeader({ className, ...props }: DialogHeaderProps) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
      {...props}
    />
  );
}
