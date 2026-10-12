import { Slot as SlotPrimitive } from "radix-ui";
import * as React from "react";

import { cn } from "~/utils";
import { ITEM_METADATA_NAME } from "./file-upload.constants";
import { useFileUploadContext } from "./file-upload.context";
import { formatBytes } from "./file-upload.utils";
import { useFileUploadItemContext } from "./file-upload-item.context";

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
            className={cn("truncate font-medium text-sm", size === "sm" && "font-normal text-[13px] leading-snug")}
            id={itemContext.nameId}
          >
            {itemContext.fileState.file.name}
          </span>
          <span
            className={cn("truncate text-muted-foreground text-xs", size === "sm" && "text-[11px] leading-snug")}
            id={itemContext.sizeId}
          >
            {formatBytes(itemContext.fileState.file.size)}
          </span>
          {itemContext.fileState.error && (
            <span className="text-destructive text-xs" id={itemContext.messageId}>
              {itemContext.fileState.error}
            </span>
          )}
        </>
      )}
    </ItemMetadataPrimitive>
  );
}
