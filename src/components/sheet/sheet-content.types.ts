import { type VariantProps } from "class-variance-authority";

import { type sheetContentStyles } from "./sheet-content.styles";

type SheetContentCvaProps = VariantProps<typeof sheetContentStyles>;

export type SheetContentSide = NonNullable<SheetContentCvaProps["side"]>;
