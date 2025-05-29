import * as React from "react";

import { Avatar as ReactAvatar } from "radix-ui";

import { cn } from "~/utils";

export type AvatarFallbackProps = React.ComponentProps<typeof ReactAvatar.Fallback>;

export function AvatarFallback({ className, ref, ...props }: AvatarFallbackProps) {
  return (
    <ReactAvatar.Fallback
      ref={ref}
      className={cn("flex h-full w-full items-center justify-center bg-gray-600", className)}
      {...props}
    />
  );
}
