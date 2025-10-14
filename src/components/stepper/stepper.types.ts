import type * as React from "react";

export const StepperFocusIntent = {
  FIRST: "first",
  LAST: "last",
  PREV: "prev",
  NEXT: "next"
} as const;
export type StepperFocusIntent = (typeof StepperFocusIntent)[keyof typeof StepperFocusIntent];

export const StepperOrientation = {
  HORIZONTAL: "horizontal",
  VERTICAL: "vertical"
} as const;
export type StepperOrientation = (typeof StepperOrientation)[keyof typeof StepperOrientation];

export const StepperNavigationDirection = {
  NEXT: "next",
  PREV: "prev"
} as const;
export type StepperNavigationDirection = (typeof StepperNavigationDirection)[keyof typeof StepperNavigationDirection];

export const StepperActivationMode = {
  AUTOMATIC: "automatic",
  MANUAL: "manual"
} as const;
export type StepperActivationMode = (typeof StepperActivationMode)[keyof typeof StepperActivationMode];

export const StepperDataState = {
  INACTIVE: "inactive",
  ACTIVE: "active",
  COMPLETED: "completed"
} as const;
export type StepperDataState = (typeof StepperDataState)[keyof typeof StepperDataState];

export type StepIndicators = {
  active?: React.ReactNode;
  completed?: React.ReactNode;
  inactive?: React.ReactNode;
  loading?: React.ReactNode;
};
