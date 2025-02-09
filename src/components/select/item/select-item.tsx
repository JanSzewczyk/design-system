import * as React from "react";

import { Select as ReactSelect } from "radix-ui";

import { CheckIcon } from "~/icons";

export type SelectItemProps = React.ComponentProps<typeof ReactSelect.Item>;

export function SelectItem({ children, ...props }: SelectItemProps) {
  return (
    <ReactSelect.Item
      className="text-body-2 data-[state=checked]:bg-primary-300 flex w-full flex-row items-center justify-between px-3 py-2 text-gray-100 select-none data-[disabled]:pointer-events-none data-[highlighted]:bg-gray-400 data-[highlighted]:outline-none"
      {...props}
    >
      <ReactSelect.ItemText className="flex-1">{children}</ReactSelect.ItemText>
      <ReactSelect.ItemIndicator>
        <CheckIcon className="size-4" />
      </ReactSelect.ItemIndicator>
    </ReactSelect.Item>
  );
}
