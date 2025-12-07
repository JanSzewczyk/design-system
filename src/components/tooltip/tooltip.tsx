import * as React from "react";

import { Tooltip as ReactTooltip } from "radix-ui";

export type TooltipProps = ReactTooltip.TooltipContentProps & {
  children?: React.ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  content?: React.ReactNode;
  collisionPadding?: number;
};

export function Tooltip({
  defaultOpen,
  content,
  open,
  onOpenChange,
  children,
  side,
  align,
  collisionPadding = 8,
  sideOffset = 8,
  ...props
}: TooltipProps) {
  return (
    <ReactTooltip.Root delayDuration={0} open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      <ReactTooltip.Trigger asChild>{children}</ReactTooltip.Trigger>
      {content ? (
        <ReactTooltip.Portal>
          <ReactTooltip.Content
            className="text-body-1 data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade rounded bg-white p-2 text-gray-100 will-change-[transform,opacity] select-none"
            sideOffset={sideOffset}
            side={side}
            align={align}
            collisionPadding={collisionPadding}
            {...props}
          >
            {content}
            <ReactTooltip.Arrow width={8} height={4} className="fill-white" />
          </ReactTooltip.Content>
        </ReactTooltip.Portal>
      ) : null}
    </ReactTooltip.Root>
  );
}
