import * as React from "react";

import { cn } from "~/utils";

export type FieldTitleProps = React.ComponentProps<"div">;

export function FieldTitle({ className, ...props }: FieldTitleProps) {
  return (
    <div
      className={cn(
        "flex w-fit items-center gap-2 font-medium text-sm group-data-[disabled=true]/field:opacity-50",
        className
      )}
      data-slot="field-label"
      {...props}
    />
  );
}
