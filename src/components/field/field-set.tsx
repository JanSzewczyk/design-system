import * as React from "react";

import { cn } from "~/utils";

export type FieldSetProps = React.ComponentProps<"fieldset">;

export function FieldSet({ className, ...props }: FieldSetProps) {
  return (
    <fieldset
      className={cn(
        "flex flex-col gap-6",
        "has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3",
        className
      )}
      data-slot="field-set"
      {...props}
    />
  );
}
