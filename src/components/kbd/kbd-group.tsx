import * as React from "react";

import { cn } from "~/utils";

export type KbdGroup = React.ComponentProps<"div">;

export function KbdGroup({ className, ...props }: KbdGroup) {
  return <div className={cn("inline-flex items-center gap-1", className)} data-slot="kbd-group" {...props} />;
}
