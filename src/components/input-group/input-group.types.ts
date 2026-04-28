import { type VariantProps } from "class-variance-authority";

import { type inputGroupAddonVariants } from "./input-group-addon.styles";
import { type inputGroupButtonVariants } from "./input-group-button.styles";

type InputGroupAddonVariantsProps = VariantProps<typeof inputGroupAddonVariants>;
export type InputGroupAddonAlignType = NonNullable<InputGroupAddonVariantsProps["align"]>;

type InputGroupButtonVariantsProps = VariantProps<typeof inputGroupButtonVariants>;
export type InputGroupButtonSizeType = NonNullable<InputGroupButtonVariantsProps["size"]>;
