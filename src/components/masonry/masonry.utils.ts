import { NODE_COLOR, NODE_OPERATION } from "./masonry.constants";
import {
  type MasonryCache,
  type MasonryCacheConstructor,
  type MasonryCacheKey,
  type MasonryIntervalTree,
  type MasonryListNode,
  type MasonryTree,
  type MasonryTreeNode,
  type NodeOperation
} from "./masonry.types";

export function addInterval(treeNode: MasonryTreeNode, high: number, index: number): boolean {
  let node: MasonryListNode | null = treeNode.list;
  let prevNode: MasonryListNode | undefined;

  while (node) {
    if (node.index === index) return false;
    if (high > node.high) break;
    prevNode = node;
    node = node.next;
  }

  if (!prevNode) treeNode.list = { index, high, next: node };
  if (prevNode) prevNode.next = { index, high, next: prevNode.next };

  return true;
}

export function removeInterval(treeNode: MasonryTreeNode, index: number): NodeOperation | undefined {
  let node: MasonryListNode | null = treeNode.list;
  if (node.index === index) {
    if (node.next === null) return NODE_OPERATION.REMOVE;
    treeNode.list = node.next;
    return NODE_OPERATION.PRESERVE;
  }

  let prevNode: MasonryListNode | undefined = node;
  node = node.next;

  while (node !== null) {
    if (node.index === index) {
      prevNode.next = node.next;
      return NODE_OPERATION.PRESERVE;
    }
    prevNode = node;
    node = node.next;
  }
}

export const SENTINEL_NODE: MasonryTreeNode = {
  low: 0,
  max: 0,
  high: 0,
  color: NODE_COLOR.SENTINEL,
  parent: undefined as unknown as MasonryTreeNode,
  right: undefined as unknown as MasonryTreeNode,
  left: undefined as unknown as MasonryTreeNode,
  list: undefined as unknown as MasonryListNode
};

SENTINEL_NODE.parent = SENTINEL_NODE;
SENTINEL_NODE.left = SENTINEL_NODE;
SENTINEL_NODE.right = SENTINEL_NODE;

export function updateMax(node: MasonryTreeNode) {
  const max = node.high;
  if (node.left === SENTINEL_NODE && node.right === SENTINEL_NODE) node.max = max;
  else if (node.left === SENTINEL_NODE) node.max = Math.max(node.right.max, max);
  else if (node.right === SENTINEL_NODE) node.max = Math.max(node.left.max, max);
  else node.max = Math.max(Math.max(node.left.max, node.right.max), max);
}

export function updateMaxUp(node: MasonryTreeNode) {
  let x = node;

  while (x.parent !== SENTINEL_NODE) {
    updateMax(x.parent);
    x = x.parent;
  }
}

export function rotateLeft(tree: MasonryTree, x: MasonryTreeNode) {
  if (x.right === SENTINEL_NODE) return;
  const y = x.right;
  x.right = y.left;
  if (y.left !== SENTINEL_NODE) y.left.parent = x;
  y.parent = x.parent;

  if (x.parent === SENTINEL_NODE) tree.root = y;
  else if (x === x.parent.left) x.parent.left = y;
  else x.parent.right = y;

  y.left = x;
  x.parent = y;

  updateMax(x);
  updateMax(y);
}

export function rotateRight(tree: MasonryTree, x: MasonryTreeNode) {
  if (x.left === SENTINEL_NODE) return;
  const y = x.left;
  x.left = y.right;
  if (y.right !== SENTINEL_NODE) y.right.parent = x;
  y.parent = x.parent;

  if (x.parent === SENTINEL_NODE) tree.root = y;
  else if (x === x.parent.right) x.parent.right = y;
  else x.parent.left = y;

  y.right = x;
  x.parent = y;

  updateMax(x);
  updateMax(y);
}

export function replaceNode(tree: MasonryTree, x: MasonryTreeNode, y: MasonryTreeNode) {
  if (x.parent === SENTINEL_NODE) {
    tree.root = y;
  } else if (x === x.parent.left) {
    x.parent.left = y;
  } else {
    x.parent.right = y;
  }
  y.parent = x.parent;
}

