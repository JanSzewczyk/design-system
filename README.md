<h1 align="center">@szum-tech/design-system</h1>
<p align="center">Szum-Tech design system.</p>
<br>
<div align="center" style="display: flex; flex-direction: column; gap: 1em;">
    <div style="display: flex; gap: .5em; justify-content: center">
        <a href="https://github.com/JanSzewczyk/design-system"><img alt="GitHub Release" src="https://img.shields.io/github/v/release/JanSzewczyk/design-system"></a>
        <a href="https://github.com/JanSzewczyk/design-system/pulls"><img alt="GitHub pull requests" src="https://img.shields.io/github/issues-pr/JanSzewczyk/design-system"></a>
        <a href="https://github.com/JanSzewczyk/design-system/issues"><img alt="GitHub issues" src="https://img.shields.io/github/issues/JanSzewczyk/design-system"></a>
        <a href="https://github.com/JanSzewczyk/design-system"><img alt="Github stars" src="https://img.shields.io/github/stars/JanSzewczyk/design-system?style=social"></a>
    </div>
    <div style="display: flex; gap: .5em; justify-content: center">
        <a href="https://github.com/JanSzewczyk/design-system/actions/workflows/publish.yml"><img alt="Publish action" src="https://github.com/JanSzewczyk/design-system/actions/workflows/publish.yml/badge.svg?branch=main"></a>
        <a href="https://github.com/JanSzewczyk/design-system/actions/workflows/codeql.yml"><img alt="CodeQL action" src="https://github.com/JanSzewczyk/design-system/actions/workflows/codeql.yml/badge.svg"></a>
    </div>
    <div style="display: flex; gap: .5em; justify-content: center">
        <a href="https://www.npmjs.com/package/@szum-tech/design-system"><img alt="NPM version" src="https://img.shields.io/npm/v/@szum-tech/design-system"></a>
        <a href="https://www.npmjs.com/package/@szum-tech/design-system"><img alt="Downloads" src="https://img.shields.io/npm/dm/@szum-tech/design-system"></a>
    </div>
</div>
<br>
<p align="center">
    Design system supported by <a href="https://tailwindcss.com/">Tailwind CSS</a> library, it allows the creation of applications
    supporting light and dark themes, shares UI React Components and a color palette in compliance with the Szum-Tech
    standards.
</p>

---

## 📚 Features

- Predefined [Tailwind CSS](https://tailwindcss.com/) 4+ configuration, custom color palettes and more
- Support for two themes:
  - `light`
  - `dark`
- Ready to use [Components](#components) created based on [Radix UI](https://www.radix-ui.com/)
- [Icons collection](#icons)

## 📖 Table of Contents

<!-- TOC -->

- [📚 Features](#-features)
- [📖 Table of Contents](#-table-of-contents)
- [🎯 Getting Started](#-getting-started)
  - [⚙️ Installation](#-installation)
  - [Tailwindcss Configuration](#tailwindcss-configuration)
  - [CSS file](#css-file)
  - [Usage](#usage)
    - [Components](#components)
    - [Icons](#icons)
- [🛠️ Developer Info](#-developer-info)
  - [Dependencies](#dependencies)
  - [Peer Dependencies](#peer-dependencies)
  - [Documentation](#documentation)
- [📓 Changelog](#-changelog)
- [📜 License](#-license)
<!-- TOC -->

## 🎯 Getting Started

### ⚙️ Installation

[@szum-tech/design-system](https://www.npmjs.com/package/@szum-tech/design-system) is available as
[npm package](https://www.npmjs.com/package/@szum-tech/design-system),

Install `tailwindcss` and `@szum-tech/design-system` via npm.

```shell
# NPM
npm install tailwindcss @szum-tech/design-system

# YARN
yarn add tailwindcss @szum-tech/design-system

# PNPM
pnpm add tailwindcss @szum-tech/design-system

# BUN
bun add tailwindcss @szum-tech/design-system
```

### Tailwindcss Configuration

To configure Tailwind CSS, follow the [Installation](https://tailwindcss.com/docs/installation) section in the Tailwind
CSS documentation.

On this page, you can find all the necessary information for integrating Tailwind in various ways - you can choose the
one that suits you best.

### CSS file

Add the following lines to your CSS file:

```css
@import "tailwindcss";

/* Use the @import directive to inline import CSS file with predefined styles */
@import "@szum-tech/design-system/tailwind/global.css";

/* Use the @source directive to explicitly specify source files that aren't picked up by Tailwind's automatic content detection */
@source "../node_modules/@szum-tech/design-system";
```

### Usage

#### Components

All components of the design system, context, hooks, functions, etc., are imported from `@szum-tech/design-system`

```tsx
import { Button } from "@szum-tech/design-system";
```

#### Icons

To use Icons you need to import them from `@szum-tech/design-system/icons`

```tsx
import { GoogleLogoIcon } from "@szum-tech/design-system/icons";
```

## 🛠️ Developer Info

### Dependencies

![NPM (prod) Dependency Version](https://img.shields.io/npm/dependency-version/%40szum-tech%2Fdesign-system/class-variance-authority)
![NPM (prod) Dependency Version](https://img.shields.io/npm/dependency-version/%40szum-tech%2Fdesign-system/clsx)
![NPM (prod) Dependency Version](https://img.shields.io/npm/dependency-version/%40szum-tech%2Fdesign-system/radix-ui)
![NPM (prod) Dependency Version](https://img.shields.io/npm/dependency-version/%40szum-tech%2Fdesign-system/tailwind-merge)
![NPM (prod) Dependency Version](https://img.shields.io/npm/dependency-version/%40szum-tech%2Fdesign-system/tailwindcss-animate)

### Peer Dependencies

![NPM dev or peer Dependency Version](https://img.shields.io/npm/dependency-version/%40szum-tech%2Fdesign-system/peer/react)
![NPM dev or peer Dependency Version](https://img.shields.io/npm/dependency-version/%40szum-tech%2Fdesign-system/peer/react-dom)
![NPM dev or peer Dependency Version](https://img.shields.io/npm/dependency-version/%40szum-tech%2Fdesign-system/peer/react-hook-form)
![NPM dev or peer Dependency Version](https://img.shields.io/npm/dependency-version/%40szum-tech%2Fdesign-system/peer/tailwindcss)

### Documentation

[Szum-Tech Design System](https://janszewczyk.github.io/design-system)

## 📓 Changelog

The [changelog](https://github.com/JanSzewczyk/design-system/blob/main/CHANGELOG.md) is regularly updated to reflect
what's changed in each new release.

## 📜 License

This project is licensed under the terms of the
[MIT license](https://github.com/JanSzewczyk/design-system/blob/main/LICENSE).
