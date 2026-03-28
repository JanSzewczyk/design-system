import * as React from "react";

import { SIDEBAR_ROOT_NAME } from "./sidebar.constants";

export type SidebarContextValue = {
  state: "expanded" | "collapsed";
  open: boolean;
  setOpen: (open: boolean | ((value: boolean) => boolean)) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
};

export const SidebarContext = React.createContext<SidebarContextValue | null>(null);

export function useSidebarContext(consumerName: string): SidebarContextValue {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error(`\`${consumerName}\` must be used within \`${SIDEBAR_ROOT_NAME}\``);
  }
  return context;
}

export function useSidebar(): SidebarContextValue {
  return useSidebarContext("useSidebar");
}
