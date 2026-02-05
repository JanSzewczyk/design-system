export const COLUMN_WIDTH = 200;
export const GAP = 0;
export const ITEM_HEIGHT = 300;
export const OVERSCAN = 2;
export const SCROLL_FPS = 12;
export const DEBOUNCE_DELAY = 300;

export const ROOT_NAME = "MasonryRoot";
export const VIEWPORT_NAME = "MasonryViewport";
export const ITEM_NAME = "MasonryItem";

export const MASONRY_ERROR = {
  [ROOT_NAME]: `\`${ROOT_NAME}\` components must be within \`${ROOT_NAME}\``,
  [VIEWPORT_NAME]: `\`${VIEWPORT_NAME}\` components must be within \`${ROOT_NAME}\``,
  [ITEM_NAME]: `\`${ITEM_NAME}\` must be within \`${VIEWPORT_NAME}\``
} as const;

export const NODE_COLOR = {
  RED: 0,
  BLACK: 1,
  SENTINEL: 2
} as const;

export const NODE_OPERATION = {
  REMOVE: 0,
  PRESERVE: 1
} as const;
