import * as React from "react";

import { motion, type MotionProps, useInView, type UseInViewOptions, type Variants } from "motion/react";
import { type TypingTextAnimationVariant } from "~/components";
import { cn } from "~/utils";

const cursorVariants: Variants = {
  blinking: {
    opacity: [0, 0, 1, 1],
    transition: {
      duration: 1,
      repeat: Infinity,
      repeatDelay: 0,
      ease: "linear",
      times: [0, 0.5, 0.5, 1]
    }
  }
};

const animationVariants: Record<TypingTextAnimationVariant, Variants> = {
  fadeIn: {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 },
    exit: { opacity: 0 }
  },
  blurIn: {
    hidden: { opacity: 0, filter: "blur(4px)" },
    show: { opacity: 1, filter: "blur(0px)" },
    exit: { opacity: 0, filter: "blur(4px)" }
  },
  blurInUp: {
    hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)" },
    exit: { opacity: 0, y: -20, filter: "blur(4px)" }
  },
  blurInDown: {
    hidden: { opacity: 0, y: -20, filter: "blur(4px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)" },
    exit: { opacity: 0, y: 20, filter: "blur(4px)" }
  },
  slideUp: {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  },
  slideDown: {
    hidden: { opacity: 0, y: -20 },
    show: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 }
  },
  slideLeft: {
    hidden: { opacity: 0, x: 20 },
    show: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  },
  slideRight: {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 }
  },
  scaleUp: {
    hidden: { opacity: 0, scale: 0.8 },
    show: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.2 }
  },
  scaleDown: {
    hidden: { opacity: 0, scale: 1.2 },
    show: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 }
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
  const isInView = useInView(ref, { once, margin: inViewMargin as UseInViewOptions["margin"] });
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
      ref={ref}
      variants={selectedVariants}
      initial="hidden"
      whileInView={startOnView ? "show" : undefined}
      animate={startOnView ? undefined : "show"}
      exit="exit"
      className={cn("whitespace-pre-wrap", className)}
      viewport={{ once }}
      data-slot="typing-text"
      {...props}
    >
      <span style={{ display: "inline-flex", alignItems: "center" }}>
        {displayText}
        {showCursor && (
          <motion.span
            variants={cursorVariants}
            animate="blinking"
            className={cn("text-foreground ms-1 inline-block w-px font-normal select-none", cursorClassName)}
          >
            {cursor}
          </motion.span>
        )}
      </span>
    </MotionComponent>
  );
}