export function fixRemove(tree: MasonryTree, node: MasonryTreeNode) {
  let x = node;
  let w: MasonryTreeNode;

  while (x !== SENTINEL_NODE && x.color === NODE_COLOR.BLACK) {
    if (x === x.parent.left) {
      w = x.parent.right;

      if (w.color === NODE_COLOR.RED) {
        w.color = NODE_COLOR.BLACK;
        x.parent.color = NODE_COLOR.RED;
        rotateLeft(tree, x.parent);
        w = x.parent.right;
      }

      if (w.left.color === NODE_COLOR.BLACK && w.right.color === NODE_COLOR.BLACK) {
        w.color = NODE_COLOR.RED;
        x = x.parent;
      } else {
        if (w.right.color === NODE_COLOR.BLACK) {
          w.left.color = NODE_COLOR.BLACK;
          w.color = NODE_COLOR.RED;
          rotateRight(tree, w);
          w = x.parent.right;
        }

        w.color = x.parent.color;
        x.parent.color = NODE_COLOR.BLACK;
        w.right.color = NODE_COLOR.BLACK;
        rotateLeft(tree, x.parent);
        x = tree.root;
      }
    } else {
      w = x.parent.left;

      if (w.color === NODE_COLOR.RED) {
        w.color = NODE_COLOR.BLACK;
        x.parent.color = NODE_COLOR.RED;
        rotateRight(tree, x.parent);
        w = x.parent.left;
      }

      if (w.right.color === NODE_COLOR.BLACK && w.left.color === NODE_COLOR.BLACK) {
        w.color = NODE_COLOR.RED;
        x = x.parent;
      } else {
        if (w.left.color === NODE_COLOR.BLACK) {
          w.right.color = NODE_COLOR.BLACK;
          w.color = NODE_COLOR.RED;
          rotateLeft(tree, w);
          w = x.parent.left;
        }

        w.color = x.parent.color;
        x.parent.color = NODE_COLOR.BLACK;
        w.left.color = NODE_COLOR.BLACK;
        rotateRight(tree, x.parent);
        x = tree.root;
      }
    }
  }

  x.color = NODE_COLOR.BLACK;
}

export function minimumTree(node: MasonryTreeNode) {
  let current = node;
  while (current.left !== SENTINEL_NODE) {
    current = current.left;
  }
  return current;
}

export function fixInsert(tree: MasonryTree, node: MasonryTreeNode) {
  let current = node;
  let y: MasonryTreeNode;

  while (current.parent.color === NODE_COLOR.RED) {
    if (current.parent === current.parent.parent.left) {
      y = current.parent.parent.right;

      if (y.color === NODE_COLOR.RED) {
        current.parent.color = NODE_COLOR.BLACK;
        y.color = NODE_COLOR.BLACK;
        current.parent.parent.color = NODE_COLOR.RED;
        current = current.parent.parent;
      } else {
        if (current === current.parent.right) {
          current = current.parent;
          rotateLeft(tree, current);
        }

        current.parent.color = NODE_COLOR.BLACK;
        current.parent.parent.color = NODE_COLOR.RED;
        rotateRight(tree, current.parent.parent);
      }
    } else {
      y = current.parent.parent.left;

      if (y.color === NODE_COLOR.RED) {
        current.parent.color = NODE_COLOR.BLACK;
        y.color = NODE_COLOR.BLACK;
        current.parent.parent.color = NODE_COLOR.RED;
        current = current.parent.parent;
      } else {
        if (current === current.parent.left) {
          current = current.parent;
          rotateRight(tree, current);
        }

        current.parent.color = NODE_COLOR.BLACK;
        current.parent.parent.color = NODE_COLOR.RED;
        rotateLeft(tree, current.parent.parent);
      }
    }
  }
  tree.root.color = NODE_COLOR.BLACK;
}

export function createIntervalTree(): MasonryIntervalTree {
  const tree: MasonryTree = {
    root: SENTINEL_NODE,
    size: 0
  };

  const indexMap: Record<number, MasonryTreeNode> = {};

  return {
    insert(low, high, index) {
      let x: MasonryTreeNode = tree.root;
      let y: MasonryTreeNode = SENTINEL_NODE;

      while (x !== SENTINEL_NODE) {
        y = x;
        if (low === y.low) break;
        if (low < x.low) x = x.left;
        else x = x.right;
      }

      if (low === y.low && y !== SENTINEL_NODE) {
        if (!addInterval(y, high, index)) return;
        y.high = Math.max(y.high, high);
        updateMax(y);
        updateMaxUp(y);
        indexMap[index] = y;
        tree.size++;
        return;
      }

      const z: MasonryTreeNode = {
        low,
        high,
        max: high,
        color: NODE_COLOR.RED,
        parent: y,
        left: SENTINEL_NODE,
        right: SENTINEL_NODE,
        list: { index, high, next: null }
      };

      if (y === SENTINEL_NODE) {
        tree.root = z;
      } else {
        if (z.low < y.low) y.left = z;
        else y.right = z;
        updateMaxUp(z);
      }

      fixInsert(tree, z);
      indexMap[index] = z;
      tree.size++;
    },

    remove(index) {
      const z = indexMap[index];
      if (z === void 0) return;
      delete indexMap[index];

      const intervalResult = removeInterval(z, index);
      if (intervalResult === void 0) return;
      if (intervalResult === NODE_OPERATION.PRESERVE) {
        z.high = z.list.high;
        updateMax(z);
        updateMaxUp(z);
        tree.size--;
        return;
      }

      let y = z;
      let originalYColor = y.color;
      let x: MasonryTreeNode;

      if (z.left === SENTINEL_NODE) {
        x = z.right;
        replaceNode(tree, z, z.right);
      } else if (z.right === SENTINEL_NODE) {
        x = z.left;
        replaceNode(tree, z, z.left);
      } else {
        y = minimumTree(z.right);
        originalYColor = y.color;
        x = y.right;

        if (y.parent === z) {
          x.parent = y;
        } else {
          replaceNode(tree, y, y.right);
          y.right = z.right;
          y.right.parent = y;
        }

        replaceNode(tree, z, y);
        y.left = z.left;
        y.left.parent = y;
        y.color = z.color;
      }

      updateMax(x);
      updateMaxUp(x);

      if (originalYColor === NODE_COLOR.BLACK) fixRemove(tree, x);
      tree.size--;
    },

    search(low, high, onCallback) {
      const stack = [tree.root];
      while (stack.length !== 0) {
        const node = stack.pop();
        if (!node) continue;
        if (node === SENTINEL_NODE || low > node.max) continue;
        if (node.left !== SENTINEL_NODE) stack.push(node.left);
        if (node.right !== SENTINEL_NODE) stack.push(node.right);
        if (node.low <= high && node.high >= low) {
          let curr: MasonryListNode | null = node.list;
          while (curr !== null) {
            if (curr.high >= low) onCallback(curr.index, node.low);
            curr = curr.next;
          }
        }
      }
    },

    get size() {
      return tree.size;
    }
  };
}

