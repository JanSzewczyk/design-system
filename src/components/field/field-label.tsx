import * as React from "react";

import { cn } from "~/utils";

import { Label } from "../label";

export type FieldLabelProps = React.ComponentProps<typeof Label>;

export function FieldLabel({ className, ...props }: FieldLabelProps) {
  return (
    <Label
      data-slot="field-label"
      className={cn(
        "group/field-label peer/field-label has-data-[state=checked]:border-primary/30 has-data-[state=checked]:bg-primary/5 dark:has-data-[state=checked]:border-primary/20 dark:has-data-[state=checked]:bg-primary/10 flex w-fit gap-2 leading-snug group-data-[disabled=true]/field:opacity-50 has-[>[data-slot=field]]:rounded-lg has-[>[data-slot=field]]:border *:data-[slot=field]:p-2.5",
        "has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col",
        className
      )}
      {...props}
    />
  );
}
