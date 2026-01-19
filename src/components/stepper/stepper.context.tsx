import * as React from "react";

import { STEPPER_ROOT_NAME } from "./stepper.constants";
import {
  type StepIndicators,
  type StepperActivationMode,
  type StepperDirection,
  type StepperOrientation
} from "./stepper.types";

export interface StepperContextValue {
  id: string;
  dir: StepperDirection;
  orientation: StepperOrientation;
  activationMode: StepperActivationMode;
  disabled: boolean;
  nonInteractive: boolean;
  loop: boolean;
  indicators: StepIndicators;
}

export const StepperContext = React.createContext<StepperContextValue | null>(null);

export function useStepperContext(consumerName: string) {
  const context = React.useContext(StepperContext);

  if (!context) {
    throw new Error(`\`${consumerName}\` must be used within \`${STEPPER_ROOT_NAME}\``);
  }

  return context;
}
