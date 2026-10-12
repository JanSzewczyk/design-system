import { Slot as SlotPrimitive } from "radix-ui";
import React from "react";

import { cn } from "~/utils";

export type BadgeButtonProps = React.ComponentProps<"button"> & { asChild?: boolean };

export function BadgeButton({ className, asChild = false, ...props }: BadgeButtonProps) {
  const Comp = asChild ? SlotPrimitive.Slot : "span";
  return (
    <Comp
      className={cn(
        "-me-0.5 inline-flex size-3.5 cursor-pointer items-center justify-center rounded-md p-0 leading-none opacity-60 transition-all hover:opacity-100 [&>svg]:size-3.5! [&>svg]:opacity-100!",
        className
      )}
      data-slot="badge-button"
      role="button"
      {...props}
    />
  );
}
