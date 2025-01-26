import * as React from "react";

import * as ReactAvatar from "@radix-ui/react-avatar";
import { twMerge } from "tailwind-merge";

export type AvatarImageProps = React.ComponentProps<typeof ReactAvatar.Image>;

export function AvatarImage({ className, ref, ...props }: AvatarImageProps) {
  return <ReactAvatar.Image ref={ref} className={twMerge("aspect-square h-full w-full", className)} {...props} />;
}
