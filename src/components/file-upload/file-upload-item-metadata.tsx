import { Slot as SlotPrimitive } from "radix-ui";
import * as React from "react";

import { cn } from "~/utils";

import { useFileUploadItemContext } from "./file-upload-item.context";
import { ITEM_METADATA_NAME } from "./file-upload.constants";
import { useFileUploadContext } from "./file-upload.context";
import { formatBytes } from "./file-upload.utils";

export type FileUploadItemMetadataProps = React.ComponentProps<"div"> & {
  asChild?: boolean;
  size?: "default" | "sm";
};

export function FileUploadItemMetadata(props: FileUploadItemMetadataProps) {
  const { asChild, size = "default", children, className, ...metadataProps } = props;

  const context = useFileUploadContext(ITEM_METADATA_NAME);
  const itemContext = useFileUploadItemContext(ITEM_METADATA_NAME);

  if (!itemContext.fileState) return null;

  const ItemMetadataPrimitive = asChild ? SlotPrimitive.Slot : "div";

  return (
    <ItemMetadataPrimitive
      data-slot="file-upload-metadata"
      dir={context.dir}
      {...metadataProps}
      className={cn("flex min-w-0 flex-1 flex-col", className)}
    >
      {children ?? (
        <>
          <span
            id={itemContext.nameId}
            className={cn("truncate text-sm font-medium", size === "sm" && "text-[13px] leading-snug font-normal")}
          >
            {itemContext.fileState.file.name}
          </span>
          <span
            id={itemContext.sizeId}
            className={cn("text-muted-foreground truncate text-xs", size === "sm" && "text-[11px] leading-snug")}
          >
            {formatBytes(itemContext.fileState.file.size)}
          </span>
          {itemContext.fileState.error && (
            <span id={itemContext.messageId} className="text-destructive text-xs">
              {itemContext.fileState.error}
            </span>
          )}
        </>
      )}
    </ItemMetadataPrimitive>
  );
}
