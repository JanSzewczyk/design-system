import * as React from "react";

import { cn } from "~/utils";

export type FieldContentProps = React.ComponentProps<"div">;

export function FieldContent({ className, ...props }: FieldContentProps) {
  return (
    <div
      data-slot="field-content"
      className={cn("group/field-content flex flex-1 flex-col gap-1.5 leading-snug", className)}
      {...props}
    />
  );
}
