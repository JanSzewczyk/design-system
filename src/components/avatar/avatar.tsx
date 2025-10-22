import * as React from "react";

import { Avatar as ReactAvatar } from "radix-ui";

import { cn } from "~/utils";

export type AvatarProps = React.ComponentProps<typeof ReactAvatar.Root>;

export function Avatar({ className, ...props }: AvatarProps) {
  return (
    <ReactAvatar.Root
      data-slot="avatar"
      className={cn("relative flex size-8 shrink-0 overflow-hidden rounded", className)}
      {...props}
    />
  );
}
