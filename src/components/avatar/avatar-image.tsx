import * as React from "react";

import { Avatar as ReactAvatar } from "radix-ui";

import { cn } from "~/utils";

export type AvatarImageProps = React.ComponentProps<typeof ReactAvatar.Image>;

export function AvatarImage({ className, ref, ...props }: AvatarImageProps) {
  return <ReactAvatar.Image ref={ref} className={cn("aspect-square h-full w-full", className)} {...props} />;
}
