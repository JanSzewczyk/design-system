import * as React from "react";

import { type StepperNavigationDirection } from "~/components";

import { STEPPER_ROOT_NAME } from "./stepper.constants";

export type StepperStepState = {
  value: string;
  completed: boolean;
  disabled: boolean;
  loading: boolean;
};

export type StepperStoreState = {
  steps: Map<string, StepperStepState>;
  value?: string;
};

export type Store = {
  subscribe: (callback: () => void) => () => void;
  getState: () => StepperStoreState;
  setState: <K extends keyof StepperStoreState>(key: K, value: StepperStoreState[K]) => void;
  setStateWithValidation: (value: string, direction: StepperNavigationDirection) => Promise<boolean>;
  hasValidation: () => boolean;
  notify: () => void;
  setStep: (state: StepperStepState) => void;
  addStep: (state: StepperStepState) => void;
  removeStep: (value: string) => void;
};

export function createStepperStore(
  listenersRef: React.RefObject<Set<() => void>>,
  stateRef: React.RefObject<StepperStoreState>,
  onValueChange?: (value: string) => void,
  onValueComplete?: (value: string, completed: boolean) => void,
  onValueAdd?: (value: string) => void,
  onValueRemove?: (value: string) => void,
  onValidate?: (value: string, direction: StepperNavigationDirection) => boolean | Promise<boolean>
): Store {
  const store: Store = {
    subscribe: (cb) => {
      if (listenersRef.current) {
        listenersRef.current.add(cb);
        return () => listenersRef.current?.delete(cb);
      }
      return () => {};
    },
    getState: () =>
      stateRef.current ?? {
        steps: new Map(),
        value: undefined
      },
    setState: (key, value) => {
      const state = stateRef.current;
      if (!state || Object.is(state[key], value)) return;

      if (key === "value" && typeof value === "string") {
        state.value = value;
        onValueChange?.(value);
      } else {
        state[key] = value;
      }

      store.notify();
    },
    setStateWithValidation: async (value, direction) => {
      if (!onValidate) {
        store.setState("value", value);
        return true;
      }

      try {
        const isValid = await onValidate(value, direction);
        if (isValid) {
          store.setState("value", value);
        }
        return isValid;
      } catch {
        return false;
      }
    },
    hasValidation: () => !!onValidate,
    addStep: (newStep) => {
      const state = stateRef.current;
      if (state) {
        state.steps = new Map(state.steps);
        state.steps.set(newStep.value, newStep);
        onValueAdd?.(newStep.value);
        store.notify();
      }
    },
    removeStep: (value) => {
      const state = stateRef.current;
      if (state) {
        state.steps = new Map(state.steps);
        state.steps.delete(value);
        onValueRemove?.(value);
        store.notify();
      }
    },
    setStep: ({ value, disabled, loading, completed }) => {
      const state = stateRef.current;
      if (state) {
        const step = state.steps.get(value);
        if (step) {
          const updatedStep: StepperStepState = { ...step, completed, disabled, loading };
          state.steps = new Map(state.steps);
          state.steps.set(value, updatedStep);

          if (completed !== step.completed) {
            onValueComplete?.(value, completed);
          }

          store.notify();
        }
      }
    },
    notify: () => {
      if (listenersRef.current) {
        for (const cb of listenersRef.current) {
          cb();
        }
      }
    }
  };

  return store;
}

export const StepperStoreContext = React.createContext<Store | null>(null);

export function useStepperStoreContext(consumerName: string) {
  const context = React.useContext(StepperStoreContext);
  if (!context) {
    throw new Error(`\`${consumerName}\` must be used within \`${STEPPER_ROOT_NAME}\``);
  }
  return context;
}

export function useStepperStore<T>(selector: (state: StepperStoreState) => T): T {
  const store = useStepperStoreContext("useStore");

  const getSnapshot = React.useCallback(() => selector(store.getState()), [selector, store]);

  return React.useSyncExternalStore(store.subscribe, getSnapshot, getSnapshot);
}
