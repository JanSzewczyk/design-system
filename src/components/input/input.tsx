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
        "dark:bg-input/30 border-input file:text-foreground placeholder:text-muted-foreground h-8 w-full min-w-0 rounded border bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-3 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:ring-3 md:text-sm",
        "aria-invalid:ring-error/20 dark:aria-invalid:ring-error/40 aria-invalid:border-error dark:aria-invalid:border-error/50",
        "focus-visible:border-ring focus-visible:ring-ring/50",
        "disabled:bg-input/50 dark:disabled:bg-input/80",
        className
      )}
      {...props}
    />
  );
}
