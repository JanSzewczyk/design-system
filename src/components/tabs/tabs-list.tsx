"use client";

import * as React from "react";

import { Tabs as TabsPrimitive } from "radix-ui";

import { cn } from "~/utils";

export type TabsListProps = React.ComponentProps<typeof TabsPrimitive.List>;

export function TabsList({ className, ...props }: TabsListProps) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded p-0.75",
        className
      )}
      {...props}
    />
  );
}
