import { type VariantProps } from "class-variance-authority";

import { type toggleVariants } from "./toggle.styles";

type ToggleVariantsProps = VariantProps<typeof toggleVariants>;

export type ToggleVariantType = NonNullable<ToggleVariantsProps["variant"]>;
export type ToggleSizeType = NonNullable<ToggleVariantsProps["size"]>;
