import { Avatar as AvatarPrimitive } from "radix-ui";
import * as React from "react";

import { cn } from "~/utils";

export type AvatarFallbackProps = React.ComponentProps<typeof AvatarPrimitive.Fallback>;

export function AvatarFallback({ className, ...props }: AvatarFallbackProps) {
  return (
    <AvatarPrimitive.Fallback
      className={cn("flex size-full items-center justify-center rounded bg-muted", className)}
      data-slot="avatar-fallback"
      {...props}
    />
  );
}
