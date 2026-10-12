import { Tabs as TabsPrimitive } from "radix-ui";
import * as React from "react";

import { cn } from "~/utils";

import { tabsListVariants } from "./tabs-list.styles";
import { type TabsListVariantType } from "./tabs-list.types";

export type TabsListProps = React.ComponentProps<typeof TabsPrimitive.List> & {
  variant?: TabsListVariantType;
};

export function TabsList({ className, variant = "default", ...props }: TabsListProps) {
  return (
    <TabsPrimitive.List
      className={cn(tabsListVariants({ variant }), className)}
      data-slot="tabs-list"
      data-variant={variant}
      {...props}
    />
  );
}
