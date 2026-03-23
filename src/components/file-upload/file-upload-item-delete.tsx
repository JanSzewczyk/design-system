import { Slot as SlotPrimitive } from "radix-ui";
import * as React from "react";

import { useFileUploadItemContext } from "./file-upload-item.context";
import { ITEM_DELETE_NAME } from "./file-upload.constants";
import { useFileUploadStoreContext } from "./file-upload.store";

export type FileUploadItemDeleteProps = React.ComponentProps<"button"> & {
  asChild?: boolean;
};

export function FileUploadItemDelete(props: FileUploadItemDeleteProps) {
  const { asChild, onClick: onClickProp, ...deleteProps } = props;

  const store = useFileUploadStoreContext(ITEM_DELETE_NAME);
  const itemContext = useFileUploadItemContext(ITEM_DELETE_NAME);

  const onClick = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      onClickProp?.(event);

      if (!itemContext.fileState || event.defaultPrevented) return;

      store.dispatch({
        type: "REMOVE_FILE",
        file: itemContext.fileState.file
      });
    },
    [store, itemContext.fileState, onClickProp]
  );

  if (!itemContext.fileState) return null;

  const ItemDeletePrimitive = asChild ? SlotPrimitive.Slot : "button";

  return (
    <ItemDeletePrimitive
      type="button"
      aria-controls={itemContext.id}
      aria-describedby={itemContext.nameId}
      data-slot="file-upload-item-delete"
      {...deleteProps}
      onClick={onClick}
    />
  );
}
