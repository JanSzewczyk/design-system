import * as React from "react";

import * as ReactAvatar from "@radix-ui/react-avatar";
import { twMerge } from "tailwind-merge";

export type AvatarFallbackProps = React.ComponentPropsWithoutRef<typeof ReactAvatar.Fallback>;

export const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof ReactAvatar.Fallback>,
  AvatarFallbackProps
>(function ({ className, ...props }, ref) {
  return (
    <ReactAvatar.Fallback
      ref={ref}
      className={twMerge("flex h-full w-full items-center justify-center bg-gray-350", className)}
      {...props}
    />
  );
});
