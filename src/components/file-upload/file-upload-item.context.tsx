import * as React from "react";

import { ITEM_NAME } from "./file-upload.constants";
import { type FileState } from "./file-upload.types";

export type FileUploadItemContextValue = {
  id: string;
  fileState: FileState | undefined;
  nameId: string;
  sizeId: string;
  statusId: string;
  messageId: string;
};

export const FileUploadItemContext = React.createContext<FileUploadItemContextValue | null>(null);

export function useFileUploadItemContext(consumerName: string): FileUploadItemContextValue {
  const context = React.useContext(FileUploadItemContext);
  if (!context) {
    throw new Error(`\`${consumerName}\` must be used within \`${ITEM_NAME}\``);
  }
  return context;
}
