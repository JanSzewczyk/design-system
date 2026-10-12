import * as React from "react";

import { cn } from "~/utils";

import { buttonGroupVariants } from "./button-group.styles";
import { type ButtonGroupOrientationType } from "./button-group.types";

export type ButtonGroupProps = React.ComponentProps<"div"> & {
  orientation?: ButtonGroupOrientationType;
};

export function ButtonGroup({ className, orientation, ...props }: ButtonGroupProps) {
  return (
    <div
      className={cn(buttonGroupVariants({ orientation }), className)}
      data-orientation={orientation}
      data-slot="button-group"
      role="group"
      {...props}
    />
  );
}
