import { Avatar as ReactAvatar } from "radix-ui";
import * as React from "react";

import { cn } from "~/utils";

export type AvatarProps = React.ComponentProps<typeof ReactAvatar.Root>;

export function Avatar({ className, ...props }: AvatarProps) {
  return (
    <ReactAvatar.Root
      className={cn("relative flex size-8 shrink-0 overflow-hidden rounded", className)}
      data-slot="avatar"
      {...props}
    />
  );
}
