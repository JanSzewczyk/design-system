import * as React from "react";

import { cn } from "~/utils";

import { Separator } from "../separator";

export type ItemSeparatorProps = React.ComponentProps<typeof Separator>;

export function ItemSeparator({ className, ...props }: ItemSeparatorProps) {
  return <Separator data-slot="item-separator" orientation="horizontal" className={cn("my-0", className)} {...props} />;
}
