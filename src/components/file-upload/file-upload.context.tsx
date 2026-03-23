import * as React from "react";

import { ROOT_NAME } from "./file-upload.constants";
import { type Direction } from "./file-upload.types";

export type FileUploadContextValue = {
  inputId: string;
  dropzoneId: string;
  listId: string;
  labelId: string;
  disabled: boolean;
  dir: Direction;
  inputRef: React.RefObject<HTMLInputElement | null>;
  urlCache: WeakMap<File, string>;
};

export const FileUploadContext = React.createContext<FileUploadContextValue | null>(null);

export function useFileUploadContext(consumerName: string): FileUploadContextValue {
  const context = React.useContext(FileUploadContext);
  if (!context) {
    throw new Error(`\`${consumerName}\` must be used within \`${ROOT_NAME}\``);
  }
  return context;
}
