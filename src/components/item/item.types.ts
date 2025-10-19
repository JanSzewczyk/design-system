import { type VariantProps } from "class-variance-authority";

import { type itemCva } from "./item.styles";

type ItemCvaProps = VariantProps<typeof itemCva>;

export type ItemVariantType = NonNullable<ItemCvaProps["variant"]>;
export type ItemSizeType = NonNullable<ItemCvaProps["size"]>;
