import * as React from "react";

import { type VariantProps } from "class-variance-authority";

import { cn } from "~/utils";

import { fieldVariants } from "./field.styles";

export type FieldProps = React.ComponentProps<"div"> & VariantProps<typeof fieldVariants>;

export function Field({ className, orientation = "vertical", ...props }: FieldProps) {
  return (
    <div
      role="group"
      data-slot="field"
      data-orientation={orientation}
      className={cn(fieldVariants({ orientation }), className)}
      {...props}
    />
  );
}
