import * as React from "react";

import { Avatar as AvatarPrimitive } from "radix-ui";

import { cn } from "~/utils";

export type AvatarImageProps = React.ComponentProps<typeof AvatarPrimitive.Image>;

export function AvatarImage({ className, ...props }: AvatarImageProps) {
  return (
    <AvatarPrimitive.Image data-slot="avatar-image" className={cn("aspect-square size-full", className)} {...props} />
  );
}
