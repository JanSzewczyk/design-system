import { type VariantProps } from "class-variance-authority";

import { type sidebarMenuButtonVariants } from "./sidebar.styles";

type SidebarMenuButtonCvaProps = VariantProps<typeof sidebarMenuButtonVariants>;
export type SidebarMenuButtonVariantType = NonNullable<SidebarMenuButtonCvaProps["variant"]>;
export type SidebarMenuButtonSizeType = NonNullable<SidebarMenuButtonCvaProps["size"]>;
