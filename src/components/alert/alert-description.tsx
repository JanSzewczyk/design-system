import * as React from "react";

import { cn } from "~/utils";

export type AlertDescriptionProps = React.ComponentProps<"div">;

export function AlertDescription({ className, ...props }: AlertDescriptionProps) {
  return (
    <div
      className={cn(
        "col-start-2 grid justify-items-start gap-1 text-muted-foreground text-sm [&_p]:leading-relaxed",
        className
      )}
      data-slot="alert-description"
      {...props}
    />
  );
}
