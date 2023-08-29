import * as React from "react";

import * as ReactSelect from "@radix-ui/react-select";

import { selectCva } from "./Select.styles";

import { IconSelector } from "../../icons";
import { OmitStylesProps } from "../../types/utils.types";

export type SelectProps = OmitStylesProps<ReactSelect.SelectProps> & {
  placeholder?: React.ReactNode;
};

export const Select = React.forwardRef(
  (
    { children, placeholder, ...props }: SelectProps,
    forwardedRef: React.Ref<HTMLButtonElement>
  ) => {
    const selectStyles = selectCva();

    return (
      <ReactSelect.Root {...props}>
        <ReactSelect.Trigger className={selectStyles} ref={forwardedRef}>
          <ReactSelect.Value placeholder="Select a fruit…" />
          <ReactSelect.Icon className="-mr-1.5">
            <IconSelector className="h-5 w-5 text-gray-200" />
          </ReactSelect.Icon>
        </ReactSelect.Trigger>

        <ReactSelect.Portal>
          <ReactSelect.Content
            sideOffset={4}
            className="w-full overflow-hidden border border-gray-350 bg-app-primary py-1"
          >
            <ReactSelect.Viewport>{children}</ReactSelect.Viewport>
          </ReactSelect.Content>
        </ReactSelect.Portal>
      </ReactSelect.Root>
    );
  }
);