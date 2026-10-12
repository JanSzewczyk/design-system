import * as React from "react";

import { cn } from "~/utils";

export type ItemDescriptionProps = React.ComponentProps<"p">;

export function ItemDescription({ className, ...props }: ItemDescriptionProps) {
  return (
    <p
      className={cn(
        "line-clamp-2 text-balance font-normal text-muted-foreground text-sm leading-normal",
        "[&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4",
        className
      )}
      data-slot="item-description"
      {...props}
    />
  );
}
