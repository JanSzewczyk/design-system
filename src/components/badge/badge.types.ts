import { type VariantProps } from "class-variance-authority";

import { type badgeCva } from "./badge.styles";

type BadgeCvaProps = VariantProps<typeof badgeCva>;

export type BadgeColorType = NonNullable<BadgeCvaProps["color"]>;
export type BadgeVariantType = NonNullable<BadgeCvaProps["variant"]>;
