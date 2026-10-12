import { animate, motion, type UseInViewOptions, useInView, useMotionValue } from "motion/react";
import * as React from "react";
import { cn } from "~/utils";

export type CountingNumberProps = {
  /**
   * Starting number for the animation
   * @default 0
   */
  from?: number;
  /**
   * Target number to animate to
   * @default 100
   */
  to?: number;
  /**
   * Animation duration in seconds
   * @default 2
   */
  duration?: number;
  /**
   * Delay before starting animation in milliseconds
   * @default 0
   */
  delay?: number;
  /**
   * Custom className for styling
   */
  className?: string;
  /**
   * Whether to start animation when component enters viewport
   * @default true
   */
  startOnView?: boolean;
  /**
   * Whether to animate only once when entering viewport
   * @default false
   */
  once?: boolean;
  /**
   * Margin for in-view detection (rootMargin)
   */
  inViewMargin?: UseInViewOptions["margin"];
  /**
   * Callback fired when animation completes
   */
  onComplete?: () => void;
  /**
   * Custom formatter function for the displayed value.
   * If not provided, the value is rounded to the nearest integer.
   * @example (value) => value.toFixed(2)
   * @example (value) => `$${value.toLocaleString()}`
   */
  format?: (value: number) => string;
};

export function CountingNumber({
  from = 0,
  to = 100,
  duration = 2,
  delay = 0,
  className,
  startOnView = true,
  once = false,
  inViewMargin,
  onComplete,
  format,
  ...props
}: CountingNumberProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { margin: inViewMargin, once });
  const [hasAnimated, setHasAnimated] = React.useState(false);
  const [display, setDisplay] = React.useState(from);
  const motionValue = useMotionValue(from);

  // Should start animation?
  const shouldStart = !startOnView || (isInView && (!once || !hasAnimated));

  React.useEffect(
    function () {
      if (!shouldStart) {
        return;
      }

      setHasAnimated(true);
      const timeout = setTimeout(function () {
        const controls = animate(motionValue, to, {
          duration,
          onComplete,
          onUpdate: (v) => setDisplay(v)
        });
        return function () {
          controls.stop();
        };
      }, delay);
      return function () {
        clearTimeout(timeout);
      };
    },
    [shouldStart, from, to, duration, delay]
  );
  return (
    <motion.span className={cn("inline-block", className)} data-slot="counting-number" ref={ref} {...props}>
      {format ? format(display) : Math.round(display)}
    </motion.span>
  );
}
