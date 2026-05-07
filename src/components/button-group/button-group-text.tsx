import * as React from "react";

import { Slot } from "@radix-ui/react-slot";
import { cn } from "~/utils";

export type ButtonGroupTextProps = React.ComponentProps<"div"> & {
  asChild?: boolean;
};

export function ButtonGroupText({ className, asChild = false, ...props }: ButtonGroupTextProps) {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      data-slot="button-group-text"
      className={cn(
        "bg-muted flex items-center gap-2 rounded-lg border px-2.5 text-sm font-medium [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  );
}
