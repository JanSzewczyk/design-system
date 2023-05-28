import * as React from "react";

import { avatarCva } from "./Avatar.styles";
import { AvatarSizeType } from "./Avatar.types";

export type AvatarProps = React.ComponentPropsWithoutRef<"div"> & {
  /**
   * Defines avatar image alt
   */
  alt?: string;

  /**
   * Defines background color
   */
  bg?: `bg-${string}` | `bg-${string}-${number}`;

  /**
   * Defines avatar children
   */
  children?: React.ReactNode;

  /**
   * Defines avatar size
   */
  size?: AvatarSizeType;

  /**
   * Defines avatar image src
   */
  src?: string;
};

export default function AvatarComponent({
  alt,
  bg,
  children,
  size = "md",
  src,
  ...props
}: AvatarProps) {
  const avatarStyles = avatarCva({ size, className: bg });

  return (
    <div className={avatarStyles} {...props}>
      {src ? (
        <img className="h-full w-full rounded object-cover object-center" alt={alt} src={src} />
      ) : (
        children
      )}
    </div>
  );
}
