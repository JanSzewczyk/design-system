import { type VariantProps } from "class-variance-authority";

import { type buttonCva } from "./Button.styles";

type ButtonCvaProps = VariantProps<typeof buttonCva>;

export type ButtonSizeType = NonNullable<ButtonCvaProps["size"]>;
export type ButtonVariantType = NonNullable<ButtonCvaProps["variant"]>;
export type ButtonColorType = NonNullable<ButtonCvaProps["color"]>;
