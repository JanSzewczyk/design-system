import { defaultConfig, type TagBadgeParameters } from "storybook-addon-tag-badges";

import { addons } from "@storybook/manager-api";

addons.setConfig({
  tagBadges: [
    {
      tags: "test-only",
      badge: {
        text: "Test ⚡", // Vitest-style lightning bolt
        bgColor: "#729b1b", // Vitest signature green
        fgColor: "#ffffff", // Clean white text
        tooltip: "Testing story - powered by Vitest spirit ⚡"
      },
      display: {
        sidebar: ["story"],
        toolbar: true
      }
    },
    // Place the default config after your custom matchers.
    ...defaultConfig
  ] satisfies TagBadgeParameters
});
