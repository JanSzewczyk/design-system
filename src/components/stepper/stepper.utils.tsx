import * as React from "react";

import { Direction } from "~/contexts";

import { type StepperTriggerElement } from "./stepper-trigger";
import { STEPPER_MAP_KEY_TO_FOCUS_INTENT } from "./stepper.constants";
import { type StepperStepState } from "./stepper.store";
import { StepperDataState, type StepperOrientation } from "./stepper.types";

export function useLazyRef<T>(fn: () => T) {
  const ref = React.useRef<T | null>(null);

  if (ref.current === null) {
    ref.current = fn();
  }

  return ref as React.RefObject<T>;
}

export const useIsomorphicLayoutEffect = typeof window === "undefined" ? React.useEffect : React.useLayoutEffect;

export function focusFirst(candidates: React.RefObject<StepperTriggerElement | null>[], preventScroll = false) {
  const PREVIOUSLY_FOCUSED_ELEMENT = document.activeElement;
  for (const candidateRef of candidates) {
    const candidate = candidateRef.current;
    if (!candidate) continue;
    if (candidate === PREVIOUSLY_FOCUSED_ELEMENT) return;
    candidate.focus({ preventScroll });
    if (document.activeElement !== PREVIOUSLY_FOCUSED_ELEMENT) return;
  }
}

export function getDataState(
  value: string | undefined,
  itemValue: string,
  stepState: StepperStepState | undefined,
  steps: Map<string, StepperStepState>,
  variant: "item" | "separator" = "item"
): StepperDataState {
  const stepKeys = Array.from(steps.keys());
  const currentIndex = stepKeys.indexOf(itemValue);

  if (stepState?.completed) {
    return StepperDataState.COMPLETED;
  }

  if (value === itemValue) {
    return variant === "separator" ? StepperDataState.INACTIVE : StepperDataState.ACTIVE;
  }

  if (value) {
    const activeIndex = stepKeys.indexOf(value);

    if (activeIndex > currentIndex) {
      return StepperDataState.COMPLETED;
    }
  }

  return StepperDataState.INACTIVE;
}

export function getId(id: string, variant: "trigger" | "content" | "title" | "description", value: string) {
  return `${id}-${variant}-${value}`;
}

export function wrapArray<T>(array: T[], startIndex: number) {
  return array.map<T>((_, index) => array[(startIndex + index) % array.length] as T);
}

export function getDirectionAwareKey(key: string, dir?: Direction) {
  if (dir !== Direction.RTL) return key;
  return key === "ArrowLeft" ? "ArrowRight" : key === "ArrowRight" ? "ArrowLeft" : key;
}

export function getFocusIntent(
  event: React.KeyboardEvent<StepperTriggerElement>,
  dir?: Direction,
  orientation?: StepperOrientation
) {
  const key = getDirectionAwareKey(event.key, dir);
  if (orientation === "horizontal" && ["ArrowUp", "ArrowDown"].includes(key)) return undefined;
  if (orientation === "vertical" && ["ArrowLeft", "ArrowRight"].includes(key)) return undefined;
  return STEPPER_MAP_KEY_TO_FOCUS_INTENT[key];
}
