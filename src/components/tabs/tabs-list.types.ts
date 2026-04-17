import { type VariantProps } from "class-variance-authority";

import { type tabsListVariants } from "./tabs-list.styles";

type TabsListCvaProps = VariantProps<typeof tabsListVariants>;
export type TabsListVariantType = NonNullable<TabsListCvaProps["variant"]>;
