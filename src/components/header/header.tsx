import * as React from "react";

import { cn } from "~/utils";

export type HeaderProps = React.ComponentProps<"header"> & {
  children?: React.ReactNode;
  /**
   * Controls the width constraint of the header's inner content area.
   *
   * - `"container"` – Constrains content to the responsive `container` max-width (default).
   * - `"full"` – Stretches content to the full viewport width with horizontal padding.
   *
   * @default "container"
   */
  variant?: "full" | "container";
};

export function Header({ children, variant = "container", ...props }: HeaderProps) {
  return (
    <header
      className="sticky top-0 z-50 w-full border-border/40 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60"
      data-slot="header"
      {...props}
    >
      <div className={cn("flex h-16 items-center", variant === "container" ? "container" : "w-full px-4 sm:px-8")}>
        {children}
      </div>
    </header>
  );
}
