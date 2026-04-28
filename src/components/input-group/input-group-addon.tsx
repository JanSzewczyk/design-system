import * as React from "react";

import { cn } from "~/utils";

import { inputGroupAddonVariants } from "./input-group-addon.styles";
import { type InputGroupAddonAlignType } from "./input-group.types";

export type InputGroupAddonProps = React.ComponentProps<"div"> & {
  align?: InputGroupAddonAlignType;
};

export function InputGroupAddon({ className, align = "inline-start", ...props }: InputGroupAddonProps) {
  return (
    <div
      data-slot="input-group-addon"
      data-align={align}
      className={cn(inputGroupAddonVariants({ align }), className)}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("button")) return;
        e.currentTarget.parentElement?.querySelector("input")?.focus();
      }}
      {...props}
    />
  );
}
