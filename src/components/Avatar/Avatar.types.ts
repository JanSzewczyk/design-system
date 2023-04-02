import { VariantProps } from "class-variance-authority";

import { avatarCva } from "./Avatar.styles";

type AvatarCvaProps = VariantProps<typeof avatarCva>;

export type AvatarSizeType = NonNullable<AvatarCvaProps["size"]>;
