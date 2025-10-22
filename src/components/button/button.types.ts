import { type VariantProps } from "class-variance-authority";

import { type buttonVariants } from "./button.styles";

type ButtonCvaProps = VariantProps<typeof buttonVariants>;

export type ButtonSizeType = NonNullable<ButtonCvaProps["size"]>;
export type ButtonVariantType = NonNullable<ButtonCvaProps["variant"]>;
