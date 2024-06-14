import { VariantProps } from "class-variance-authority";

import { iconButtonCva } from "./icon-button.styles";

type IconButtonCvaProps = VariantProps<typeof iconButtonCva>;

export type IconButtonSizeType = NonNullable<IconButtonCvaProps["size"]>;
export type IconButtonVariantType = NonNullable<IconButtonCvaProps["variant"]>;
export type IconButtonColorType = NonNullable<IconButtonCvaProps["color"]>;
