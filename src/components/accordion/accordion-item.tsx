import * as React from "react";

import { Accordion as AccordionPrimitive } from "radix-ui";

import { cn } from "~/utils";

export type AccordionItemProps = React.ComponentProps<typeof AccordionPrimitive.Item>;
export function AccordionItem({ className, ...props }: AccordionItemProps) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-b last:border-b-0", className)}
      {...props}
    />
  );
}
