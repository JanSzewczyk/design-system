import * as React from "react";

import { useIsomorphicLayoutEffect } from "~/hooks";

import { MasonryItem, type MasonryItemElement, type MasonryItemProps } from "./masonry-item";
import { VIEWPORT_NAME } from "./masonry.constants";
import { useMasonryContext } from "./masonry.context";

export type MasonryItemPropsWithRef = MasonryItemProps & {
  ref: React.Ref<MasonryItemElement | null>;
};

export type MasonryViewportProps = React.ComponentProps<"div">;

export function MasonryViewport({ children, style, ref, ...props }: MasonryViewportProps) {
  const context = useMasonryContext(VIEWPORT_NAME);
  const [layoutVersion, setLayoutVersion] = React.useState(0);
  const rafId = React.useRef<number | null>(null);
  const [mounted, setMounted] = React.useState(false);

  useIsomorphicLayoutEffect(() => {
    setMounted(true);
  }, []);

  let startIndex = 0;
  let stopIndex: number | undefined;

  const validChildren = React.Children.toArray(children).filter(
    (child): child is React.ReactElement<MasonryItemPropsWithRef> =>
      React.isValidElement(child) && (child.type === MasonryItem || child.type === MasonryItem)
  );
  const itemCount = validChildren.length;

  const shortestColumnSize = context.positioner.shortestColumn();
  const measuredCount = context.positioner.size();
  const overscanPixels = context.windowHeight * context.overscan;
  const rangeStart = Math.max(0, context.scrollTop - overscanPixels / 2);
  const rangeEnd = context.scrollTop + overscanPixels;
  const layoutOutdated = shortestColumnSize < rangeEnd && measuredCount < itemCount;

  const positionedChildren: React.ReactElement[] = [];

  const visibleItemStyle = React.useMemo(
    (): React.CSSProperties => ({
      position: "absolute",
      writingMode: "horizontal-tb",
      visibility: "visible",
      width: context.columnWidth,
      transform: context.isScrolling ? "translateZ(0)" : undefined,
      willChange: context.isScrolling ? "transform" : undefined
    }),
    [context.columnWidth, context.isScrolling]
  );

  const hiddenItemStyle = React.useMemo(
    (): React.CSSProperties => ({
      position: "absolute",
      writingMode: "horizontal-tb",
      visibility: "hidden",
      width: context.columnWidth,
      zIndex: -1000
    }),
    [context.columnWidth]
  );

  context.positioner.range(rangeStart, rangeEnd, (index, left, top) => {
    const child = validChildren[index];
    if (!child) return;

    const itemStyle = {
      ...visibleItemStyle,
      top,
      left,
      ...child.props.style
    };

    positionedChildren.push(
      React.cloneElement(child, {
        key: child.key ?? index,
        ref: context.onItemRegister(index),
        style: itemStyle
      })
    );

    if (stopIndex === undefined) {
      startIndex = index;
      stopIndex = index;
    } else {
      startIndex = Math.min(startIndex, index);
      stopIndex = Math.max(stopIndex, index);
    }
  });

  if (layoutOutdated && mounted) {
    const batchSize = Math.min(
      itemCount - measuredCount,
      Math.ceil(
        ((context.scrollTop + overscanPixels - shortestColumnSize) / context.itemHeight) *
          context.positioner.columnCount
      )
    );

    for (let index = measuredCount; index < measuredCount + batchSize; index++) {
      const child = validChildren[index];
      if (!child) continue;

      const itemStyle = {
        ...hiddenItemStyle,
        ...child.props.style
      };

      positionedChildren.push(
        React.cloneElement(child, {
          key: child.key ?? index,
          ref: context.onItemRegister(index),
          style: itemStyle
        })
      );
    }
  }

  React.useEffect(() => {
    if (layoutOutdated && mounted) {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
      rafId.current = requestAnimationFrame(() => {
        setLayoutVersion((v) => v + 1);
      });
    }
    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [layoutOutdated, mounted]);

  const estimatedHeight = React.useMemo(() => {
    const measuredHeight = context.positioner.estimateHeight(measuredCount, context.itemHeight);
    if (measuredCount === itemCount) {
      return measuredHeight;
    }
    const remainingItems = itemCount - measuredCount;
    const estimatedRemainingHeight = Math.ceil((remainingItems / context.positioner.columnCount) * context.itemHeight);
    return measuredHeight + estimatedRemainingHeight;
  }, [context.positioner, context.itemHeight, measuredCount, itemCount]);

  const containerStyle = React.useMemo(
    () => ({
      position: "relative" as const,
      width: "100%",
      maxWidth: "100%",
      height: Math.ceil(estimatedHeight),
      maxHeight: Math.ceil(estimatedHeight),
      willChange: context.isScrolling ? "contents" : undefined,
      pointerEvents: context.isScrolling ? ("none" as const) : undefined,
      ...style
    }),
    [context.isScrolling, estimatedHeight, style]
  );

  if (!mounted && context.fallback) {
    return context.fallback;
  }

  return (
    <div ref={ref} style={containerStyle} data-version={mounted ? layoutVersion : undefined} {...props}>
      {positionedChildren}
    </div>
  );
}
