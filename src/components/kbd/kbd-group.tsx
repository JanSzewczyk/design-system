import * as React from "react";

import { cn } from "~/utils";

export type KbdGroup = React.ComponentProps<"div">;

export function KbdGroup({ className, ...props }: KbdGroup) {
  return <div data-slot="kbd-group" className={cn("inline-flex items-center gap-1", className)} {...props} />;
}
