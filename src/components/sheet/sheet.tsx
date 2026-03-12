import * as React from "react";

import { Dialog as SheetPrimitive } from "radix-ui";

export type SheetProps = React.ComponentProps<typeof SheetPrimitive.Root>;

export function Sheet(props: SheetProps) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />;
}
