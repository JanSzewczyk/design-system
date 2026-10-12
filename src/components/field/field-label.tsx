import * as React from "react";

import { cn } from "~/utils";

import { Label } from "../label";

export type FieldLabelProps = React.ComponentProps<typeof Label>;

export function FieldLabel({ className, ...props }: FieldLabelProps) {
  return (
    <Label
      className={cn(
        "group/field-label peer/field-label flex w-fit gap-2 leading-snug has-[>[data-slot=field]]:rounded-lg has-[>[data-slot=field]]:border has-data-[state=checked]:border-primary/30 has-data-[state=checked]:bg-primary/5 *:data-[slot=field]:p-2.5 group-data-[disabled=true]/field:opacity-50 dark:has-data-[state=checked]:border-primary/20 dark:has-data-[state=checked]:bg-primary/10",
        "has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col",
        className
      )}
      data-slot="field-label"
      {...props}
    />
  );
}
