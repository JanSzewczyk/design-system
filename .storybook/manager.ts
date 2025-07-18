import { defaultConfig, type TagBadgeParameters } from "storybook-addon-tag-badges";

import { addons } from "storybook/manager-api";

addons.setConfig({
  tagBadges: [
    {
      tags: "test-only",
      badge: {
        text: "Test ⚡", // Vitest-style lightning bolt
        style: {
          background: "#729b1b",
          color: "white"
        },
        tooltip: "Testing story - powered by Vitest spirit ⚡"
      },
      display: {
        toolbar: true
      }
    },
    // Place the default config after your custom matchers.
    ...defaultConfig
  ] satisfies TagBadgeParameters
});
