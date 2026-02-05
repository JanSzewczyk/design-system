export type NodeColor = 0 | 1 | 2;
export type NodeOperation = 0 | 1;

export type ItemElement = HTMLDivElement;

export type MasonryListNode = {
  index: number;
  high: number;
  next: MasonryListNode | null;
};

export type MasonryTreeNode = {
  max: number;
  low: number;
  high: number;
  color: NodeColor;
  parent: MasonryTreeNode;
  right: MasonryTreeNode;
  left: MasonryTreeNode;
  list: MasonryListNode;
};

export type MasonryTree = {
  root: MasonryTreeNode;
  size: number;
};

export type MasonryIntervalTree = {
  insert(low: number, high: number, index: number): void;
  remove(index: number): void;
  search(low: number, high: number, onCallback: (index: number, low: number) => void): void;
  size: number;
};

export type MasonryCacheKey = string | number | symbol;
export type MasonryCacheConstructor = (new () => MasonryCache) | Record<MasonryCacheKey, unknown>;

export type MasonryCache<K = MasonryCacheKey, V = unknown> = {
  set: (k: K, v: V) => V;
  get: (k: K) => V | undefined;
};

export type MasonryPositioner = {
  columnCount: number;
  columnWidth: number;
  set: (index: number, height: number) => void;
  get: (index: number) => MasonryPositionerItem | undefined;
  update: (updates: number[]) => void;
  range: (low: number, high: number, onItemRender: (index: number, left: number, top: number) => void) => void;
  size: () => number;
  estimateHeight: (itemCount: number, defaultItemHeight: number) => number;
  shortestColumn: () => number;
  all: () => Array<MasonryPositionerItem>;
};

export type MasonryPositionerItem = {
  top: number;
  left: number;
  height: number;
  columnIndex: number;
};
