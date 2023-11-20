import * as React from "react";

import * as ReactAvatar from "@radix-ui/react-avatar";
import { twMerge } from "tailwind-merge";

export type AvatarImageProps = React.ComponentPropsWithoutRef<typeof ReactAvatar.Image>;

export const AvatarImage = React.forwardRef<React.ElementRef<typeof ReactAvatar.Image>, AvatarImageProps>(function (
  { className, ...props },
  ref
) {
  return <ReactAvatar.Image ref={ref} className={twMerge("aspect-square h-full w-full", className)} {...props} />;
});