export function onDeepMemo<T extends unknown[], U>(
  constructors: MasonryCacheConstructor[],
  fn: (...args: T) => U
): (...args: T) => U {
  if (!constructors.length || !constructors[0]) {
    throw new Error("At least one constructor is required");
  }

  function createCache(obj: MasonryCacheConstructor): MasonryCache {
    let cache: MasonryCache;
    if (typeof obj === "function") {
      try {
        cache = new (obj as unknown as new () => MasonryCache)();
      } catch (_err) {
        cache = new Map<MasonryCacheKey, unknown>();
      }
    } else {
      cache = obj as unknown as MasonryCache;
    }
    return {
      set(k: MasonryCacheKey, v: unknown): unknown {
        cache.set(k, v);
        return v;
      },
      get(k: MasonryCacheKey): unknown | undefined {
        return cache.get(k);
      }
    };
  }

  const depth = constructors.length;
  const baseCache = createCache(constructors[0]);

  let base: MasonryCache | undefined;
  let map: MasonryCache | undefined;
  let node: MasonryCache;
  let i: number;
  const one = depth === 1;

  function get(args: unknown[]): unknown {
    if (depth < 3) {
      const key = args[0] as MasonryCacheKey;
      base = baseCache.get(key) as MasonryCache | undefined;
      return one ? base : base?.get(args[1] as MasonryCacheKey);
    }

    node = baseCache;
    for (i = 0; i < depth; i++) {
      const next = node.get(args[i] as MasonryCacheKey);
      if (!next) return undefined;
      node = next as MasonryCache;
    }
    return node;
  }

  function set(args: unknown[], value: unknown): unknown {
    if (depth < 3) {
      if (one) {
        baseCache.set(args[0] as MasonryCacheKey, value);
      } else {
        base = baseCache.get(args[0] as MasonryCacheKey) as MasonryCache | undefined;
        if (!base) {
          if (!constructors[1]) {
            throw new Error("Second constructor is required for non-single depth cache");
          }
          map = createCache(constructors[1]);
          map.set(args[1] as MasonryCacheKey, value);
          baseCache.set(args[0] as MasonryCacheKey, map);
        } else {
          base.set(args[1] as MasonryCacheKey, value);
        }
      }
      return value;
    }

    node = baseCache;
    for (i = 0; i < depth - 1; i++) {
      map = node.get(args[i] as MasonryCacheKey) as MasonryCache | undefined;
      if (!map) {
        const nextConstructor = constructors[i + 1];
        if (!nextConstructor) {
          throw new Error(`Constructor at index ${i + 1} is required`);
        }
        map = createCache(nextConstructor);
        node.set(args[i] as MasonryCacheKey, map);
        node = map;
      } else {
        node = map;
      }
    }
    node.set(args[depth - 1] as MasonryCacheKey, value);
    return value;
  }

  return (...args: T): U => {
    const cached = get(args);
    if (cached === undefined) {
      return set(args, fn(...args)) as U;
    }
    return cached as U;
  };
}

export type OnRafScheduleReturn<T extends unknown[]> = {
  (...args: T): void;
  cancel: () => void;
};

export function onRafSchedule<T extends unknown[]>(callback: (...args: T) => void): OnRafScheduleReturn<T> {
  let lastArgs: T = [] as unknown as T;
  let frameId: number | null = null;

  function onCallback(...args: T) {
    lastArgs = args;

    if (frameId)
      frameId = requestAnimationFrame(() => {
        frameId = null;
        callback(...lastArgs);
      });
  }

  onCallback.cancel = () => {
    if (!frameId) return;
    cancelAnimationFrame(frameId);
    frameId = null;
  };

  return onCallback;
}
