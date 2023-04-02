import { VariantProps } from "class-variance-authority";

import { buttonCva } from "./Button.styles";

export type ButtonCvaProps = VariantProps<typeof buttonCva>;

export type ButtonSizeType = NonNullable<ButtonCvaProps["size"]>;
export type ButtonVariantType = NonNullable<ButtonCvaProps["variant"]>;
export type ButtonColorType = NonNullable<ButtonCvaProps["color"]>;
