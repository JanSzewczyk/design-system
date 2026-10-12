import * as React from "react";

import { cn } from "~/utils";
import { type InputGroupAddonAlignType } from "./input-group.types";
import { inputGroupAddonVariants } from "./input-group-addon.styles";

export type InputGroupAddonProps = React.ComponentProps<"div"> & {
  align?: InputGroupAddonAlignType;
};

export function InputGroupAddon({ className, align = "inline-start", ...props }: InputGroupAddonProps) {
  return (
    <div
      className={cn(inputGroupAddonVariants({ align }), className)}
      data-align={align}
      data-slot="input-group-addon"
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("button")) return;
        e.currentTarget.parentElement?.querySelector("input")?.focus();
      }}
      {...props}
    />
  );
}
