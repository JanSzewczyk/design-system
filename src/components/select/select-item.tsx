import * as React from "react";

import { Select as ReactSelect } from "radix-ui";

import { CheckIcon } from "@radix-ui/react-icons";
import { cn } from "~/utils";

export type SelectItemProps = React.ComponentProps<typeof ReactSelect.Item>;

export function SelectItem({ children, className, ...props }: SelectItemProps) {
  return (
    <ReactSelect.Item
      className={cn(
        "text-body-2 data-[state=checked]:bg-primary-500 data-[state=checked]:text-app-foreground flex w-full flex-row items-center justify-between px-3 py-2 text-gray-100 select-none data-[disabled]:pointer-events-none data-[highlighted]:bg-gray-900 data-[highlighted]:outline-none data-[state=checked]:outline-none",
        className
      )}
      {...props}
    >
      <ReactSelect.ItemText className="flex-1">{children}</ReactSelect.ItemText>
      <ReactSelect.ItemIndicator>
        <CheckIcon className="size-4" />
      </ReactSelect.ItemIndicator>
    </ReactSelect.Item>
  );
}
