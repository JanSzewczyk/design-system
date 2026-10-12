import { Dialog as SheetPrimitive } from "radix-ui";
import * as React from "react";

export type SheetCloseProps = React.ComponentProps<typeof SheetPrimitive.Close>;

export function SheetClose(props: SheetCloseProps) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />;
}
