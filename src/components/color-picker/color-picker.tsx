import * as React from "react";

import { Direction as DirectionPrimitive, Slot as SlotPrimitive } from "radix-ui";

import { Popover } from "~/components/popover";
import { VisuallyHiddenInput } from "~/components/visually-hidden-input/visually-hidden-input";
import { useComposedRefs, useIsomorphicLayoutEffect, useLazyRef } from "~/hooks";
import { useAsRef } from "~/hooks/use-as-ref";

import { COLOR_PICKER_IMPL_NAME } from "./color-picker.constants";
import { ColorPickerContext } from "./color-picker.context";
import {
  ColorPickerStoreContext,
  createColorPickerStore,
  useColorPickerStore,
  useColorPickerStoreContext
} from "./color-picker.store";
import { type ColorFormat, type ColorPickerContextValue, type Direction } from "./color-picker.types";
import { hexToRgb, rgbToHex, rgbToHsv } from "./color-picker.utils";

type RootElement = React.ComponentRef<typeof ColorPicker>;

export type ColorPickerProps = Omit<React.ComponentProps<"div">, "onValueChange"> &
  Pick<React.ComponentProps<typeof Popover>, "defaultOpen" | "open" | "onOpenChange" | "modal"> & {
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    dir?: Direction;
    format?: ColorFormat;
    defaultFormat?: ColorFormat;
    onFormatChange?: (format: ColorFormat) => void;
    name?: string;
    asChild?: boolean;
    disabled?: boolean;
    inline?: boolean;
    readOnly?: boolean;
    required?: boolean;
  };

export function ColorPicker(props: ColorPickerProps) {
  const {
    value: valueProp,
    defaultValue = "#000000",
    onValueChange,
    format: formatProp,
    defaultFormat = "hex",
    onFormatChange,
    defaultOpen,
    open: openProp,
    onOpenChange,
    modal,
    name,
    disabled,
    inline,
    readOnly,
    required,
    ...rootProps
  } = props;

  const listenersRef = useLazyRef(() => new Set<() => void>());
  const stateRef = useLazyRef(() => {
    const colorString = valueProp ?? defaultValue;
    const color = hexToRgb(colorString);
    return {
      color,
      hsv: rgbToHsv(color),
      open: openProp ?? defaultOpen ?? false,
      format: formatProp ?? defaultFormat
    };
  });

  const propsRef = useAsRef({ onValueChange, onOpenChange, onFormatChange });
  const store = React.useMemo(
    () => createColorPickerStore(listenersRef, stateRef, propsRef),
    [listenersRef, stateRef, propsRef]
  );

  return (
    <ColorPickerStoreContext.Provider value={store}>
      <ColorPickerImpl
        {...rootProps}
        value={valueProp}
        defaultOpen={defaultOpen}
        open={openProp}
        modal={modal}
        name={name}
        disabled={disabled}
        inline={inline}
        readOnly={readOnly}
        required={required}
      />
    </ColorPickerStoreContext.Provider>
  );
}

type ColorPickerImplProps = Omit<
  ColorPickerProps,
  "defaultValue" | "onValueChange" | "onOpenChange" | "format" | "defaultFormat" | "onFormatChange"
>;

function ColorPickerImpl(props: ColorPickerImplProps) {
  const {
    value: valueProp,
    dir: dirProp,
    defaultOpen,
    open: openProp,
    modal,
    name,
    ref,
    asChild,
    disabled,
    inline,
    readOnly,
    required,
    ...rootProps
  } = props;

  const store = useColorPickerStoreContext(COLOR_PICKER_IMPL_NAME);
  const dir = DirectionPrimitive.useDirection(dirProp);

  const [formTrigger, setFormTrigger] = React.useState<RootElement | null>(null);
  const composedRef = useComposedRefs(ref, (node) => setFormTrigger(node));
  const isFormControl = formTrigger ? !!formTrigger.closest("form") : true;

  useIsomorphicLayoutEffect(() => {
    if (valueProp !== undefined) {
      const currentState = store.getState();
      const color = hexToRgb(valueProp, currentState.color.a);
      store.setColor(color);
      store.setHsv(rgbToHsv(color));
    }
  }, [valueProp]);

  useIsomorphicLayoutEffect(() => {
    if (openProp !== undefined) {
      store.setOpen(openProp);
    }
  }, [openProp]);

  const contextValue = React.useMemo<ColorPickerContextValue>(
    () => ({ dir, disabled, inline, readOnly, required }),
    [dir, disabled, inline, readOnly, required]
  );

  const value = useColorPickerStore((state) => rgbToHex(state.color));
  const open = useColorPickerStore((state) => state.open);

  const RootPrimitive = asChild ? SlotPrimitive.Slot : "div";

  if (inline) {
    return (
      <ColorPickerContext.Provider value={contextValue}>
        <RootPrimitive data-slot="color-picker" {...rootProps} ref={composedRef} />
        {isFormControl && (
          <VisuallyHiddenInput
            type="hidden"
            control={formTrigger}
            name={name}
            value={value}
            disabled={disabled}
            readOnly={readOnly}
            required={required}
          />
        )}
      </ColorPickerContext.Provider>
    );
  }

  return (
    <ColorPickerContext.Provider value={contextValue}>
      <Popover defaultOpen={defaultOpen} open={open} onOpenChange={store.setOpen} modal={modal}>
        <RootPrimitive data-slot="color-picker" {...rootProps} ref={composedRef} />
        {isFormControl && (
          <VisuallyHiddenInput
            type="hidden"
            control={formTrigger}
            name={name}
            value={value}
            disabled={disabled}
            readOnly={readOnly}
            required={required}
          />
        )}
      </Popover>
    </ColorPickerContext.Provider>
  );
}
