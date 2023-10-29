import * as React from "react";

import * as ReactSelect from "@radix-ui/react-select";

import { CheckIcon } from "../../../icons";
import { OmitStylesProps } from "../../../types/utils.types";

export type SelectItemProps = OmitStylesProps<ReactSelect.SelectItemProps>;

export const SelectItem = React.forwardRef(
  ({ children, ...props }: SelectItemProps, ref: React.Ref<HTMLDivElement>) => {
    return (
      <ReactSelect.Item
        className="flex w-full select-none flex-row items-center justify-between px-3 py-2 font-poppins text-gray-100 data-[disabled]:pointer-events-none data-[highlighted]:bg-gray-400 data-[state=checked]:bg-primary-300 data-[highlighted]:outline-none"
        ref={ref}
        {...props}
      >
        <ReactSelect.ItemText className="flex-1">{children}</ReactSelect.ItemText>
        <ReactSelect.ItemIndicator>
          <CheckIcon className="h-4 w-4" />
        </ReactSelect.ItemIndicator>
      </ReactSelect.Item>
    );
  }
);
