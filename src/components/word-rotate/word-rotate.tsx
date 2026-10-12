import { type MotionProps, motion, type UseInViewOptions, useInView, type Variants } from "motion/react";
import * as React from "react";
import { cn } from "~/utils";

import { type WordRotateAnimationStyle } from "./word-rotate.types";

export type WordRotateProps = Omit<MotionProps, "children"> & {
  words: string[];
  /** Duration in ms each word is visible */
  duration?: number;
  /** Animation style for word transitions */
  animationStyle?: WordRotateAnimationStyle;
  /** Whether to loop through words */
  loop?: boolean;
  /** Duration in ms between word transitions */
  pauseDuration?: number;
  /** Custom className for the word */
  className?: string;
  /** Custom className for the container */
  containerClassName?: string;
  /** Whether to start animation when component enters viewport */
  startOnView?: boolean;
  /** Whether to animate only once */
  once?: boolean;
  /** Margin for in-view detection (rootMargin) */
  inViewMargin?: UseInViewOptions["margin"];
};

export function WordRotate({
  words,
  duration = 1500,
  animationStyle = "fade",
  loop = true,
  className,
  containerClassName,
  pauseDuration = 300,
  startOnView = true,
  once = false,
  inViewMargin,
  ...props
}: WordRotateProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { margin: inViewMargin as UseInViewOptions["margin"], once });
  const [hasAnimated, setHasAnimated] = React.useState<boolean>(false);
  const [currentWord, setCurrentWord] = React.useState<number>(0);
  const [show, setShow] = React.useState<boolean>(true);

  // Animation variants
  const variants: Record<string, Variants> = {
    fade: {
      animate: {
        opacity: 1,
        transition: {
          duration: 0.4,
          ease: [0.4, 0.0, 0.2, 1] // Custom cubic-bezier for smooth fade
        }
      },
      exit: {
        opacity: 0,
        transition: {
          duration: 0.3,
          ease: [0.4, 0.0, 1, 1] // Faster exit
        }
      },
      initial: { opacity: 0 }
    },
    flip: {
      animate: {
        opacity: 1,
        rotateX: 0,
        transition: {
          damping: 20,
          mass: 1,
          stiffness: 200,
          type: "spring"
        }
      },
      exit: {
        opacity: 0,
        rotateX: -90,
        transition: {
          duration: 0.3,
          ease: [0.4, 0.0, 1, 1]
        }
      },
      initial: { opacity: 0, rotateX: 90 }
    },
    scale: {
      animate: {
        opacity: 1,
        scale: 1,
        transition: {
          damping: 30,
          mass: 0.6,
          stiffness: 400,
          type: "spring"
        }
      },
      exit: {
        opacity: 0,
        scale: 0.9,
        transition: {
          duration: 0.2,
          ease: [0.4, 0.0, 1, 1]
        }
      },
      initial: { opacity: 0, scale: 0.8 }
    },
    "slide-down": {
      animate: {
        opacity: 1,
        transition: {
          damping: 25,
          mass: 0.8,
          stiffness: 300,
          type: "spring"
        },
        y: 0
      },
      exit: {
        opacity: 0,
        transition: {
          duration: 0.25,
          ease: [0.4, 0.0, 1, 1]
        },
        y: 24
      },
      initial: { opacity: 0, y: -24 }
    },
    "slide-up": {
      animate: {
        opacity: 1,
        transition: {
          damping: 25,
          mass: 0.8,
          stiffness: 300,
          type: "spring"
        },
        y: 0
      },
      exit: {
        opacity: 0,
        transition: {
          duration: 0.25,
          ease: [0.4, 0.0, 1, 1]
        },
        y: -24
      },
      initial: { opacity: 0, y: 24 }
    }
  };

  // Determine if we should start animation
  const shouldStart = !startOnView || (isInView && (!once || !hasAnimated));

  React.useEffect(() => {
    if (!shouldStart) return;
    if (words.length === 0) return;

    let intervalId: ReturnType<typeof setInterval> | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    intervalId = setInterval(() => {
      setShow(false);
      timeoutId = setTimeout(() => {
        setCurrentWord((prev) => {
          const nextIndex = prev + 1;
          if (!loop && nextIndex >= words.length) {
            clearInterval(intervalId);
            clearTimeout(timeoutId);
            return prev;
          }
          return loop ? nextIndex % words.length : nextIndex;
        });
        setShow(true);
        setHasAnimated(true);
      }, pauseDuration);
    }, duration + pauseDuration);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [shouldStart, duration, pauseDuration, words.length, loop, once, hasAnimated]);

  return (
    <motion.span
      className={cn("inline-block overflow-hidden align-bottom leading-none", containerClassName)}
      data-slot="word-rotate"
      ref={ref}
      {...props}
    >
      <motion.span
        animate={show ? "animate" : "exit"}
        className={cn("inline-block", className)}
        exit="exit"
        initial="initial"
        key={currentWord}
        style={{
          perspective: animationStyle === "flip" ? 1000 : undefined
        }}
        transition={{ duration: 0.5 }}
        variants={variants[animationStyle]}
      >
        {words[currentWord]}
      </motion.span>
    </motion.span>
  );
}
