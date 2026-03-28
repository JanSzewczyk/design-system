import * as React from "react";

import { PanelLeftIcon } from "lucide-react";

import { Button } from "~/components";
import { cn } from "~/utils";

import { useSidebarContext } from "./sidebar.context";

export type SidebarTriggerProps = React.ComponentProps<typeof Button>;

export function SidebarTrigger({ className, onClick, ...props }: SidebarTriggerProps) {
  const { toggleSidebar } = useSidebarContext("SidebarTrigger");

  return (
    <Button
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      variant="ghost"
      size="icon-sm"
      className={cn(className)}
      onClick={(event) => {
        onClick?.(event);
        toggleSidebar();
      }}
      {...props}
    >
      <PanelLeftIcon className="cn-rtl-flip" />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
}
