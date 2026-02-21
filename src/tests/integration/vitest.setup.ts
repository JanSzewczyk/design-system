import { beforeAll } from "vitest";

import preview from "~/.storybook/preview";

beforeAll(preview.composed.beforeAll);
