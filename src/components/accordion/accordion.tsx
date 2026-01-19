import * as React from "react";

import { Accordion as AccordionPrimitive } from "radix-ui";

export type AccordionProps = React.ComponentProps<typeof AccordionPrimitive.Root>;
export function Accordion({ ...props }: AccordionProps) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />;
}
