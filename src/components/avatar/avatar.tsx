import * as React from "react";

import { Avatar as ReactAvatar } from "radix-ui";

import { type AvatarSizeType } from "~/components";
import { cn } from "~/utils";

import { avatarCva } from "./avatar.styles";

export type AvatarProps = ReactAvatar.AvatarProps &
  React.RefAttributes<HTMLSpanElement> & {
    /**
     * Defines avatar size
     */
    size?: AvatarSizeType;
  };

export function Avatar({ className, size, ref, ...props }: AvatarProps) {
  const avatarStyles = avatarCva({ size });

  return <ReactAvatar.Root ref={ref} className={cn(avatarStyles, className)} {...props} />;
}
