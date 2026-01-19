import { type VariantProps } from "class-variance-authority";

import { type statusVariants } from "~/components/status/status.styles";

type StatusCvaProps = VariantProps<typeof statusVariants>;

export type StatusVariant = NonNullable<StatusCvaProps["variant"]>;
