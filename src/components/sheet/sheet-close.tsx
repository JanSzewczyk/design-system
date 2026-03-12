import * as React from "react";

import { Dialog as SheetPrimitive } from "radix-ui";

export type SheetCloseProps = React.ComponentProps<typeof SheetPrimitive.Close>;

export function SheetClose(props: SheetCloseProps) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />;
}
