import * as React from "react";

import { Slot as SlotPrimitive } from "radix-ui";

import { PopoverContent } from "~/components/popover";
import { cn } from "~/utils";

import { COLOR_PICKER_CONTENT_NAME } from "./color-picker.constants";
import { useColorPickerContext } from "./color-picker.context";

export type ColorPickerContentProps = React.ComponentProps<typeof PopoverContent>;

export function ColorPickerContent(props: ColorPickerContentProps) {
  const { asChild, className, children, ...popoverContentProps } = props;

  const context = useColorPickerContext(COLOR_PICKER_CONTENT_NAME);

  if (context.inline) {
    const ContentPrimitive = asChild ? SlotPrimitive.Slot : "div";
    return (
      <ContentPrimitive
        data-slot="color-picker-content"
        {...popoverContentProps}
        className={cn("flex w-[340px] flex-col gap-4 p-4", className)}
      >
        {children}
      </ContentPrimitive>
    );
  }

  return (
    <PopoverContent
      data-slot="color-picker-content"
      asChild={asChild}
      {...popoverContentProps}
      className={cn("flex w-[340px] flex-col gap-4 p-4", className)}
    >
      {children}
    </PopoverContent>
  );
}
