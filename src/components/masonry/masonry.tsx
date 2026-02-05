import * as React from "react";

import { Slot } from "@radix-ui/react-slot";
import { type MasonryItemElement } from "~/components/masonry/masonry-item";
import { useComposedRefs, useIsomorphicLayoutEffect } from "~/hooks";

import { MasonryViewport } from "./masonry-viewport";
import { COLUMN_WIDTH, GAP, ITEM_HEIGHT, OVERSCAN, SCROLL_FPS } from "./masonry.constants";
import { MasonryContext, type MasonryContextValue } from "./masonry.context";
import { useDebouncedWindowSize, useMasonryPositioner, useResizeObserver, useScroller } from "./masonry.hooks";

/**
 * Props for the Masonry component
 */
export type MasonryProps = React.ComponentProps<"div"> & {
  /**
   * The width of each column in pixels.
   * @default 200
   */
  columnWidth?: number;
  /**
   * Fixed number of columns. Takes precedence over `columnWidth` if provided.
   */
  columnCount?: number;
  /**
   * Maximum number of columns allowed. Useful for responsive layouts.
   */
  maxColumnCount?: number;
  /**
   * Gap between items. Can be a single number for uniform spacing or an object
   * with separate `column` and `row` gaps.
   * @default 16
   * @example
   * gap={20}
   * gap={{ column: 16, row: 24 }}
   */
  gap?: number | { column: number; row: number };
  /**
   * Default height for items before they are measured. Used for initial layout calculations.
   * @default 300
   */
  itemHeight?: number;
  /**
   * Default container width used during SSR or before first measurement.
   */
  defaultWidth?: number;
  /**
   * Default container height used during SSR or before first measurement.
   */
  defaultHeight?: number;
  /**
   * Number of pixels to render outside the visible viewport for smoother scrolling.
   * @default 200
   */
  overscan?: number;
  /**
   * Scroll event sampling rate in frames per second. Higher values provide smoother
   * updates but may impact performance.
   * @default 12
   */
  scrollFps?: number;
  /**
   * Content to display while items are being measured or loaded.
   */
  fallback?: React.ReactNode;
  /**
   * When `true`, items are positioned linearly (left-to-right, top-to-bottom)
   * instead of using the default masonry algorithm that fills shortest columns first.
   * @default false
   */
  linear?: boolean;
  /**
   * When `true`, renders the component as its child element using Radix UI's Slot.
   * @default false
   */
  asChild?: boolean;
};

export type MasonryElement = React.ComponentRef<"div">;

/**
 * A performant masonry layout component that efficiently arranges items of varying heights
 * into columns. Features virtualization, resize observation, and smooth scrolling performance.
 *
 * @component
 * @example
 * // Basic usage
 * <Masonry>
 *   {items.map((item, index) => (
 *     <Masonry.Item key={index}>
 *       <img src={item.url} alt={item.title} />
 *     </Masonry.Item>
 *   ))}
 * </Masonry>
 *
 * @example
 * // Custom column width and gap
 * <Masonry columnWidth={250} gap={{ column: 20, row: 30 }}>
 *   {items.map((item, index) => (
 *     <Masonry.Item key={index}>
 *       <Card>{item.content}</Card>
 *     </Masonry.Item>
 *   ))}
 * </Masonry>
 *
 * @example
 * // Fixed number of columns with linear positioning
 * <Masonry columnCount={3} linear>
 *   {items.map((item, index) => (
 *     <Masonry.Item key={index}>
 *       {item.content}
 *     </Masonry.Item>
 *   ))}
 * </Masonry>
 *
 * @example
 * // With fallback content
 * <Masonry fallback={<Spinner />}>
 *   {items.map((item, index) => (
 *     <Masonry.Item key={index}>
 *       <LazyImage src={item.url} />
 *     </Masonry.Item>
 *   ))}
 * </Masonry>
 */
export function Masonry(props: MasonryProps) {
  const {
    columnWidth = COLUMN_WIDTH,
    columnCount,
    maxColumnCount,
    gap = GAP,
    itemHeight = ITEM_HEIGHT,
    defaultWidth,
    defaultHeight,
    overscan = OVERSCAN,
    scrollFps = SCROLL_FPS,
    fallback,
    linear = false,
    asChild,
    children,
    style,
    ref,
    ...rootProps
  } = props;

  const gapValue = typeof gap === "object" ? gap : { column: gap, row: gap };
  const columnGap = gapValue.column;
  const rowGap = gapValue.row;

  const containerRef = React.useRef<MasonryElement | null>(null);
  const composedRef = useComposedRefs(ref, containerRef);

  const size = useDebouncedWindowSize({
    containerRef,
    defaultWidth,
    defaultHeight
  });

  const [containerPosition, setContainerPosition] = React.useState<{
    offset: number;
    width: number;
  }>({ offset: 0, width: 0 });

  useIsomorphicLayoutEffect(() => {
    if (!containerRef.current) return;

    let offset = 0;
    let container = containerRef.current;

    do {
      offset += container.offsetTop ?? 0;
      container = container.offsetParent as MasonryElement;
    } while (container);

    if (offset !== containerPosition.offset || containerRef.current.offsetWidth !== containerPosition.width) {
      setContainerPosition({
        offset,
        width: containerRef.current.offsetWidth
      });
    }
  }, [containerPosition, size]);

  const positioner = useMasonryPositioner({
    width: containerPosition.width ?? size.width,
    columnWidth,
    columnGap,
    rowGap,
    columnCount,
    maxColumnCount,
    linear
  });
  const resizeObserver = useResizeObserver(positioner);
  const { scrollTop, isScrolling } = useScroller({
    offset: containerPosition.offset,
    fps: scrollFps
  });

  const itemMap = React.useRef(new WeakMap<MasonryItemElement, number>()).current;

  const onItemRegister = React.useCallback(
    (index: number) => (node: MasonryItemElement | null) => {
      if (!node) return;

      itemMap.set(node, index);
      if (resizeObserver) {
        resizeObserver.observe(node);
      }
      if (positioner.get(index) === void 0) {
        positioner.set(index, node.offsetHeight);
      }
    },
    [itemMap, positioner, resizeObserver]
  );

  const contextValue = React.useMemo<MasonryContextValue>(
    () => ({
      positioner,
      resizeObserver,
      columnWidth: positioner.columnWidth,
      onItemRegister,
      scrollTop,
      windowHeight: size.height,
      itemHeight,
      overscan,
      fallback,
      isScrolling
    }),
    [positioner, resizeObserver, onItemRegister, scrollTop, size.height, itemHeight, overscan, fallback, isScrolling]
  );

  const RootPrimitive = asChild ? Slot : "div";

  return (
    <MasonryContext.Provider value={contextValue}>
      <RootPrimitive
        {...rootProps}
        data-slot="masonry"
        ref={composedRef}
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          ...style
        }}
      >
        <MasonryViewport>{children}</MasonryViewport>
      </RootPrimitive>
    </MasonryContext.Provider>
  );
}
