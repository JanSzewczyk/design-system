import React from "react";

import { type MasonryPositioner } from "~/components/masonry/masonry.types";

import { MASONRY_ERROR } from "./masonry.constants";

export type MasonryContextValue = {
  positioner: MasonryPositioner;
  resizeObserver?: ResizeObserver;
  columnWidth: number;
  onItemRegister: (index: number) => (node: HTMLDivElement | null) => void;
  scrollTop: number;
  windowHeight: number;
  itemHeight: number;
  overscan: number;
  isScrolling?: boolean;
  fallback?: React.ReactNode;
};

export const MasonryContext = React.createContext<MasonryContextValue | null>(null);

export function useMasonryContext(name: keyof typeof MASONRY_ERROR) {
  const context = React.useContext(MasonryContext);
  if (!context) {
    throw new Error(MASONRY_ERROR[name]);
  }
  return context;
}
