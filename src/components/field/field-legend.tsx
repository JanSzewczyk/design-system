import * as React from "react";

import { cn } from "~/utils";

export type FieldLegendProps = React.ComponentProps<"legend"> & { variant?: "legend" | "label" };

export function FieldLegend({ className, variant = "legend", ...props }: FieldLegendProps) {
  return (
    <legend
      data-slot="field-legend"
      data-variant={variant}
      className={cn("mb-1.5 font-medium data-[variant=label]:text-sm data-[variant=legend]:text-base", className)}
      {...props}
    />
  );
}
