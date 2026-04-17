import * as React from "react";

import { Tabs as TabsPrimitive } from "radix-ui";

import { cn } from "~/utils";

export type TabsProps = React.ComponentProps<typeof TabsPrimitive.Root>;

export function Tabs({ className, ...props }: TabsProps) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("group/tabs flex gap-2 data-[orientation=horizontal]:flex-col", className)}
      {...props}
    />
  );
}
