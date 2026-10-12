import { Accordion as AccordionPrimitive } from "radix-ui";
import * as React from "react";

import { cn } from "~/utils";

export type AccordionItemProps = React.ComponentProps<typeof AccordionPrimitive.Item>;
export function AccordionItem({ className, ...props }: AccordionItemProps) {
  return (
    <AccordionPrimitive.Item
      className={cn("border-b last:border-b-0", className)}
      data-slot="accordion-item"
      {...props}
    />
  );
}
