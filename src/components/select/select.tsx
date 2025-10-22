import * as React from "react";

import { ChevronDownIcon } from "lucide-react";
import { Select as SelectPrimitive } from "radix-ui";

import { cn } from "~/utils";

export type SelectProps = React.ComponentProps<typeof SelectPrimitive.Root> &
  React.ComponentProps<typeof SelectPrimitive.Trigger> & {
    size?: "sm" | "default";
    invalid?: boolean;
    placeholder?: React.ReactNode;
  };

export function Select({
  children,
  disabled,
  defaultOpen,
  defaultValue,
  value,
  dir,
  open,
  form,
  name,
  onOpenChange,
  onValueChange,
  required,
  autoComplete,
  // value props
  placeholder,
  // trigger props
  className,
  size = "default",
  invalid = false,
  ...triggerProps
}: SelectProps) {
  const rootProps = {
    children,
    disabled,
    defaultOpen,
    defaultValue,
    value,
    dir,
    open,
    form,
    name,
    onOpenChange,
    onValueChange,
    required,
    autoComplete
  };

  return (
    <SelectPrimitive.Root data-slot="select" {...rootProps}>
      <SelectPrimitive.Trigger
        data-slot="select-trigger"
        aria-invalid={triggerProps["aria-invalid"] || invalid ? true : undefined}
        data-size={size}
        className={cn(
          "border-input dark:bg-input/30 dark:hover:bg-input/50 flex w-full items-center justify-between gap-2 rounded border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none",
          "*:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "aria-invalid:ring-error/20 dark:aria-invalid:ring-error/40 aria-invalid:border-error",
          "data-[size=default]:h-9 data-[size=sm]:h-8",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "[&_svg:not([class*='text-'])]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
          "data-[placeholder]:text-muted-foreground",

          className
        )}
        {...triggerProps}
      >
        <SelectPrimitive.Value data-slot="select-value" placeholder={placeholder} />
        <SelectPrimitive.Icon asChild>
          <ChevronDownIcon className="size-4 opacity-50" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>

      {children}
    </SelectPrimitive.Root>
  );
}
