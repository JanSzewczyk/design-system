import * as React from "react";

import { cn } from "~/utils";

export type FieldLegendProps = React.ComponentProps<"legend"> & { variant?: "legend" | "label" };

export function FieldLegend({ className, variant = "legend", ...props }: FieldLegendProps) {
  return (
    <legend
      data-slot="field-legend"
      data-variant={variant}
      className={cn("mb-3 font-medium", "data-[variant=legend]:text-base", "data-[variant=label]:text-sm", className)}
      {...props}
    />
  );
}
