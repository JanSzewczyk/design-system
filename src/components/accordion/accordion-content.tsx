import { Accordion as AccordionPrimitive } from "radix-ui";
import * as React from "react";

import { cn } from "~/utils";

export type AccordionContentProps = React.ComponentProps<typeof AccordionPrimitive.Content>;
export function AccordionContent({ className, children, ...props }: AccordionContentProps) {
  return (
    <AccordionPrimitive.Content
      className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      data-slot="accordion-content"
      {...props}
    >
      <div className={cn("pt-0 pb-4", className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}
