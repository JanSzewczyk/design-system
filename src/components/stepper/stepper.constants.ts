import { type StepperFocusIntent } from "./stepper.types";

export const STEPPER_ROOT_NAME = "Stepper";
export const STEPPER_NAV_NAME = "StepperNav";
export const STEPPER_ITEM_NAME = "StepperItem";
export const STEPPER_TRIGGER_NAME = "StepperTrigger";
export const STEPPER_INDICATOR_NAME = "StepperIndicator";
export const STEPPER_TITLE_NAME = "StepperTitle";
export const STEPPER_DESCRIPTION_NAME = "StepperDescription";
export const STEPPER_CONTENT_NAME = "StepperContent";
export const STEPPER_PREV_TRIGGER_NAME = "StepperPrevTrigger";
export const STEPPER_NEXT_TRIGGER_NAME = "StepperNextTrigger";

export const STEPPER_ENTRY_FOCUS = "stepperFocusGroup.onEntryFocus";
export const STEPPER_EVENT_OPTIONS = { bubbles: false, cancelable: true };
export const STEPPER_ARROW_KEYS = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];

export const STEPPER_MAP_KEY_TO_FOCUS_INTENT: Record<string, StepperFocusIntent> = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
