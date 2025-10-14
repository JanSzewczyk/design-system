import * as React from "react";

import { Slot } from "@radix-ui/react-slot";
import { type Direction, useDirection } from "~/contexts";
import { cn } from "~/utils";

import { StepperContext, type StepperContextValue } from "./stepper.context";
import { createStepperStore, StepperStoreContext, type StepperStoreState } from "./stepper.store";
import {
  type StepIndicators,
  type StepperActivationMode,
  type StepperNavigationDirection,
  type StepperOrientation
} from "./stepper.types";
import { useIsomorphicLayoutEffect, useLazyRef } from "./stepper.utils";

export type StepperProps = React.ComponentProps<"div"> & {
  asChild?: boolean;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  onValueComplete?: (value: string, completed: boolean) => void;
  onValueAdd?: (value: string) => void;
  onValueRemove?: (value: string) => void;
  onValidate?: (value: string, direction: StepperNavigationDirection) => boolean | Promise<boolean>;
  activationMode?: StepperActivationMode;
  dir?: Direction;
  orientation?: StepperOrientation;
  disabled?: boolean;
  loop?: boolean;
  nonInteractive?: boolean;
  indicators?: StepIndicators;
};

export function Stepper({
  value,
  defaultValue,
  onValueChange,
  onValueComplete,
  onValueAdd,
  onValueRemove,
  onValidate,
  id: idProp,
  dir: dirProp,
  orientation = "horizontal",
  activationMode = "automatic",
  asChild,
  disabled = false,
  nonInteractive = false,
  loop = false,
  className,
  indicators = {},
  ...rootProps
}: StepperProps) {
  const id = React.useId();
  const rootId = idProp ?? id;

  const listenersRef = useLazyRef(() => new Set<() => void>());
  const stateRef = useLazyRef<StepperStoreState>(() => ({
    steps: new Map(),
    value: value ?? defaultValue
  }));

  const store = React.useMemo(
    () =>
      createStepperStore(listenersRef, stateRef, onValueChange, onValueComplete, onValueAdd, onValueRemove, onValidate),
    [listenersRef, stateRef, onValueChange, onValueComplete, onValueAdd, onValueRemove, onValidate]
  );

  useIsomorphicLayoutEffect(() => {
    if (value !== undefined) {
      store.setState("value", value);
    }
  }, [value]);

  const dir = useDirection(dirProp);

  const contextValue = React.useMemo<StepperContextValue>(
    () => ({
      id: rootId,
      dir,
      orientation,
      activationMode,
      disabled,
      nonInteractive,
      loop,
      indicators
    }),
    [rootId, dir, orientation, activationMode, disabled, nonInteractive, loop, indicators]
  );

  const RootPrimitive = asChild ? Slot : "div";

  return (
    <StepperStoreContext.Provider value={store}>
      <StepperContext.Provider value={contextValue}>
        <RootPrimitive
          id={rootId}
          data-disabled={disabled ? "" : undefined}
          data-orientation={orientation}
          data-slot="stepper"
          dir={dir}
          {...rootProps}
          className={cn("w-full", className)}
        />
      </StepperContext.Provider>
    </StepperStoreContext.Provider>
  );
}
