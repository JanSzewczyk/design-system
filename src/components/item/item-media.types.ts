import { type VariantProps } from "class-variance-authority";

import { type itemMediaVariants } from "~/components/item/item-media.styles";

type ItemMediaVariantsProps = VariantProps<typeof itemMediaVariants>;

export type ItemMediaVariantType = NonNullable<ItemMediaVariantsProps["variant"]>;
