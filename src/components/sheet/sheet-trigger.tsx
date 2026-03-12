import * as React from "react";

import { Dialog as SheetPrimitive } from "radix-ui";

export type SheetTriggerProps = React.ComponentProps<typeof SheetPrimitive.Trigger>;

export function SheetTrigger(props: SheetTriggerProps) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}
