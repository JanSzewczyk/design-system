import * as React from "react";

import { describe, expect, test, vi } from "vitest";

import { renderHook } from "@testing-library/react";

import { useIsomorphicLayoutEffect } from "./use-isomorphic-layout-effect";

describe("useIsomorphicLayoutEffect", () => {
  test("should be useLayoutEffect in browser environment", () => {
    expect(useIsomorphicLayoutEffect).toBe(React.useLayoutEffect);
  });

  test("should execute effect callback", () => {
    const effectCallback = vi.fn();

    renderHook(() => {
      useIsomorphicLayoutEffect(effectCallback, []);
    });

    expect(effectCallback).toHaveBeenCalledTimes(1);
  });

  test("should re-run effect when dependencies change", () => {
    const effectCallback = vi.fn();
    const { rerender } = renderHook(
      ({ count }) => {
        useIsomorphicLayoutEffect(effectCallback, [count]);
      },
      {
        initialProps: { count: 0 }
      }
    );

    expect(effectCallback).toHaveBeenCalledTimes(1);

    rerender({ count: 1 });
    expect(effectCallback).toHaveBeenCalledTimes(2);

    rerender({ count: 1 });
    expect(effectCallback).toHaveBeenCalledTimes(2);
  });

  test("should call cleanup function", () => {
    const cleanup = vi.fn();
    const effectCallback = vi.fn(() => cleanup);

    const { unmount } = renderHook(() => {
      useIsomorphicLayoutEffect(effectCallback, []);
    });

    expect(cleanup).not.toHaveBeenCalled();

    unmount();
    expect(cleanup).toHaveBeenCalledTimes(1);
  });
});
