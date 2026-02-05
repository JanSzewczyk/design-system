import React from "react";

import { DEBOUNCE_DELAY, SCROLL_FPS } from "./masonry.constants";
import { type ItemElement, type MasonryPositioner, type MasonryPositionerItem } from "./masonry.types";
import { createIntervalTree, onDeepMemo, onRafSchedule, type OnRafScheduleReturn } from "./masonry.utils";

export type UseMasonryPositionerOptions = {
  width: number;
  columnWidth?: number;
  columnGap?: number;
  rowGap?: number;
  columnCount?: number;
  maxColumnCount?: number;
  linear?: boolean;
};

export function useMasonryPositioner(
  {
    width,
    columnWidth,
    columnGap = 0,
    rowGap,
    columnCount,
    maxColumnCount,
    linear = false
  }: UseMasonryPositionerOptions,
  deps: React.DependencyList = []
): MasonryPositioner {
  const initPositioner = React.useCallback((): MasonryPositioner => {
    function binarySearch(a: number[], y: number): number {
      let l = 0;
      let h = a.length - 1;

      while (l <= h) {
        const m = (l + h) >>> 1;
        const x = a[m];
        if (x === y) return m;
        if (x === undefined || x <= y) l = m + 1;
        else h = m - 1;
      }

      return -1;
    }

    const computedColumnCount =
      columnCount ||
      Math.min(
        Math.floor((width + columnGap) / ((columnWidth ?? 0) + columnGap)),
        maxColumnCount || Number.POSITIVE_INFINITY
      ) ||
      1;
    const computedColumnWidth = Math.floor((width - columnGap * (computedColumnCount - 1)) / computedColumnCount);

    const intervalTree = createIntervalTree();
    const columnHeights: number[] = new Array(computedColumnCount).fill(0);
    const items: (MasonryPositionerItem | undefined)[] = [];
    const columnItems: number[][] = new Array(computedColumnCount).fill(0).map(() => []);

    for (let i = 0; i < computedColumnCount; i++) {
      columnHeights[i] = 0;
      columnItems[i] = [];
    }

    return {
      columnCount: computedColumnCount,
      columnWidth: computedColumnWidth,
      set: (index: number, height = 0) => {
        let columnIndex = 0;

        if (linear) {
          const preferredColumn = index % computedColumnCount;

          let shortestHeight = columnHeights[0] ?? 0;
          let tallestHeight = shortestHeight;
          let shortestIndex = 0;

          for (let i = 0; i < columnHeights.length; i++) {
            const currentHeight = columnHeights[i] ?? 0;
            if (currentHeight < shortestHeight) {
              shortestHeight = currentHeight;
              shortestIndex = i;
            }
            if (currentHeight > tallestHeight) {
              tallestHeight = currentHeight;
            }
          }

          const preferredHeight = (columnHeights[preferredColumn] ?? 0) + height;

          const maxAllowedHeight = shortestHeight + height * 2.5;
          columnIndex = preferredHeight <= maxAllowedHeight ? preferredColumn : shortestIndex;
        } else {
          for (let i = 1; i < columnHeights.length; i++) {
            const currentHeight = columnHeights[i];
            const shortestHeight = columnHeights[columnIndex];
            if (currentHeight !== undefined && shortestHeight !== undefined && currentHeight < shortestHeight) {
              columnIndex = i;
            }
          }
        }

        const columnHeight = columnHeights[columnIndex];
        if (columnHeight === undefined) return;

        const top = columnHeight;
        columnHeights[columnIndex] = top + height + (rowGap ?? columnGap);

        const columnItemsList = columnItems[columnIndex];
        if (!columnItemsList) return;
        columnItemsList.push(index);

        items[index] = {
          left: columnIndex * (computedColumnWidth + columnGap),
          top,
          height,
          columnIndex
        };
        intervalTree.insert(top, top + height, index);
      },
      get: (index: number) => items[index],
      update: (updates: number[]) => {
        const columns: (number | undefined)[] = new Array(computedColumnCount);
        let i = 0;
        let j = 0;

        for (; i < updates.length - 1; i++) {
          const currentIndex = updates[i];
          if (typeof currentIndex !== "number") continue;

          const item = items[currentIndex];
          if (!item) continue;

          const nextHeight = updates[++i];
          if (typeof nextHeight !== "number") continue;

          item.height = nextHeight;
          intervalTree.remove(currentIndex);
          intervalTree.insert(item.top, item.top + item.height, currentIndex);
          columns[item.columnIndex] =
            columns[item.columnIndex] === void 0
              ? currentIndex
              : Math.min(currentIndex, columns[item.columnIndex] ?? currentIndex);
        }

        for (i = 0; i < columns.length; i++) {
          const currentColumn = columns[i];
          if (currentColumn === void 0) continue;

          const itemsInColumn = columnItems[i];
          if (!itemsInColumn) continue;

          const startIndex = binarySearch(itemsInColumn, currentColumn);
          if (startIndex === -1) continue;

          const currentItemIndex = itemsInColumn[startIndex];
          if (typeof currentItemIndex !== "number") continue;

          const startItem = items[currentItemIndex];
          if (!startItem) continue;

          const currentHeight = columnHeights[i];
          if (typeof currentHeight !== "number") continue;

          columnHeights[i] = startItem.top + startItem.height + (rowGap ?? columnGap);

          for (j = startIndex + 1; j < itemsInColumn.length; j++) {
            const currentIndex = itemsInColumn[j];
            if (typeof currentIndex !== "number") continue;

            const item = items[currentIndex];
            if (!item) continue;

            const columnHeight = columnHeights[i];
            if (typeof columnHeight !== "number") continue;

            item.top = columnHeight;
            columnHeights[i] = item.top + item.height + (rowGap ?? columnGap);
            intervalTree.remove(currentIndex);
            intervalTree.insert(item.top, item.top + item.height, currentIndex);
          }
        }
      },
      range: (low, high, onItemRender) =>
        intervalTree.search(low, high, (index: number, top: number) => {
          const item = items[index];
          if (!item) return;
          onItemRender(index, item.left, top);
        }),
      estimateHeight: (itemCount, defaultItemHeight): number => {
        const tallestColumn = Math.max(0, Math.max.apply(null, columnHeights));

        return itemCount === intervalTree.size
          ? tallestColumn
          : tallestColumn + Math.ceil((itemCount - intervalTree.size) / computedColumnCount) * defaultItemHeight;
      },
      shortestColumn: () => {
        if (columnHeights.length > 1) return Math.min.apply(null, columnHeights);
        return columnHeights[0] ?? 0;
      },
      size(): number {
        return intervalTree.size;
      },
      all(): MasonryPositionerItem[] {
        return items.filter(Boolean) as MasonryPositionerItem[];
      }
    };
  }, [width, columnWidth, columnGap, rowGap, columnCount, maxColumnCount, linear]);

  const positionerRef = React.useRef<MasonryPositioner | null>(null);
  if (positionerRef.current === null) positionerRef.current = initPositioner();

  const prevDepsRef = React.useRef(deps);
  const opts = [width, columnWidth, columnGap, rowGap, columnCount, maxColumnCount, linear];
  const prevOptsRef = React.useRef(opts);
  const optsChanged = !opts.every((item, i) => prevOptsRef.current[i] === item);

  if (optsChanged || !deps.every((item, i) => prevDepsRef.current[i] === item)) {
    const prevPositioner = positionerRef.current;
    const positioner = initPositioner();
    prevDepsRef.current = deps;
    prevOptsRef.current = opts;

    if (optsChanged) {
      const cacheSize = prevPositioner.size();
      for (let index = 0; index < cacheSize; index++) {
        const pos = prevPositioner.get(index);
        positioner.set(index, pos !== void 0 ? pos.height : 0);
      }
    }

    positionerRef.current = positioner;
  }

  return positionerRef.current;
}

