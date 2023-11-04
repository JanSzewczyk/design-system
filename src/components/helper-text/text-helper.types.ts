import { VariantProps } from "class-variance-authority";

import { helperTextCva } from "./helper-text.styles";

type HelperTextCvaProps = VariantProps<typeof helperTextCva>;

export type HelperTextType = NonNullable<HelperTextCvaProps["type"]>;
