import * as React from "react";

import { cn } from "~/utils";

export type MarqueeProps = React.ComponentPropsWithoutRef<"div"> & {
  /**
   * Optional CSS class name to apply custom styles
   */
  className?: string;
  /**
   * Whether to reverse the animation direction
   * @default false
   */
  reverse?: boolean;
  /**
   * Whether to pause the animation on hover
   * @default false
   */
  pauseOnHover?: boolean;
  /**
   * Content to be displayed in the marquee
   */
  children: React.ReactNode;
  /**
   * Whether to animate vertically instead of horizontally
   * @default false
   */
  vertical?: boolean;
  /**
   * Number of times to repeat the content
   * @default 4
   */
  repeat?: number;
  /**
   * ARIA label for accessibility
   */
  ariaLabel?: string;
  /**
   * ARIA live region politeness
   */
  ariaLive?: "off" | "polite" | "assertive";
  /**
   * ARIA role
   */
  ariaRole?: string;
};

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ariaLabel,
  ariaLive = "off",
  ariaRole = "region",
  ...props
}: MarqueeProps) {
  const marqueeRef = React.useRef<HTMLDivElement>(null);

  return (
    <div
      {...props}
      aria-label={ariaLabel}
      aria-live={ariaLive}
      className={cn(
        "group flex gap-(--gap) overflow-hidden p-2 [--duration:40s] [--gap:1rem]",
        {
          "flex-col": vertical,
          "flex-row": !vertical
        },
        className
      )}
      data-slot="marquee"
      ref={marqueeRef}
      role={ariaRole}
      tabIndex={0}
    >
      {React.useMemo(
        () => (
          <>
            {Array.from({ length: repeat }, (_, i) => (
              <div
                className={cn(
                  "flex shrink-0 justify-around gap-(--gap)",
                  !vertical ? "animate-marquee flex-row" : "animate-marquee-vertical flex-col",
                  pauseOnHover && "group-hover:paused",
                  reverse && "direction-reverse"
                )}
                key={i}
              >
                {children}
              </div>
            ))}
          </>
        ),
        [repeat, children, vertical, pauseOnHover, reverse]
      )}
    </div>
  );
}
