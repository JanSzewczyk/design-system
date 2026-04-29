<div align="center">
  <h1 align="center">@szum-tech/design-system</h1>
  <img style="max-width: 100%; height: auto;" alt="Szum-Tech Design System Banner" src="https://github.com/user-attachments/assets/59791086-c549-4cf8-8f3c-ab10e531bafa" />
  <p align="center">A comprehensive, accessible, and highly customizable React design system tailored to Szum-Tech standards.</p>
</div>

<br>

<div align="center" style="display: flex; flex-direction: column; gap: 1em;">
    <div style="display: flex; gap: .5em; justify-content: center; flex-wrap: wrap;">
        <a href="https://github.com/JanSzewczyk/design-system"><img alt="GitHub Release" src="https://img.shields.io/github/v/release/JanSzewczyk/design-system"></a>
        <a href="https://github.com/JanSzewczyk/design-system/pulls"><img alt="GitHub pull requests" src="https://img.shields.io/github/issues-pr/JanSzewczyk/design-system"></a>
        <a href="https://github.com/JanSzewczyk/design-system/issues"><img alt="GitHub issues" src="https://img.shields.io/github/issues/JanSzewczyk/design-system"></a>
        <a href="https://github.com/JanSzewczyk/design-system"><img alt="Github stars" src="https://img.shields.io/github/stars/JanSzewczyk/design-system?style=social"></a>
    </div>
    <div style="display: flex; gap: .5em; justify-content: center; flex-wrap: wrap;">
        <a href="https://github.com/JanSzewczyk/design-system/actions/workflows/publish.yml"><img alt="Publish action" src="https://github.com/JanSzewczyk/design-system/actions/workflows/publish.yml/badge.svg?branch=main"></a>
        <a href="https://github.com/JanSzewczyk/design-system/actions/workflows/codeql.yml"><img alt="CodeQL action" src="https://github.com/JanSzewczyk/design-system/actions/workflows/codeql.yml/badge.svg"></a>
    </div>
    <div style="display: flex; gap: .5em; justify-content: center; flex-wrap: wrap;">
        <a href="https://www.npmjs.com/package/@szum-tech/design-system"><img alt="NPM version" src="https://img.shields.io/npm/v/@szum-tech/design-system"></a>
        <a href="https://www.npmjs.com/package/@szum-tech/design-system"><img alt="Downloads" src="https://img.shields.io/npm/dm/@szum-tech/design-system"></a>
    </div>
</div>

<br>

<p align="center">
    Built with <a href="https://tailwindcss.com/">Tailwind CSS</a> and <a href="https://www.radix-ui.com/">Radix UI</a>, this design system provides a robust collection of over 50+ modern, resuable UI components supporting light and dark themes. It ensures accessibility out of the box and seamlessly integrates with React 19+.
</p>

---

## ✨ Features

