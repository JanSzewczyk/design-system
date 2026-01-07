import * as React from "react";

export type HeaderProps = React.RefAttributes<HTMLHtmlElement> & {
  children?: React.ReactNode;
};

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
