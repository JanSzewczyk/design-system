import { describe, expect, test, vi, beforeEach, afterEach, type Mock } from "vitest";

import { renderHook } from "@testing-library/react";

import { useValidationLog } from "./use-validation-log";

describe("useValidationLog", () => {
  let consoleErrorSpy: Mock;

  beforeEach(() => {
    consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  test("should not log when check is true", () => {
    renderHook(() =>
      useValidationLog({
        check: true,
        scope: "TestScope",
        message: "Test message"
      })
    );

    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });

  test("should log error when check is false", () => {
    renderHook(() =>
      useValidationLog({
        check: false,
        scope: "TestScope",
        message: "Test message"
      })
    );

    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "%c[Szum Tech-Design System]%c\n TestScope%c\n Test message",
      "color: #ef4444; font-weight: bold;",
      "color: #3b82f6; font-weight: bold;",
      "color: #f59e0b;"
    );
  });

  test("should log error with correct scope and message", () => {
    const scope = "MyComponent";
    const message = "Invalid prop provided";

    renderHook(() =>
      useValidationLog({
        check: false,
        scope,
        message
      })
    );

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining(scope),
      expect.anything(),
      expect.anything(),
      expect.anything()
    );
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining(message),
      expect.anything(),
      expect.anything(),
      expect.anything()
    );
  });

  test("should re-run validation when dependencies change", () => {
    const { rerender } = renderHook(
      ({ check }) =>
        useValidationLog({
          check,
          scope: "TestScope",
          message: "Test message"
        }),
      { initialProps: { check: true } }
    );

    expect(consoleErrorSpy).not.toHaveBeenCalled();

    rerender({ check: false });
    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
  });

  test("should not log when check changes from false to true", () => {
    const { rerender } = renderHook(
      ({ check }) =>
        useValidationLog({
          check,
          scope: "TestScope",
          message: "Test message"
        }),
      { initialProps: { check: false } }
    );

    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);

    rerender({ check: true });
    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
  });

  test("should handle different scope and message values", () => {
    const { rerender } = renderHook(
      ({ scope, message }) =>
        useValidationLog({
          check: false,
          scope,
          message
        }),
      { initialProps: { scope: "Scope1", message: "Message1" } }
    );

    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);

    rerender({ scope: "Scope2", message: "Message2" });
    expect(consoleErrorSpy).toHaveBeenCalledTimes(2);
    expect(consoleErrorSpy).toHaveBeenLastCalledWith(
      expect.stringContaining("Scope2"),
      expect.anything(),
      expect.anything(),
      expect.anything()
    );
    expect(consoleErrorSpy).toHaveBeenLastCalledWith(
      expect.stringContaining("Message2"),
      expect.anything(),
      expect.anything(),
      expect.anything()
    );
  });
});
