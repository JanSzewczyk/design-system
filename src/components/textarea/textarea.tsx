import * as React from "react";

import { cn } from "~/utils";

export type TextareaProps = React.ComponentProps<"textarea"> & {
  invalid?: boolean;
};

export function Textarea({ className, invalid = false, ...props }: TextareaProps) {
  return (
    <textarea
      data-slot="textarea"
      aria-invalid={props["aria-invalid"] || invalid}
      className={cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 disabled:bg-input/50 aria-invalid:border-error aria-invalid:ring-error/20 dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-error/50 dark:aria-invalid:ring-error/40 flex field-sizing-content min-h-16 w-full rounded border bg-transparent px-2.5 py-2 text-base transition-colors outline-none focus-visible:ring-3 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:ring-3 md:text-sm",
        className
      )}
      {...props}
    />
  );
}
