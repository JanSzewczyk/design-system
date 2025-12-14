import { type VariantProps } from "class-variance-authority";

import { type alertVariants } from "~/components/alert/alert.styles";

type AlertVariantsProps = VariantProps<typeof alertVariants>;

export type AlertVariant = NonNullable<AlertVariantsProps["variant"]>;
