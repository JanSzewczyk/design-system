import * as React from "react";

import { cn } from "~/utils";

export type InputProps = React.ComponentProps<"input"> & { invalid?: boolean };

export function Input({ className, type, invalid = false, ...props }: InputProps) {
  return (
    <input
      type={type}
      data-slot="input"
      aria-invalid={props["aria-invalid"] || invalid}
      className={cn(
        "placeholder:text-muted-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-error/20 dark:aria-invalid:ring-error/40 aria-invalid:border-error",
        "selection:bg-primary selection:text-primary-foreground",
        "file:text-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium md:text-sm",
        className
      )}
      {...props}
    />
  );
}
