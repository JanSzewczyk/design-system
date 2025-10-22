import { type VariantProps } from "class-variance-authority";

import { type itemVariants } from "./item.styles";

type ItemVariantsProps = VariantProps<typeof itemVariants>;

export type ItemVariantType = NonNullable<ItemVariantsProps["variant"]>;
export type ItemSizeType = NonNullable<ItemVariantsProps["size"]>;
