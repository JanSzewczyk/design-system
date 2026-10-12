import { Tabs as TabsPrimitive } from "radix-ui";
import * as React from "react";

import { cn } from "~/utils";

export type TabsContentProps = React.ComponentProps<typeof TabsPrimitive.Content>;

export function TabsContent({ className, ...props }: TabsContentProps) {
  return (
    <TabsPrimitive.Content
      className={cn("flex-1 text-sm outline-none", className)}
      data-slot="tabs-content"
      {...props}
    />
  );
}
