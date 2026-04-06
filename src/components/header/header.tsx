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
      data-slot="header"
      className="border-border/40 bg-background/95 supports-backdrop-filter:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur"
      {...props}
    >
      <div className={cn("flex h-16 items-center", variant === "container" ? "container" : "w-full px-4 sm:px-8")}>
        {children}
      </div>
    </header>
  );
}
