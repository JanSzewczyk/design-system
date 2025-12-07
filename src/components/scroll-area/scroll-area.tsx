import * as React from "react";

import { ScrollArea as ScrollAreaPrimitive } from "radix-ui";

import { cn } from "~/utils";

import { ScrollBar } from "./scroll-bar";

export type ScrollAreaProps = React.ComponentProps<typeof ScrollAreaPrimitive.Root>;

export function ScrollArea({ className, children, ...props }: ScrollAreaProps) {
  return (
    <ScrollAreaPrimitive.Root data-slot="scroll-area" className={cn("relative", className)} {...props}>
      <ScrollAreaPrimitive.Viewport
        data-slot="scroll-area-viewport"
        className="focus-visible:ring-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring focus-visible:outline-1"
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  );
}
