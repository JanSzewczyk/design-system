import * as React from "react";

import { motion, type MotionProps, useInView, type UseInViewOptions, type Variants } from "motion/react";
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
  const isInView = useInView(ref, { once, margin: inViewMargin as UseInViewOptions["margin"] });
  const [hasAnimated, setHasAnimated] = React.useState(false);
  const [currentWord, setCurrentWord] = React.useState(0);
  const [show, setShow] = React.useState(true);

  // Animation variants
  const variants: Record<string, Variants> = {
    fade: {
      initial: { opacity: 0 },
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
      }
    },
    "slide-up": {
      initial: { opacity: 0, y: 24 },
      animate: {
        opacity: 1,
        y: 0,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 25,
          mass: 0.8
        }
      },
      exit: {
        opacity: 0,
        y: -24,
        transition: {
          duration: 0.25,
          ease: [0.4, 0.0, 1, 1]
        }
      }
    },
    "slide-down": {
      initial: { opacity: 0, y: -24 },
      animate: {
        opacity: 1,
        y: 0,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 25,
          mass: 0.8
        }
      },
      exit: {
        opacity: 0,
        y: 24,
        transition: {
          duration: 0.25,
          ease: [0.4, 0.0, 1, 1]
        }
      }
    },
    scale: {
      initial: { opacity: 0, scale: 0.8 },
      animate: {
        opacity: 1,
        scale: 1,
        transition: {
          type: "spring",
          stiffness: 400,
          damping: 30,
          mass: 0.6
        }
      },
      exit: {
        opacity: 0,
        scale: 0.9,
        transition: {
          duration: 0.2,
          ease: [0.4, 0.0, 1, 1]
        }
      }
    },
    flip: {
      initial: { opacity: 0, rotateX: 90 },
      animate: {
        opacity: 1,
        rotateX: 0,
        transition: {
          type: "spring",
          stiffness: 200,
          damping: 20,
          mass: 1
        }
      },
      exit: {
        opacity: 0,
        rotateX: -90,
        transition: {
          duration: 0.3,
          ease: [0.4, 0.0, 1, 1]
        }
      }
    }
  };

  // Determine if we should start animation
  const shouldStart = !startOnView || (isInView && (!once || !hasAnimated));

  React.useEffect(() => {
    if (!shouldStart) return;
    setHasAnimated(true);
    const interval = setInterval(() => {
      setShow(false);
      setTimeout(() => {
        setCurrentWord((prev) => {
          if (loop) {
            return (prev + 1) % words.length;
          } else {
            return prev < words.length - 1 ? prev + 1 : prev;
          }
        });
        setShow(true);
      }, pauseDuration);
    }, duration + pauseDuration);
    return () => clearInterval(interval);
  }, [shouldStart, duration, pauseDuration, words.length, loop]);

  return (
    <motion.span
      ref={ref}
      data-slot="word-rotate"
      className={cn("inline-block overflow-hidden", containerClassName)}
      {...props}
    >
      <motion.span
        key={currentWord}
        initial="initial"
        animate={show ? "animate" : "exit"}
        exit="exit"
        variants={variants[animationStyle]}
        transition={{ duration: 0.5 }}
        style={{
          perspective: animationStyle === "flip" ? 1000 : undefined
        }}
        className={cn("inline-block overflow-hidden", className)}
      >
        {words[currentWord]}
      </motion.span>
    </motion.span>
  );
}
