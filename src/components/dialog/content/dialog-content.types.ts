import { type VariantProps } from "class-variance-authority";

import { type dialogContentStyles } from "./dialog-content.styles";

type DialogContentCvaProps = VariantProps<typeof dialogContentStyles>;

export type DialogContentWidth = NonNullable<DialogContentCvaProps["width"]>;
