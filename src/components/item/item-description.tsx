import * as React from "react";

import { cn } from "~/utils";

export type ItemDescriptionProps = React.ComponentProps<"p">;

export function ItemDescription({ className, ...props }: ItemDescriptionProps) {
  return (
    <p
      data-slot="item-description"
      className={cn(
        "text-muted-foreground line-clamp-2 text-sm leading-normal font-normal text-balance",
        "[&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4",
        className
      )}
      {...props}
    />
  );
}
