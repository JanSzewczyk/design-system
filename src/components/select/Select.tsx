import * as React from "react";

import * as ReactSelect from "@radix-ui/react-select";

import { selectCva } from "./Select.styles";

import { CaretSortIcon } from "../../icons";
import { OmitStylesProps } from "../../types/utils.types";

export type SelectProps = OmitStylesProps<ReactSelect.SelectProps> & {
  placeholder?: React.ReactNode;
  invalid?: boolean;
};

export const Select = React.forwardRef(function (
  { children, placeholder, invalid = false, ...props }: SelectProps,
  forwardedRef: React.Ref<HTMLButtonElement>
) {
  const selectStyles = selectCva({ invalid });

  return (
    <ReactSelect.Root {...props}>
      <ReactSelect.Trigger className={selectStyles} ref={forwardedRef}>
        <ReactSelect.Value placeholder={placeholder} />
        <ReactSelect.Icon className="-mr-1.5">
          <CaretSortIcon className="h-5 w-5 text-gray-200" />
        </ReactSelect.Icon>
      </ReactSelect.Trigger>

      <ReactSelect.Portal>
        <ReactSelect.Content
          sideOffset={4}
          className="w-full overflow-hidden border border-gray-400 bg-foreground py-1 z-50"
        >
          <ReactSelect.Viewport>{children}</ReactSelect.Viewport>
        </ReactSelect.Content>
      </ReactSelect.Portal>
    </ReactSelect.Root>
  );
});
