import * as React from "react";

import { cn } from "~/utils";

export type EmptyDescriptionProps = React.ComponentProps<"p">;

export function EmptyDescription({ className, ...props }: EmptyDescriptionProps) {
  return (
    <p
      className={cn(
        "text-muted-foreground text-sm/relaxed [&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4",
        className
      )}
      data-slot="empty-description"
      {...props}
    />
  );
}
