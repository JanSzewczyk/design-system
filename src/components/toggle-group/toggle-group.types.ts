import type * as React from "react";

import { type ToggleGroup as ToggleGroupPrimitive } from "radix-ui";

export type ToggleGroupOrientationType = React.ComponentProps<typeof ToggleGroupPrimitive.Root>["orientation"];
