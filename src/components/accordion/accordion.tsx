import { Accordion as AccordionPrimitive } from "radix-ui";
import * as React from "react";

export type AccordionProps = React.ComponentProps<typeof AccordionPrimitive.Root>;
export function Accordion({ ...props }: AccordionProps) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />;
}
