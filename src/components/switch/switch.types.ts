import { type VariantProps } from "class-variance-authority";

import { type switchVariants } from "./switch.styles";

type SwitchCvaProps = VariantProps<typeof switchVariants>;

export type SwitchSizeType = NonNullable<SwitchCvaProps["size"]>;
