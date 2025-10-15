import { describe, expect, test, vi } from "vitest";

import { renderHook } from "@testing-library/react";

import { useLazyRef } from "./use-lazy-ref";

describe("useLazyRef", () => {
  test("should initialize ref with the result of the provided function", () => {
    const initialValue = { count: 0 };
    const initFn = vi.fn(() => initialValue);

    const { result } = renderHook(() => useLazyRef(initFn));

    expect(initFn).toHaveBeenCalledTimes(1);
    expect(result.current.current).toBe(initialValue);
  });

  test("should only call initialization function once", () => {
    const initFn = vi.fn(() => ({ count: 0 }));

    const { rerender } = renderHook(() => useLazyRef(initFn));

    expect(initFn).toHaveBeenCalledTimes(1);

    rerender();
    rerender();
    rerender();

    expect(initFn).toHaveBeenCalledTimes(1);
  });

  test("should maintain the same reference across renders", () => {
    const initialValue = { count: 0 };
    const initFn = () => initialValue;

    const { result, rerender } = renderHook(() => useLazyRef(initFn));

    const firstRef = result.current;

    rerender();
    const secondRef = result.current;

    rerender();
    const thirdRef = result.current;

    expect(firstRef).toBe(secondRef);
    expect(secondRef).toBe(thirdRef);
    expect(firstRef.current).toBe(initialValue);
  });

  test("should handle complex initialization functions", () => {
    const complexInit = vi.fn(() => ({
      value: Math.random(),
      nested: { data: [1, 2, 3] },
      method: () => "test"
    }));

    const { result } = renderHook(() => useLazyRef(complexInit));

    expect(complexInit).toHaveBeenCalledTimes(1);
    expect(result.current.current).toHaveProperty("value");
    expect(result.current.current).toHaveProperty("nested");
    expect(result.current.current).toHaveProperty("method");
    expect(typeof result.current.current?.method).toBe("function");
  });

  test("should work with primitive values", () => {
    const numberInit = () => 42;
    const stringInit = () => "hello";
    const booleanInit = () => true;

    const { result: numberResult } = renderHook(() => useLazyRef(numberInit));
    const { result: stringResult } = renderHook(() => useLazyRef(stringInit));
    const { result: booleanResult } = renderHook(() => useLazyRef(booleanInit));

    expect(numberResult.current.current).toBe(42);
    expect(stringResult.current.current).toBe("hello");
    expect(booleanResult.current.current).toBe(true);
  });

  test("should handle expensive initialization only once", () => {
    let computationCount = 0;
    const expensiveInit = () => {
      computationCount++;
      let sum = 0;
      for (let i = 0; i < 1000; i++) {
        sum += i;
      }
      return sum;
    };

    const { result, rerender } = renderHook(() => useLazyRef(expensiveInit));

    expect(computationCount).toBe(1);
    const initialValue = result.current.current;

    rerender();
    rerender();

    expect(computationCount).toBe(1);
    expect(result.current.current).toBe(initialValue);
  });

  test("should return RefObject with proper typing", () => {
    interface TestObject {
      name: string;
      value: number;
    }

    const initFn = (): TestObject => ({ name: "test", value: 42 });
    const { result } = renderHook(() => useLazyRef(initFn));

    expect(result.current.current).toEqual({ name: "test", value: 42 });
    expect(result.current.current?.name).toBe("test");
    expect(result.current.current?.value).toBe(42);
  });
});
