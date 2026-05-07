import { type VariantProps } from "class-variance-authority";

import { type buttonGroupVariants } from "./button-group.styles";

type ButtonGroupCvaProps = VariantProps<typeof buttonGroupVariants>;

export type ButtonGroupOrientationType = NonNullable<ButtonGroupCvaProps["orientation"]>;
