// import { addons } from "@storybook/addons";
//
// import customDarkTheme from "./theme/dark";
//
// addons.setConfig({
//   theme: customDarkTheme
// });

// addons.register("TitleAddon", (api) => {
//   const customTitle = "Szum-Tech Design System";
//   let interval: string | number | NodeJS.Timeout | null | undefined = null;
//
//   const setTitle = () => {
//     if (interval) {
//       clearTimeout(interval);
//
//       let storyData = null;
//       try {
//         storyData = api.getCurrentStoryData();
//       } catch (e) {}
//
//       let title;
//       if (!storyData) {
//         title = customTitle;
//       } else {
//         title = `${storyData.kind} - ${storyData.name} ⋅ ${customTitle}`;
//       }
//
//       if (document.title !== title) {
//         document.title = title;
//       }
//       interval = setTimeout(setTitle, 100);
//     }
//   };
//
//   setTitle();
//
//   api.on(STORY_RENDERED, () => {
//     setTitle();
//   });
// });
