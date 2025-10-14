import * as React from "react";
import { StepperTriggerElement } from "./stepper-trigger";

export type StepperItemData = {
  id: string;
  ref: React.RefObject<StepperTriggerElement | null>;
  value: string;
  active: boolean;
  disabled: boolean;
};

export type StepperFocusContextValue = {
  tabStopId: string | null;
  onItemFocus: (tabStopId: string) => void;
  onItemShiftTab: () => void;
  onFocusableItemAdd: () => void;
  onFocusableItemRemove: () => void;
  onItemRegister: (item: StepperItemData) => void;
  onItemUnregister: (id: string) => void;
  getItems: () => StepperItemData[];
};

export const StepperFocusContext = React.createContext<StepperFocusContextValue | null>(null);

export function useStepperFocusContext(consumerName: string) {
  const context = React.useContext(StepperFocusContext);
  if (!context) {
    throw new Error(`\`${consumerName}\` must be used within \`FocusProvider\``);
  }
  return context;
}
