import * as React from "react";

import { Select as ReactSelect } from "radix-ui";

import { CaretSortIcon } from "@radix-ui/react-icons";

import { selectCva } from "./select.styles";

export type SelectProps = ReactSelect.SelectProps & {
  ref?: React.ComponentProps<typeof ReactSelect.Trigger>["ref"];
  placeholder?: React.ReactNode;
  invalid?: boolean;
};

export function Select({ children, placeholder, invalid = false, ref, ...props }: SelectProps) {
  const selectStyles = selectCva({ invalid });

  return (
    <ReactSelect.Root {...props}>
      <ReactSelect.Trigger className={selectStyles} ref={ref} aria-invalid={invalid || undefined}>
        <ReactSelect.Value placeholder={placeholder} />
        <ReactSelect.Icon asChild>
          <CaretSortIcon className="size-5 text-gray-100" />
        </ReactSelect.Icon>
      </ReactSelect.Trigger>

      <ReactSelect.Portal>
        <ReactSelect.Content
          sideOffset={4}
          className="bg-app-foreground z-50 w-full overflow-hidden border border-gray-800 py-1"
        >
          <ReactSelect.Viewport>{children}</ReactSelect.Viewport>
        </ReactSelect.Content>
      </ReactSelect.Portal>
    </ReactSelect.Root>
  );
}
