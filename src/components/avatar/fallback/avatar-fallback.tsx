import * as React from "react";

import * as ReactAvatar from "@radix-ui/react-avatar";
import { twMerge } from "tailwind-merge";

export type AvatarFallbackProps = React.ComponentProps<typeof ReactAvatar.Fallback>;

export function AvatarFallback({ className, ref, ...props }: AvatarFallbackProps) {
  return (
    <ReactAvatar.Fallback
      ref={ref}
      className={twMerge("flex h-full w-full items-center justify-center bg-gray-350", className)}
      {...props}
    />
  );
}
