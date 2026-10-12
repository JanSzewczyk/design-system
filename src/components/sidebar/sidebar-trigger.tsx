import { PanelLeftIcon } from "lucide-react";
import * as React from "react";

import { Button } from "~/components/button";
import { cn } from "~/utils";

import { useSidebarContext } from "./sidebar.context";

export type SidebarTriggerProps = React.ComponentProps<typeof Button>;

export function SidebarTrigger({ className, onClick, ...props }: SidebarTriggerProps) {
  const { toggleSidebar } = useSidebarContext("SidebarTrigger");

  return (
    <Button
      className={cn(className)}
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      onClick={(event) => {
        onClick?.(event);
        toggleSidebar();
      }}
      size="icon-sm"
      variant="ghost"
      {...props}
    >
      <PanelLeftIcon className="cn-rtl-flip" />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
}
