import * as React from "react";

import { Slot as SlotPrimitive } from "radix-ui";

import { cn } from "~/utils";

import { FileUploadItemContext } from "./file-upload-item.context";
import { ITEM_NAME } from "./file-upload.constants";
import { useFileUploadContext } from "./file-upload.context";
import { useFileUploadStore } from "./file-upload.store";

export type FileUploadItemProps = React.ComponentProps<"div"> & {
  value: File;
  asChild?: boolean;
};

export function FileUploadItem(props: FileUploadItemProps) {
  const { value, asChild, className, ...itemProps } = props;

  const id = React.useId();
  const statusId = `${id}-status`;
  const nameId = `${id}-name`;
  const sizeId = `${id}-size`;
  const messageId = `${id}-message`;

  const context = useFileUploadContext(ITEM_NAME);
  const fileState = useFileUploadStore((state) => state.files.get(value));
  const fileCount = useFileUploadStore((state) => state.files.size);
  const fileIndex = useFileUploadStore((state) => {
    const keys = Array.from(state.files.keys());
    return keys.indexOf(value) + 1;
  });

  const itemContext = React.useMemo(
    () => ({
      id,
      fileState,
      nameId,
      sizeId,
      statusId,
      messageId
    }),
    [id, fileState, statusId, nameId, sizeId, messageId]
  );

  if (!fileState) return null;

  const statusText = fileState.error
    ? `Error: ${fileState.error}`
    : fileState.status === "uploading"
      ? `Uploading: ${fileState.progress}% complete`
      : fileState.status === "success"
        ? "Upload complete"
        : "Ready to upload";

  const ItemPrimitive = asChild ? SlotPrimitive.Slot : "div";

  return (
    <FileUploadItemContext.Provider value={itemContext}>
      <ItemPrimitive
        role="listitem"
        id={id}
        aria-setsize={fileCount}
        aria-posinset={fileIndex}
        aria-describedby={`${nameId} ${sizeId} ${statusId} ${fileState.error ? messageId : ""}`}
        aria-labelledby={nameId}
        data-slot="file-upload-item"
        dir={context.dir}
        {...itemProps}
        className={cn("relative flex items-center gap-2.5 rounded border p-3", className)}
      >
        {props.children}
        <span id={statusId} className="sr-only">
          {statusText}
        </span>
      </ItemPrimitive>
    </FileUploadItemContext.Provider>
  );
}
