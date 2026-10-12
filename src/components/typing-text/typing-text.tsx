import { type MotionProps, motion, type UseInViewOptions, useInView, type Variants } from "motion/react";
import * as React from "react";
import { cn } from "~/utils";

import { type TypingTextAnimationVariant } from "./typing-text.types";

const cursorVariants: Variants = {
  blinking: {
    opacity: [0, 0, 1, 1],
    transition: {
      duration: 1,
      ease: "linear",
      repeat: Infinity,
      repeatDelay: 0,
      times: [0, 0.5, 0.5, 1]
    }
  }
};

const animationVariants: Record<TypingTextAnimationVariant, Variants> = {
  blurIn: {
    exit: { filter: "blur(4px)", opacity: 0 },
    hidden: { filter: "blur(4px)", opacity: 0 },
    show: { filter: "blur(0px)", opacity: 1 }
  },
  blurInDown: {
    exit: { filter: "blur(4px)", opacity: 0, y: 20 },
    hidden: { filter: "blur(4px)", opacity: 0, y: -20 },
    show: { filter: "blur(0px)", opacity: 1, y: 0 }
  },
  blurInUp: {
    exit: { filter: "blur(4px)", opacity: 0, y: -20 },
    hidden: { filter: "blur(4px)", opacity: 0, y: 20 },
    show: { filter: "blur(0px)", opacity: 1, y: 0 }
  },
  fadeIn: {
    exit: { opacity: 0 },
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  },
  scaleDown: {
    exit: { opacity: 0, scale: 0.8 },
    hidden: { opacity: 0, scale: 1.2 },
    show: { opacity: 1, scale: 1 }
  },
  scaleUp: {
    exit: { opacity: 0, scale: 1.2 },
    hidden: { opacity: 0, scale: 0.8 },
    show: { opacity: 1, scale: 1 }
  },
  slideDown: {
    exit: { opacity: 0, y: 20 },
    hidden: { opacity: 0, y: -20 },
    show: { opacity: 1, y: 0 }
  },
  slideLeft: {
    exit: { opacity: 0, x: -20 },
    hidden: { opacity: 0, x: 20 },
    show: { opacity: 1, x: 0 }
  },
  slideRight: {
    exit: { opacity: 0, x: 20 },
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
  },
  slideUp: {
    exit: { opacity: 0, y: -20 },
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }
};

export type TypingTextProps = Omit<MotionProps, "children"> & {
  /** Text to animate */
  text?: string;
  /** Array of texts to cycle through */
  texts?: string[];
  /** Typing speed in milliseconds */
  speed?: number;
  /** Delay before starting animation */
  delay?: number;
  /** Whether to show cursor */
  showCursor?: boolean;
  /** Cursor character */
  cursor?: string;
  /** Cursor className */
  cursorClassName?: string;
  /** Whether to loop through texts */
  loop?: boolean;
  /** Pause duration between loops */
  pauseDuration?: number;
  /** Custom className */
  className?: string;
  /** Callback when typing completes */
  onComplete?: () => void;
  /** Whether to start animation when component enters viewport */
  startOnView?: boolean;
  /** Whether to animate only once */
  once?: boolean;
  /** The animation preset to use */
  animation?: TypingTextAnimationVariant;
  /** Margin for in-view detection (rootMargin) */
  inViewMargin?: UseInViewOptions["margin"];
};

export function TypingText({
  text,
  texts,
  speed = 100,
  delay = 0,
  showCursor = true,
  cursorClassName = "",
  cursor = "|",
  loop = false,
  pauseDuration = 2000,
  className,
  onComplete,
  startOnView = true,
  once = false,
  animation = "fadeIn",
  inViewMargin,
  ...props
}: TypingTextProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { margin: inViewMargin as UseInViewOptions["margin"], once });
  const [hasAnimated, setHasAnimated] = React.useState(false);
  const [displayText, setDisplayText] = React.useState("");
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isTyping, setIsTyping] = React.useState(false);
  const [currentTextIndex, setCurrentTextIndex] = React.useState(0);

  // Determine if we should start animation
  const shouldStart = !startOnView || (isInView && (!once || !hasAnimated));

  const textArray = texts && texts.length > 0 ? texts : [text];
  const currentText = textArray[currentTextIndex] ?? "";

  React.useEffect(() => {
    if (!shouldStart) return;
    const timeout = setTimeout(() => {
      setIsTyping(true);
      setHasAnimated(true);
    }, delay);

    return () => clearTimeout(timeout);
  }, [delay, shouldStart]);

  React.useEffect(() => {
    if (!isTyping) return;

    if (currentIndex < currentText.length) {
      const timeout = setTimeout(() => {
        setDisplayText(currentText.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else {
      // Typing complete
      onComplete?.();

      if (loop && texts && texts.length > 1) {
        const timeout = setTimeout(() => {
          setDisplayText("");
          setCurrentIndex(0);
          setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        }, pauseDuration);

        return () => clearTimeout(timeout);
      }
    }
  }, [currentIndex, currentText, isTyping, speed, loop, texts, pauseDuration, onComplete]);

  // Use the selected animation variant
  const selectedVariants = animationVariants[animation];
  const MotionComponent = motion.span;

  return (
    <MotionComponent
      animate={startOnView ? undefined : "show"}
      className={cn("whitespace-pre-wrap", className)}
      data-slot="typing-text"
      exit="exit"
      initial="hidden"
      ref={ref}
      variants={selectedVariants}
      viewport={{ once }}
      whileInView={startOnView ? "show" : undefined}
      {...props}
    >
      <span style={{ alignItems: "center", display: "inline-flex" }}>
        {displayText}
        {showCursor && (
          <motion.span
            animate="blinking"
            className={cn("ms-1 inline-block w-px select-none font-normal text-foreground", cursorClassName)}
            variants={cursorVariants}
          >
            {cursor}
          </motion.span>
        )}
      </span>
    </MotionComponent>
  );
}
