import { Dialog as SheetPrimitive } from "radix-ui";
import * as React from "react";

export type SheetProps = React.ComponentProps<typeof SheetPrimitive.Root>;

export function Sheet(props: SheetProps) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />;
}
