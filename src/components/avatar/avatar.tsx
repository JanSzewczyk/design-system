import * as React from "react";

import * as ReactAvatar from "@radix-ui/react-avatar";
import { twMerge } from "tailwind-merge";

import { avatarCva } from "./avatar.styles";
import { AvatarSizeType } from "~/components";

export type AvatarProps = ReactAvatar.AvatarProps &
  React.RefAttributes<HTMLSpanElement> & {
    /**
     * Defines avatar size
     */
    size?: AvatarSizeType;
  };

export function Avatar({ className, size, ref, ...props }: AvatarProps) {
  const avatarStyles = avatarCva({ size });

  return <ReactAvatar.Root ref={ref} className={twMerge(avatarStyles, className)} {...props} />;
}
