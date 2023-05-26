import * as React from "react";

import * as ReactTooltip from "@radix-ui/react-tooltip";

export type TooltipProps = ReactTooltip.TooltipContentProps & {
  children?: React.ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  content?: React.ReactNode;
  collisionPadding?: number;
};

export default function Tooltip({
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
    <ReactTooltip.Root
      delayDuration={0}
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
    >
      <ReactTooltip.Trigger asChild>{children}</ReactTooltip.Trigger>
      {content ? (
        <ReactTooltip.Portal>
          <ReactTooltip.Content
            className="text-typography-primary select-none rounded bg-white p-2 will-change-[transform,opacity] typography-body-1 data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade"
            sideOffset={sideOffset}
            side={side}
            align={align}
            collisionPadding={collisionPadding}
            {...props}
            style={{
              maxWidth: "var(--radix-tooltip-content-available-width)"
            }}
          >
            {content}
            <ReactTooltip.Arrow width={8} height={4} className="fill-white" />
          </ReactTooltip.Content>
        </ReactTooltip.Portal>
      ) : null}
    </ReactTooltip.Root>
  );
}
