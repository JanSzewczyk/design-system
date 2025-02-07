import { type VariantProps } from "class-variance-authority";

import { type avatarCva } from "./avatar.styles";

type AvatarCvaProps = VariantProps<typeof avatarCva>;

export type AvatarSizeType = NonNullable<AvatarCvaProps["size"]>;
