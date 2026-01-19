"use client";

import * as React from "react";

import { Tabs as TabsPrimitive } from "radix-ui";

import { cn } from "~/utils";

export type TabsContentProps = React.ComponentProps<typeof TabsPrimitive.Content>;

export function TabsContent({ className, ...props }: TabsContentProps) {
  return <TabsPrimitive.Content data-slot="tabs-content" className={cn("flex-1 outline-none", className)} {...props} />;
}
