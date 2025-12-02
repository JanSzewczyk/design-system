import { type VariantProps } from "class-variance-authority";

import { type dialogContentVariants } from "./dialog-content.styles";

type DialogContentCvaProps = VariantProps<typeof dialogContentVariants>;

export type DialogContentWidth = NonNullable<DialogContentCvaProps["width"]>;
