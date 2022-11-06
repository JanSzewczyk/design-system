# Szum-Tech Design System

![GitHub release (latest by date)](https://img.shields.io/github/v/release/JanSzewczyk/design-system)
[![GitHub pull requests](https://img.shields.io/github/issues-pr/JanSzewczyk/design-system)](https://github.com/JanSzewczyk/design-system/pulls)
[![GitHub issues](https://img.shields.io/github/issues/JanSzewczyk/design-system)](https://github.com/JanSzewczyk/design-system/issues)
![GitHub Repo stars](https://img.shields.io/github/stars/JanSzewczyk/design-system?style=social)

[![released](https://github.com/JanSzewczyk/design-system/actions/workflows/publish.yml/badge.svg?branch=main)](https://github.com/JanSzewczyk/design-system/actions/workflows/publish.yml)
[![deployed](https://github.com/JanSzewczyk/design-system/actions/workflows/gh-deploy.yml/badge.svg?branch=main)](https://github.com/JanSzewczyk/design-system/actions/workflows/gh-deploy.yml)

[![npm](https://img.shields.io/npm/v/@szum-tech/design-system)](https://www.npmjs.com/package/@szum-tech/design-system)
![npm](https://img.shields.io/npm/dm/@szum-tech/design-system)

[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/JanSzewczyk/design-system/blob/main/LICENSE)

Design system supported by [tailwindcss](https://tailwindcss.com/) library, it allows the creation of applications supporting light and dark themes, shares UI React Components and a color palette in compliance with the Szum-Tech standards.

## Installation

Szum-Tech Design System is available as an [npm package](https://www.npmjs.com/package/@szum-tech/design-system).

**npm:**

```sh
npm install @szum-tech/design-system
```

**yarn:**

```sh
yarn add @szum-tech/design-system
```

## Configuration 

After installing the [@szum-tech/design-system](https://www.npmjs.com/package/@szum-tech/design-system) package in accordance with paragraph [Installation](#Installation), during [Tailwind initialization](https://tailwindcss.com/docs/installation), follow these steps:

### 1. Add preset to `tailwind.config.js` file

> Add path to `@szum-tech/design-system` UI Components files and add preset file to Tailwind configuration

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "...",
    "./node_modules/@szum-tech/design-system/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {}
  },
  plugins: [],
  presets: [require("@szum-tech/design-system/tailwind-preset")]
};
```

### 2. Import theme styles to CSS file with Tailwind directives 

> Import CSS file from `@szum-tech/design-system/theme` with colors palette for dark and light theme and default styles (see file with [theme styles](https://github.com/JanSzewczyk/design-system/blob/main/src/theme/global.css))

```css
@import "@szum-tech/design-system/theme/global.css";

@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Getting started

### Theme Provider 

`ThemeProvider` relies on the [context feature of React](https://reactjs.org/docs/context.html) to handle theme mode and pass it to components, so you need to make sure `ThemeProvider` is the parent of the components you are trying to customize.

Here is an example of a basic app using `ThemeProvider` component:

```jsx
import * as React from 'react';
import { ThemeProvider } from '@szum-tech/design-system';

function Providers({children}) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
```



## Documentation 

[Szum-Tech Design System](https://janszewczyk.github.io/design-system)

## Changelog

The [changelog](https://github.com/JanSzewczyk/design-system/blob/main/CHANGELOG.md) is regularly updated to reflect what's changed in each new release.

## License

This project is licensed under the terms of the
[MIT license](https://github.com/JanSzewczyk/design-system/blob/main/LICENSE).
