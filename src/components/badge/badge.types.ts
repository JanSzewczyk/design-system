import { type VariantProps } from "class-variance-authority";

import { type badgeVariants } from "./badge.styles";

type BadgeVariantsProps = VariantProps<typeof badgeVariants>;

export type BadgeVariant = NonNullable<BadgeVariantsProps["variant"]>;
