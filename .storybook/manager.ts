import { addons } from "storybook/manager-api";
import { defaultConfig, type TagBadgeParameters } from "storybook-addon-tag-badges/manager-helpers";

addons.setConfig({
  tagBadges: [
    {
      badge: {
        style: {
          background: "#729b1b",
          color: "white"
        },
        text: "Test ⚡", // Vitest-style lightning bolt
        tooltip: "Testing story - powered by Vitest spirit ⚡"
      },
      display: {
        toolbar: true
      },
      tags: "test-only"
    },
    // Place the default config after your custom matchers.
    ...defaultConfig
  ] satisfies TagBadgeParameters
});
