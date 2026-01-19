import * as React from "react";

import { Slot } from "@radix-ui/react-slot";
import { statusVariants } from "~/components/status/status.styles";
import { type StatusVariant } from "~/components/status/status.types";
import { cn } from "~/utils";

export type StatusProps = React.ComponentProps<"div"> & {
  asChild?: boolean;
  variant?: StatusVariant;
};

export function Status({ className, variant = "default", asChild, ...rootProps }: StatusProps) {
  const RootPrimitive = asChild ? Slot : "div";

  return (
    <RootPrimitive
      data-slot="status"
      data-variant={variant}
      {...rootProps}
      className={cn(statusVariants({ variant }), className)}
    />
  );
}
