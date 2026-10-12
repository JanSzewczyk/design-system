import { type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "~/utils";

import { fieldVariants } from "./field.styles";

export type FieldProps = React.ComponentProps<"div"> & VariantProps<typeof fieldVariants>;

export function Field({ className, orientation = "vertical", ...props }: FieldProps) {
  return (
    <div
      className={cn(fieldVariants({ orientation }), className)}
      data-orientation={orientation}
      data-slot="field"
      role="group"
      {...props}
    />
  );
}
