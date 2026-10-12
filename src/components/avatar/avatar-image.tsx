import { Avatar as AvatarPrimitive } from "radix-ui";
import * as React from "react";

import { cn } from "~/utils";

export type AvatarImageProps = React.ComponentProps<typeof AvatarPrimitive.Image>;

export function AvatarImage({ className, ...props }: AvatarImageProps) {
  return (
    <AvatarPrimitive.Image className={cn("aspect-square size-full", className)} data-slot="avatar-image" {...props} />
  );
}
