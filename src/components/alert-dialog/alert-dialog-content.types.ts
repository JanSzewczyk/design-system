import { type VariantProps } from "class-variance-authority";

import { type alertDialogContentVariants } from "./alert-dialog-content.styles";

type AlertDialogContentCvaProps = VariantProps<typeof alertDialogContentVariants>;

export type AlertDialogContentSize = NonNullable<AlertDialogContentCvaProps["size"]>;
