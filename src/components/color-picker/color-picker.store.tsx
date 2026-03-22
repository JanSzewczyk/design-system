import * as React from "react";

import { type ColorFormat, type ColorValue, type HSVColorValue } from "./color-picker.types";
import { colorToString, hsvToRgb } from "./color-picker.utils";

export type ColorPickerStoreState = {
  color: ColorValue;
  hsv: HSVColorValue;
  open: boolean;
  format: ColorFormat;
};

export type ColorPickerStore = {
  subscribe: (cb: () => void) => () => void;
  getState: () => ColorPickerStoreState;
  setColor: (value: ColorValue) => void;
  setHsv: (value: HSVColorValue) => void;
  setOpen: (value: boolean) => void;
  setFormat: (value: ColorFormat) => void;
  notify: () => void;
};

export const ColorPickerStoreContext = React.createContext<ColorPickerStore | null>(null);

export function useColorPickerStoreContext(consumerName: string): ColorPickerStore {
  const context = React.useContext(ColorPickerStoreContext);
  if (!context) {
    throw new Error(`\`${consumerName}\` must be used within \`ColorPicker\``);
  }
  return context;
}

export function useColorPickerStore<U>(selector: (state: ColorPickerStoreState) => U): U {
  const store = useColorPickerStoreContext("useColorPickerStore");
  const getSnapshot = React.useCallback(() => selector(store.getState()), [store, selector]);
  return React.useSyncExternalStore(store.subscribe, getSnapshot, getSnapshot);
}

export function createColorPickerStore(
  listenersRef: React.RefObject<Set<() => void>>,
  stateRef: React.RefObject<ColorPickerStoreState>,
  propsRef: React.RefObject<{
    onValueChange?: (value: string) => void;
    onOpenChange?: (open: boolean) => void;
    onFormatChange?: (format: ColorFormat) => void;
  }>
): ColorPickerStore {
  const store: ColorPickerStore = {
    subscribe: (cb) => {
      listenersRef.current.add(cb);
      return () => listenersRef.current.delete(cb);
    },
    getState: () => stateRef.current,
    setColor: (value: ColorValue) => {
      if (Object.is(stateRef.current.color, value)) return;
      const prevState = { ...stateRef.current };
      stateRef.current.color = value;
      if (propsRef.current.onValueChange) {
        propsRef.current.onValueChange(colorToString(value, prevState.format));
      }
      store.notify();
    },
    setHsv: (value: HSVColorValue) => {
      if (Object.is(stateRef.current.hsv, value)) return;
      const prevState = { ...stateRef.current };
      stateRef.current.hsv = value;
      if (propsRef.current.onValueChange) {
        propsRef.current.onValueChange(colorToString(hsvToRgb(value), prevState.format));
      }
      store.notify();
    },
    setOpen: (value: boolean) => {
      if (Object.is(stateRef.current.open, value)) return;
      stateRef.current.open = value;
      propsRef.current.onOpenChange?.(value);
      store.notify();
    },
    setFormat: (value: ColorFormat) => {
      if (Object.is(stateRef.current.format, value)) return;
      stateRef.current.format = value;
      propsRef.current.onFormatChange?.(value);
      store.notify();
    },
    notify: () => {
      for (const cb of listenersRef.current) cb();
    }
  };
  return store;
}
