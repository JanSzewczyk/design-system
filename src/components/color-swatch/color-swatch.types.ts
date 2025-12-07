import { type VariantProps } from "class-variance-authority";

import { type colorSwatchVariants } from "~/components/color-swatch/color-swatch.styles";

type ColorSwatchVariantsProps = VariantProps<typeof colorSwatchVariants>;

export type ColorSwatchSize = NonNullable<ColorSwatchVariantsProps["size"]>;
