"use client";

import { Combobox as ComboboxPrimitive } from "@base-ui/react";
import { XIcon } from "lucide-react";

import { cn } from "~/utils";
import { InputGroupButton } from "~/components/input-group";

export type ComboboxClearProps = ComboboxPrimitive.Clear.Props;

export function ComboboxClear({ className, ...props }: ComboboxClearProps) {
  return (
    <ComboboxPrimitive.Clear
      data-slot="combobox-clear"
      className={cn(className)}
      {...props}
      render={
        <InputGroupButton variant="ghost" size="icon-xs">
          <XIcon className="pointer-events-none" />
        </InputGroupButton>
      }
    />
  );
}
