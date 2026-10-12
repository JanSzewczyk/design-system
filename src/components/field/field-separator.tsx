import * as React from "react";

import { cn } from "~/utils";

import { Separator } from "../separator";

export type FieldSeparatorProps = React.ComponentProps<"div"> & {
  children?: React.ReactNode;
};

export function FieldSeparator({ children, className, ...props }: FieldSeparatorProps) {
  return (
    <div
      className={cn("relative -my-2 h-5 text-sm group-data-[variant=outline]/field-group:-mb-2", className)}
      data-content={!!children}
      data-slot="field-separator"
      {...props}
    >
      <Separator className="absolute inset-0 top-1/2" />
      {children ? (
        <span
          className="relative mx-auto block w-fit bg-background px-2 text-muted-foreground"
          data-slot="field-separator-content"
        >
          {children}
        </span>
      ) : null}
    </div>
  );
}
