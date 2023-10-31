import * as React from "react";

import * as ReactAvatar from "@radix-ui/react-avatar";
import { twMerge } from "tailwind-merge";

import { avatarCva } from "./avatar.styles";
import { AvatarSizeType } from "./avatar.types";

export type AvatarProps = ReactAvatar.AvatarProps & {
  /**
   * Defines avatar size
   */
  size?: AvatarSizeType;
};

export const Avatar = React.forwardRef(function (
  { className, size, ...props }: AvatarProps,
  ref: React.Ref<HTMLSpanElement>
) {
  const avatarStyles = avatarCva({ size });

  return <ReactAvatar.Root ref={ref} className={twMerge(avatarStyles, className)} {...props} />;
});
