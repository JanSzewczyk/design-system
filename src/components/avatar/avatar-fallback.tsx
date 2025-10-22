import * as React from "react";

import { Avatar as AvatarPrimitive } from "radix-ui";

import { cn } from "~/utils";

export type AvatarFallbackProps = React.ComponentProps<typeof AvatarPrimitive.Fallback>;

export function AvatarFallback({ className, ...props }: AvatarFallbackProps) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn("bg-muted flex size-full items-center justify-center rounded-full", className)}
      {...props}
    />
  );
}
