import * as React from "react";

export type HeaderProps = React.RefAttributes<HTMLHtmlElement> & {
  children?: React.ReactNode;
};

/**
 * Renders a sticky top header bar that hosts provided children and accepts additional HTML attributes.
 *
 * The header uses site-level layout and styling utilities (sticky positioning, backdrop blur, full width,
 * and a thin bottom border) and places `children` inside a container aligned vertically.
 *
 * @param children - Content to display inside the header (typically navigation, branding, or controls)
 * @param props - Additional HTML attributes and event handlers to spread onto the root `<header>` element
 * @returns A React element representing the header containing the given children
 */
export function Header({ children, ...props }: HeaderProps) {
  return (
    <header
      className="border-border/40 bg-background/95 supports-backdrop-filter:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur"
      {...props}
    >
      <div className="container flex h-16 items-center">{children}</div>
    </header>
  );
}