- 🎨 **Modern Stack**: Ready to go with [Tailwind CSS v4+](https://tailwindcss.com/) & React 19+.
- 🧩 **Extensive Kit**: Over 50+ crafted components (Carousel, Sortable, Drawers, Comboboxes, Pickers & more).
- ♿ **Accessible**: Built around [Radix UI](https://www.radix-ui.com/) and [@base-ui/react](https://base-ui.com/) to ensure WAI-ARIA compliance.
- 🌓 **Themes**: Native support for configurable `light` and `dark` color palettes.
- 📐 **Animations**: Smooth motion and interactions powered by `motion`, `tailwindcss-animate`, and `@dnd-kit`.
- 🗃️ **Iconography**: Bundled optimized icon set with Lucide React.
- 📘 **Interactive Docs**: Fully documented and play-tested in a Storybook environment.

## 📖 Table of Contents

- [✨ Features](#-features)
- [🎯 Getting Started](#-getting-started)
  - [⚙️ Installation](#️-installation)
  - [🎨 Tailwind CSS Configuration](#-tailwind-css-configuration)
- [🚀 Usage](#-usage)
  - [🧩 Components](#-components)
  - [🖼️ Icons](#️-icons)
  - [🪝 Hooks \& Utils](#-hooks--utils)
- [📚 Documentation](#-documentation)
- [🛠️ Developer Info](#️-developer-info)
- [📓 Changelog](#-changelog)
- [📜 License](#-license)

---

## 🎯 Getting Started

### ⚙️ Installation

The package and its peer dependencies are available on npm. Start by adding it to your project:

```shell
# NPM
npm install @szum-tech/design-system

# YARN
yarn add @szum-tech/design-system

# PNPM
pnpm add @szum-tech/design-system

# BUN
bun add @szum-tech/design-system
```

_Note: You must have `react`, `react-dom` (>=19) and `tailwindcss` (>=4) installed as peer dependencies._

### 🎨 Tailwind CSS Configuration

To use the design system components correctly, ensure Tailwind compiles its CSS framework. If you are using Tailwind v4+ with `@import` methodology, append the following lines to your main CSS file:

```css
@import "tailwindcss";

/* Import the design system's predefined styles, tokens, and theme layers */
@import "@szum-tech/design-system/tailwind/global.css";

/* Specify source path to allow Tailwind's JIT scanner to pick up the component classes */
@source "../node_modules/@szum-tech/design-system";
```

> For additional installation methods, refer to the [Tailwind CSS Installation Docs](https://tailwindcss.com/docs/installation).

---

## 🚀 Usage

### 🧩 Components

All available components, contexts, and specific providers are exported from the root `@szum-tech/design-system`.

```tsx
import { 
  Button, 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent 
} from "@szum-tech/design-system";

export default function App() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome to Szum-Tech!</CardTitle>
      </CardHeader>
      <CardContent>
        <Button variant="primary">Click me</Button>
      </CardContent>
    </Card>
  );
}
```

### 🖼️ Icons

The system provides an optimized endpoint for fetching icons (using tree-shaking best practices):

```tsx
import { GoogleLogoIcon } from "@szum-tech/design-system/icons";

export function CustomButton() {
  return <Button leftIcon={<GoogleLogoIcon />}>Login with Google</Button>;
}
```

### 🪝 Hooks & Utils

Utilities and React hooks can be imported from their respective paths:

```tsx
import { useMediaQuery } from "@szum-tech/design-system/hooks";
import { cn } from "@szum-tech/design-system/utils";
```

### 🌓 Theming (Light & Dark Mode)

The design system inherits native support for both `light` and `dark` themes. Theme switching relies on Tailwind CSS's selector strategies (custom variant `.dark`). 

To activate the dark mode, append the `.dark` class to the `<html>` or `<body>` tag of your application:

```tsx
import { useEffect, useState } from "react";
import { Button } from "@szum-tech/design-system";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <Button onClick={() => setIsDark(!isDark)}>
      Toggle to {isDark ? "Light" : "Dark"} Mode
    </Button>
  );
}
```

---

## 📚 Documentation

Detailed documentation and an interactive component sandbox is generated via [Storybook](https://storybook.js.org/). View it here:

👉 **[Szum-Tech Design System Docs](https://janszewczyk.github.io/design-system)**

---

## 🛠️ Developer Info

### Core Dependencies

![NPM (prod) Dependency Version](https://img.shields.io/npm/dependency-version/%40szum-tech%2Fdesign-system/class-variance-authority)
![NPM (prod) Dependency Version](https://img.shields.io/npm/dependency-version/%40szum-tech%2Fdesign-system/clsx)
![NPM (prod) Dependency Version](https://img.shields.io/npm/dependency-version/%40szum-tech%2Fdesign-system/radix-ui)
![NPM (prod) Dependency Version](https://img.shields.io/npm/dependency-version/%40szum-tech%2Fdesign-system/tailwind-merge)

### Peer Dependencies

![NPM dev or peer Dependency Version](https://img.shields.io/npm/dependency-version/%40szum-tech%2Fdesign-system/peer/react)
![NPM dev or peer Dependency Version](https://img.shields.io/npm/dependency-version/%40szum-tech%2Fdesign-system/peer/react-dom)
![NPM dev or peer Dependency Version](https://img.shields.io/npm/dependency-version/%40szum-tech%2Fdesign-system/peer/tailwindcss)

### Commands

For running the environment locally:

- **Build**: `npm run build`
- **Storybook**: `npm run storybook:dev`
- **Lint**: `npm run lint`
- **Test**: `npm run test` or `npm run test:ui`

---

## 📓 Changelog

We use Semantic Release for semantic versioning. For a complete list of updates, please see the [CHANGELOG.md](https://github.com/JanSzewczyk/design-system/blob/main/CHANGELOG.md).

---

## 📜 License

Available under the terms of the [MIT license](https://github.com/JanSzewczyk/design-system/blob/main/LICENSE).
