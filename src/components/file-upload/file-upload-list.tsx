import { Slot as SlotPrimitive } from "radix-ui";
import * as React from "react";

import { cn } from "~/utils";

import { LIST_NAME } from "./file-upload.constants";
import { useFileUploadContext } from "./file-upload.context";
import { useFileUploadStore } from "./file-upload.store";
import { fileUploadListVariants } from "./file-upload.styles";
import { type FileUploadListOrientationType } from "./file-upload.types";

export type FileUploadListProps = React.ComponentProps<"div"> & {
  orientation?: FileUploadListOrientationType;
  asChild?: boolean;
  forceMount?: boolean;
};

export function FileUploadList(props: FileUploadListProps) {
  const { className, orientation = "vertical", asChild, forceMount, ...listProps } = props;

  const context = useFileUploadContext(LIST_NAME);
  const fileCount = useFileUploadStore((state) => state.files.size);
  const shouldRender = forceMount || fileCount > 0;

  if (!shouldRender) return null;

  const ListPrimitive = asChild ? SlotPrimitive.Slot : "div";

  return (
    <ListPrimitive
      role="list"
      id={context.listId}
      aria-orientation={orientation}
      data-orientation={orientation}
      data-slot="file-upload-list"
      data-state={shouldRender ? "active" : "inactive"}
      dir={context.dir}
      {...listProps}
      className={cn(fileUploadListVariants({ orientation }), className)}
    />
  );
}
