import * as React from "react";

export type HeaderProps = React.RefAttributes<HTMLHtmlElement> & {
  children?: React.ReactNode;
};

export function Header({ children, ...props }: HeaderProps) {
  return (
    <header
      className="bg-foreground/95 supports-[backdrop-filter]:bg-foreground/60 sticky top-0 z-50 w-full border-b border-gray-400 backdrop-blur"
      {...props}
    >
      <div className="container flex h-16 items-center">{children}</div>
    </header>
  );
}