export type DebouncedWindowSizeOptions = {
  containerRef: React.RefObject<React.ComponentRef<"div"> | null>;
  defaultWidth?: number;
  defaultHeight?: number;
  delayMs?: number;
};

export function useDebouncedWindowSize(options: DebouncedWindowSizeOptions) {
  const { containerRef, defaultWidth = 0, defaultHeight = 0, delayMs = DEBOUNCE_DELAY } = options;

  const getDocumentSize = React.useCallback(() => {
    if (typeof document === "undefined") {
      return { width: defaultWidth, height: defaultHeight };
    }
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    };
  }, [defaultWidth, defaultHeight]);

  const [size, setSize] = React.useState(getDocumentSize());
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const setDebouncedSize = React.useCallback(
    (value: { width: number; height: number }) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setSize(value);
      }, delayMs);
    },
    [delayMs]
  );

  React.useEffect(() => {
    function onResize() {
      if (containerRef.current) {
        setDebouncedSize({
          width: containerRef.current.offsetWidth,
          height: document.documentElement.clientHeight
        });
      } else {
        setDebouncedSize(getDocumentSize());
      }
    }

    window?.addEventListener("resize", onResize, { passive: true });
    window?.addEventListener("orientationchange", onResize);
    window.visualViewport?.addEventListener("resize", onResize);

    return () => {
      window?.removeEventListener("resize", onResize);
      window?.removeEventListener("orientationchange", onResize);
      window.visualViewport?.removeEventListener("resize", onResize);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [setDebouncedSize, containerRef, getDocumentSize]);

  return size;
}

export function useResizeObserver(positioner: MasonryPositioner) {
  const [, setLayoutVersion] = React.useState(0);

  const createResizeObserver = React.useMemo(() => {
    if (typeof window === "undefined") {
      return () => ({
        disconnect: () => {},
        observe: () => {},
        unobserve: () => {}
      });
    }

    return onDeepMemo([WeakMap], (positioner: MasonryPositioner, onUpdate: () => void) => {
      const updates: number[] = [];
      const itemMap = new WeakMap<Element, number>();

      const update = onRafSchedule(() => {
        if (updates.length > 0) {
          positioner.update(updates);
          onUpdate();
        }
        updates.length = 0;
      });

      function onItemResize(target: ItemElement) {
        const height = target.offsetHeight;
        if (height > 0) {
          const index = itemMap.get(target);
          if (index !== void 0) {
            const position = positioner.get(index);
            if (position !== void 0 && height !== position.height) {
              updates.push(index, height);
            }
          }
        }
        update();
      }

      const scheduledItemMap = new Map<number, OnRafScheduleReturn<[ItemElement]>>();
      function onResizeObserver(entries: ResizeObserverEntry[]) {
        for (const entry of entries) {
          if (!entry) continue;
          const index = itemMap.get(entry.target);

          if (index === void 0) continue;
          let handler = scheduledItemMap.get(index);
          if (!handler) {
            handler = onRafSchedule(onItemResize);
            scheduledItemMap.set(index, handler);
          }
          handler(entry.target as ItemElement);
        }
      }

      const observer = new ResizeObserver(onResizeObserver);
      const disconnect = observer.disconnect.bind(observer);
      observer.disconnect = () => {
        disconnect();
        for (const [, scheduleItem] of scheduledItemMap) {
          scheduleItem.cancel();
        }
      };

      return observer;
    });
  }, []);

  const resizeObserver = createResizeObserver(positioner, () => setLayoutVersion((prev) => prev + 1));

  React.useEffect(() => () => resizeObserver.disconnect(), [resizeObserver]);

  return resizeObserver;
}

export function useScroller({
  offset = 0,
  fps = SCROLL_FPS
}: {
  offset?: number;
  fps?: number;
} = {}): { scrollTop: number; isScrolling: boolean } {
  const [scrollY, setScrollY] = useThrottle(
    typeof globalThis.window === "undefined"
      ? 0
      : (globalThis.window.scrollY ?? document.documentElement.scrollTop ?? 0),
    { fps, leading: true }
  );

  const onScroll = React.useCallback(() => {
    setScrollY(globalThis.window.scrollY ?? document.documentElement.scrollTop ?? 0);
  }, [setScrollY]);

  React.useEffect(() => {
    if (typeof globalThis.window === "undefined") return;
    globalThis.window.addEventListener("scroll", onScroll, { passive: true });

    return () => globalThis.window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  const [isScrolling, setIsScrolling] = React.useState(false);
  const hasMountedRef = React.useRef(0);

  React.useEffect(() => {
    if (hasMountedRef.current === 1) setIsScrolling(true);
    let didUnsubscribe = false;

    function requestTimeout(fn: () => void, delay: number) {
      const start = performance.now();
      const handle = {
        id: requestAnimationFrame(function tick(timestamp) {
          if (timestamp - start >= delay) {
            fn();
          } else {
            handle.id = requestAnimationFrame(tick);
          }
        })
      };
      return handle;
    }

    const timeout = requestTimeout(
      () => {
        if (didUnsubscribe) return;
        setIsScrolling(false);
      },
      40 + 1000 / fps
    );
    hasMountedRef.current = 1;
    return () => {
      didUnsubscribe = true;
      cancelAnimationFrame(timeout.id);
    };
  }, [fps]);

  return { scrollTop: Math.max(0, scrollY - offset), isScrolling };
}

export function useThrottle<State>(
  initialState: State | (() => State),
  options: {
    fps?: number;
    leading?: boolean;
  } = {}
): [State, React.Dispatch<React.SetStateAction<State>>] {
  const { fps = 30, leading = false } = options;
  const [state, setState] = React.useState(initialState);
  const latestSetState = React.useRef(setState);
  latestSetState.current = setState;

  const ms = 1000 / fps;
  const prevCountRef = React.useRef(0);
  const trailingTimeout = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTrailing = React.useCallback(() => {
    if (trailingTimeout.current) {
      clearTimeout(trailingTimeout.current);
    }
  }, []);

  React.useEffect(() => {
    return () => {
      prevCountRef.current = 0;
      clearTrailing();
    };
  }, [clearTrailing]);

  const throttledSetState = React.useCallback(
    (action: React.SetStateAction<State>) => {
      const perf = typeof performance !== "undefined" ? performance : Date;
      const now = () => perf.now();
      const rightNow = now();
      const call = () => {
        prevCountRef.current = rightNow;
        clearTrailing();
        latestSetState.current(action);
      };
      const current = prevCountRef.current;

      if (leading && current === 0) {
        return call();
      }

      if (rightNow - current > ms) {
        if (current > 0) {
          return call();
        }
        prevCountRef.current = rightNow;
      }

      clearTrailing();
      trailingTimeout.current = setTimeout(() => {
        call();
        prevCountRef.current = 0;
      }, ms);
    },
    [leading, ms, clearTrailing]
  );

  return [state, throttledSetState];
}
