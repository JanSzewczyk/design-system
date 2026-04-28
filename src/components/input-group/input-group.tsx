import * as React from "react";

import { cn } from "~/utils";

export type InputGroupProps = React.ComponentProps<"div"> & {
  invalid?: boolean;
};

export function InputGroup({ className, invalid = false, ...props }: InputGroupProps) {
  return (
    <div
      data-slot="input-group"
      data-invalid={invalid || undefined}
      role="group"
      className={cn(
        "group/input-group border-input dark:bg-input/30 relative flex h-8 w-full min-w-0 items-center rounded border transition-colors outline-none",
        "has-disabled:bg-input/50 dark:has-disabled:bg-input/80 has-disabled:opacity-50",
        "has-[[data-slot=input-group-control]:focus-visible]:border-ring has-[[data-slot=input-group-control]:focus-visible]:ring-ring/50 has-[[data-slot=input-group-control]:focus-visible]:ring-3",
        "has-[[data-slot][aria-invalid=true]]:border-error has-[[data-slot][aria-invalid=true]]:ring-error/20 dark:has-[[data-slot][aria-invalid=true]]:ring-error/40 has-[[data-slot][aria-invalid=true]]:ring-3",
        "data-invalid:border-error data-invalid:ring-error/20 dark:data-invalid:ring-error/40 data-invalid:ring-3",
        "in-data-[slot=combobox-content]:focus-within:border-inherit in-data-[slot=combobox-content]:focus-within:ring-0",
        "has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col",
        "has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>textarea]:h-auto",
        "has-[>[data-align=block-end]]:[&>input]:pt-3 has-[>[data-align=block-start]]:[&>input]:pb-3",
        "has-[>[data-align=inline-end]]:[&>input]:pr-1.5 has-[>[data-align=inline-start]]:[&>input]:pl-1.5",
        className
      )}
      {...props}
    />
  );
}
