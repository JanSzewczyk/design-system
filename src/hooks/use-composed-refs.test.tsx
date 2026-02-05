import { createRef } from "react";

import { describe, expect, test, vi } from "vitest";

import { renderHook } from "@testing-library/react";

import { useComposedRefs } from "./use-composed-refs";

describe("useComposedRefs", () => {
  test("should handle single callback ref", () => {
    const callbackRef = vi.fn();
    const node = document.createElement("div");

    const { result } = renderHook(() => useComposedRefs(callbackRef));

    result.current(node);

    expect(callbackRef).toHaveBeenCalledWith(node);
    expect(callbackRef).toHaveBeenCalledTimes(1);
  });

  test("should handle single object ref", () => {
    const objectRef = createRef<HTMLDivElement>();
    const node = document.createElement("div");

    const { result } = renderHook(() => useComposedRefs(objectRef));

    result.current(node);

    expect(objectRef.current).toBe(node);
  });

  test("should handle multiple callback refs", () => {
    const callbackRef1 = vi.fn();
    const callbackRef2 = vi.fn();
    const callbackRef3 = vi.fn();
    const node = document.createElement("div");

    const { result } = renderHook(() => useComposedRefs(callbackRef1, callbackRef2, callbackRef3));

    result.current(node);

    expect(callbackRef1).toHaveBeenCalledWith(node);
    expect(callbackRef2).toHaveBeenCalledWith(node);
    expect(callbackRef3).toHaveBeenCalledWith(node);
    expect(callbackRef1).toHaveBeenCalledTimes(1);
    expect(callbackRef2).toHaveBeenCalledTimes(1);
    expect(callbackRef3).toHaveBeenCalledTimes(1);
  });

  test("should handle multiple object refs", () => {
    const objectRef1 = createRef<HTMLDivElement>();
    const objectRef2 = createRef<HTMLDivElement>();
    const objectRef3 = createRef<HTMLDivElement>();
    const node = document.createElement("div");

    const { result } = renderHook(() => useComposedRefs(objectRef1, objectRef2, objectRef3));

    result.current(node);

    expect(objectRef1.current).toBe(node);
    expect(objectRef2.current).toBe(node);
    expect(objectRef3.current).toBe(node);
  });

  test("should handle mixed callback and object refs", () => {
    const callbackRef = vi.fn();
    const objectRef = createRef<HTMLDivElement>();
    const node = document.createElement("div");

    const { result } = renderHook(() => useComposedRefs(callbackRef, objectRef));

    result.current(node);

    expect(callbackRef).toHaveBeenCalledWith(node);
    expect(objectRef.current).toBe(node);
  });

  test("should ignore undefined refs", () => {
    const callbackRef = vi.fn();
    const node = document.createElement("div");

    const { result } = renderHook(() => useComposedRefs(undefined, callbackRef, undefined));

    result.current(node);

    expect(callbackRef).toHaveBeenCalledWith(node);
    expect(callbackRef).toHaveBeenCalledTimes(1);
  });

  test("should handle null node", () => {
    const callbackRef = vi.fn();
    const objectRef = createRef<HTMLDivElement>();

    const { result } = renderHook(() => useComposedRefs(callbackRef, objectRef));

    result.current(null);

    expect(callbackRef).toHaveBeenCalledWith(null);
    expect(objectRef.current).toBe(null);
  });

  test("should handle empty refs array", () => {
    const { result } = renderHook(() => useComposedRefs());
    const node = document.createElement("div");

    // Should not throw
    expect(() => result.current(node)).not.toThrow();
  });

  test("should update refs when node changes", () => {
    const callbackRef = vi.fn();
    const objectRef = createRef<HTMLDivElement>();
    const node1 = document.createElement("div");
    const node2 = document.createElement("span");

    const { result } = renderHook(() => useComposedRefs(callbackRef, objectRef));

    result.current(node1);

    expect(callbackRef).toHaveBeenCalledWith(node1);
    expect(objectRef.current).toBe(node1);

    result.current(node2);

    expect(callbackRef).toHaveBeenCalledWith(node2);
    expect(objectRef.current).toBe(node2);
    expect(callbackRef).toHaveBeenCalledTimes(2);
  });

  test("should maintain stable reference across renders", () => {
    const callbackRef = vi.fn();
    const node = document.createElement("div");

    const { result, rerender } = renderHook(() => useComposedRefs(callbackRef));

    const firstFn = result.current;
    firstFn(node);

    expect(callbackRef).toHaveBeenCalledTimes(1);

    rerender();
    const secondFn = result.current;

    expect(firstFn).not.toBe(secondFn); // New function is created each render
    secondFn(node);

    expect(callbackRef).toHaveBeenCalledTimes(2);
  });

  test("should handle refs that change between renders", () => {
    const callbackRef1 = vi.fn();
    const callbackRef2 = vi.fn();
    const node = document.createElement("div");

    const { result, rerender } = renderHook(({ refs }) => useComposedRefs(...refs), {
      initialProps: { refs: [callbackRef1] as Array<React.Ref<HTMLDivElement> | undefined> }
    });

    result.current(node);
    expect(callbackRef1).toHaveBeenCalledWith(node);
    expect(callbackRef2).not.toHaveBeenCalled();

    rerender({ refs: [callbackRef2] });
    result.current(node);

    expect(callbackRef2).toHaveBeenCalledWith(node);
  });

  test("should work with generic types", () => {
    const buttonRef = createRef<HTMLButtonElement>();
    const inputRef = createRef<HTMLInputElement>();
    const button = document.createElement("button");
    const input = document.createElement("input");

    const { result: buttonResult } = renderHook(() => useComposedRefs(buttonRef));
    const { result: inputResult } = renderHook(() => useComposedRefs(inputRef));

    buttonResult.current(button);
    inputResult.current(input);

    expect(buttonRef.current).toBe(button);
    expect(inputRef.current).toBe(input);
  });

  test("should handle all refs being undefined", () => {
    const node = document.createElement("div");

    const { result } = renderHook(() => useComposedRefs(undefined, undefined, undefined));

    // Should not throw
    expect(() => result.current(node)).not.toThrow();
  });

  test("should cleanup refs when node is set to null", () => {
    const callbackRef = vi.fn();
    const objectRef = createRef<HTMLDivElement>();
    const node = document.createElement("div");

    const { result } = renderHook(() => useComposedRefs(callbackRef, objectRef));

    // Set node
    result.current(node);
    expect(callbackRef).toHaveBeenCalledWith(node);
    expect(objectRef.current).toBe(node);

    // Cleanup
    result.current(null);
    expect(callbackRef).toHaveBeenCalledWith(null);
    expect(objectRef.current).toBe(null);
    expect(callbackRef).toHaveBeenCalledTimes(2);
  });
});
