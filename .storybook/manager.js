import addons from "@storybook/addons";
import { STORY_RENDERED } from "@storybook/core-events";

addons.setConfig({
  theme: { fontBase: "'Open Sans', sans-serif" }
});

addons.register("TitleAddon", (api) => {
  const customTitle = "Szum-Tech Design System";
  let interval = null;

  const setTitle = () => {
    clearTimeout(interval);

    let storyData = null;
    try {
      storyData = api.getCurrentStoryData();
    } catch (e) {}

    let title;
    if (!storyData) {
      title = customTitle;
    } else {
      title = `${storyData.kind} - ${storyData.name} ⋅ ${customTitle}`;
    }

    if (document.title !== title) {
      document.title = title;
    }
    interval = setTimeout(setTitle, 100);
  };

  setTitle();

  api.on(STORY_RENDERED, () => {
    setTitle();
  });
});
