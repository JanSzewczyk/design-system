import * as React from "react";

import * as ReactSelect from "@radix-ui/react-select";

import { CheckIcon } from "../../../icons";

export type SelectItemProps = React.ComponentProps<typeof ReactSelect.Item>;

export function SelectItem({ children, ...props }: SelectItemProps) {
  return (
    <ReactSelect.Item
      className="flex w-full select-none flex-row items-center justify-between px-3 py-2 font-poppins text-gray-100 data-[disabled]:pointer-events-none data-[highlighted]:bg-gray-400 data-[state=checked]:bg-primary-300 data-[highlighted]:outline-none"
      {...props}
    >
      <ReactSelect.ItemText className="flex-1">{children}</ReactSelect.ItemText>
      <ReactSelect.ItemIndicator>
        <CheckIcon className="h-4 w-4" />
      </ReactSelect.ItemIndicator>
    </ReactSelect.Item>
  );
}
