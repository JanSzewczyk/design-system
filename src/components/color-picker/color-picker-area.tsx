import * as React from "react";

import { Slot as SlotPrimitive } from "radix-ui";

import { useComposedRefs } from "~/hooks";
import { useAsRef } from "~/hooks/use-as-ref";
import { cn } from "~/utils";

import { COLOR_PICKER_AREA_NAME } from "./color-picker.constants";
import { useColorPickerContext } from "./color-picker.context";
import { useColorPickerStore, useColorPickerStoreContext } from "./color-picker.store";
import { hsvToRgb } from "./color-picker.utils";

type AreaElement = HTMLDivElement;

export type ColorPickerAreaProps = React.ComponentProps<"div"> & {
  asChild?: boolean;
};

export function ColorPickerArea(props: ColorPickerAreaProps) {
  const {
    asChild,
    onPointerDown: onPointerDownProp,
    onPointerMove: onPointerMoveProp,
    onPointerUp: onPointerUpProp,
    className,
    ref,
    ...areaProps
  } = props;

  const propsRef = useAsRef({
    onPointerDown: onPointerDownProp,
    onPointerMove: onPointerMoveProp,
    onPointerUp: onPointerUpProp
  });

  const context = useColorPickerContext(COLOR_PICKER_AREA_NAME);
  const store = useColorPickerStoreContext(COLOR_PICKER_AREA_NAME);
  const hsv = useColorPickerStore((state) => state.hsv);

  const isDraggingRef = React.useRef(false);
  const areaRef = React.useRef<AreaElement>(null);
  const composedRef = useComposedRefs(ref, areaRef);

  const updateColorFromPosition = React.useCallback(
    (clientX: number, clientY: number) => {
      if (!areaRef.current) return;
      const rect = areaRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      const y = Math.max(0, Math.min(1, 1 - (clientY - rect.top) / rect.height));
      const newHsv = {
        h: hsv?.h ?? 0,
        s: Math.round(x * 100),
        v: Math.round(y * 100),
        a: hsv?.a ?? 1
      };
      store.setHsv(newHsv);
      store.setColor(hsvToRgb(newHsv));
    },
    [hsv, store]
  );

  const onPointerDown = React.useCallback(
    (event: React.PointerEvent<AreaElement>) => {
      if (context.disabled) return;
      propsRef.current.onPointerDown?.(event);
      if (event.defaultPrevented) return;
      isDraggingRef.current = true;
      areaRef.current?.setPointerCapture(event.pointerId);
      updateColorFromPosition(event.clientX, event.clientY);
    },
    [context.disabled, updateColorFromPosition, propsRef]
  );

  const onPointerMove = React.useCallback(
    (event: React.PointerEvent<AreaElement>) => {
      propsRef.current.onPointerMove?.(event);
      if (event.defaultPrevented) return;
      if (isDraggingRef.current) updateColorFromPosition(event.clientX, event.clientY);
    },
    [updateColorFromPosition, propsRef]
  );

  const onPointerUp = React.useCallback(
    (event: React.PointerEvent<AreaElement>) => {
      propsRef.current.onPointerUp?.(event);
      if (event.defaultPrevented) return;
      isDraggingRef.current = false;
      areaRef.current?.releasePointerCapture(event.pointerId);
    },
    [propsRef]
  );

  const hue = hsv?.h ?? 0;
  const backgroundHue = hsvToRgb({ h: hue, s: 100, v: 100, a: 1 });
  const AreaPrimitive = asChild ? SlotPrimitive.Slot : "div";

  return (
    <AreaPrimitive
      data-slot="color-picker-area"
      {...areaProps}
      className={cn(
        "relative h-40 w-full cursor-crosshair touch-none rounded-sm border",
        context.disabled && "pointer-events-none opacity-50",
        className
      )}
      ref={composedRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      <div className="absolute inset-0 overflow-hidden rounded-sm">
        <div
          className="absolute inset-0"
          style={{ backgroundColor: `rgb(${backgroundHue.r}, ${backgroundHue.g}, ${backgroundHue.b})` }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, #fff, transparent)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent, #000)" }} />
      </div>
      <div
        className="absolute size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-sm"
        style={{ left: `${hsv?.s ?? 0}%`, top: `${100 - (hsv?.v ?? 0)}%` }}
      />
    </AreaPrimitive>
  );
}
