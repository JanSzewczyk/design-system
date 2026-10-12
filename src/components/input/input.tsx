import * as React from "react";

import { cn } from "~/utils";

export type InputProps = React.ComponentProps<"input"> & { invalid?: boolean };

export function Input({ className, type, invalid = false, ...props }: InputProps) {
  return (
    <input
      aria-invalid={props["aria-invalid"] || invalid}
      className={cn(
        "h-8 w-full min-w-0 rounded border border-input bg-transparent px-2.5 py-1 text-base outline-none transition-colors file:inline-flex file:h-6 file:border-0 file:bg-transparent file:font-medium file:text-foreground file:text-sm placeholder:text-muted-foreground focus-visible:ring-3 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:ring-3 md:text-sm dark:bg-input/30",
        "aria-invalid:border-error aria-invalid:ring-error/20 dark:aria-invalid:border-error/50 dark:aria-invalid:ring-error/40",
        "focus-visible:border-ring focus-visible:ring-ring/50",
        "disabled:bg-input/50 dark:disabled:bg-input/80",
        className
      )}
      data-slot="input"
      type={type}
      {...props}
    />
  );
}
