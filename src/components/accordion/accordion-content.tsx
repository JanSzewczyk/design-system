import * as React from "react";

import { Accordion as AccordionPrimitive } from "radix-ui";

import { cn } from "~/utils";

export type AccordionContentProps = React.ComponentProps<typeof AccordionPrimitive.Content>;
export function AccordionContent({ className, children, ...props }: AccordionContentProps) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm"
      {...props}
    >
      <div className={cn("pt-0 pb-4", className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}
