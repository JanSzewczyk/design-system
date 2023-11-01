import React from "react";

export type HeaderProps = {
  children?: React.ReactNode;
};

export function Header({ children }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-400 bg-foreground/95 backdrop-blur supports-[backdrop-filter]:bg-foreground/60">
      <div className="container flex h-16 items-center">{children}</div>
    </header>
  );
}
