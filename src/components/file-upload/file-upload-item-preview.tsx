import { Slot as SlotPrimitive } from "radix-ui";
import * as React from "react";

import { cn } from "~/utils";
import { ITEM_PREVIEW_NAME } from "./file-upload.constants";
import { useFileUploadContext } from "./file-upload.context";
import { getFileIcon } from "./file-upload.utils";
import { useFileUploadItemContext } from "./file-upload-item.context";

export type FileUploadItemPreviewProps = React.ComponentProps<"div"> & {
  render?: (file: File, fallback: () => React.ReactNode) => React.ReactNode;
  asChild?: boolean;
};

export function FileUploadItemPreview(props: FileUploadItemPreviewProps) {
  const { render, asChild, children, className, ...previewProps } = props;

  const itemContext = useFileUploadItemContext(ITEM_PREVIEW_NAME);
  const context = useFileUploadContext(ITEM_PREVIEW_NAME);

  const getDefaultRender = React.useCallback(
    (file: File) => {
      if (itemContext.fileState?.file.type.startsWith("image/")) {
        let url = context.urlCache.get(file);
        if (!url) {
          url = URL.createObjectURL(file);
          context.urlCache.set(file, url);
        }

        return <img alt={file.name} className="size-full object-cover" src={url} />;
      }

      return getFileIcon(file);
    },
    [itemContext.fileState?.file.type, context.urlCache]
  );

  const onPreviewRender = React.useCallback(
    (file: File) => {
      if (render) {
        return render(file, () => getDefaultRender(file));
      }

      return getDefaultRender(file);
    },
    [render, getDefaultRender]
  );

  if (!itemContext.fileState) return null;

  const ItemPreviewPrimitive = asChild ? SlotPrimitive.Slot : "div";

  return (
    <ItemPreviewPrimitive
      aria-labelledby={itemContext.nameId}
      data-slot="file-upload-preview"
      {...previewProps}
      className={cn(
        "relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded border bg-accent/50 [&>svg]:size-10",
        className
      )}
    >
      {onPreviewRender(itemContext.fileState.file)}
      {children}
    </ItemPreviewPrimitive>
  );
}
