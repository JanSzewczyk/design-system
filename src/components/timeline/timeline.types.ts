import { type Direction } from "~/types/direction";

export type TimelineDirection = Direction;
export type TimelineOrientation = "vertical" | "horizontal";
export type TimelineVariant = "default" | "alternate";
export type TimelineStatus = "completed" | "active" | "pending";

export type TimelineItemElement = HTMLDivElement;
