import { Slot as SlotPrimitive } from "radix-ui";
import * as React from "react";

import { CLEAR_NAME } from "./file-upload.constants";
import { useFileUploadContext } from "./file-upload.context";
import { useFileUploadStore, useFileUploadStoreContext } from "./file-upload.store";

export type FileUploadClearProps = React.ComponentProps<"button"> & {
  forceMount?: boolean;
  asChild?: boolean;
};

export function FileUploadClear(props: FileUploadClearProps) {
  const { asChild, forceMount, disabled, onClick: onClickProp, ...clearProps } = props;

  const context = useFileUploadContext(CLEAR_NAME);
  const store = useFileUploadStoreContext(CLEAR_NAME);
  const fileCount = useFileUploadStore((state) => state.files.size);

  const isDisabled = disabled || context.disabled;

  const onClick = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      onClickProp?.(event);

      if (event.defaultPrevented) return;

      store.dispatch({ type: "CLEAR" });
    },
    [store, onClickProp]
  );

  const shouldRender = forceMount || fileCount > 0;

  if (!shouldRender) return null;

  const ClearPrimitive = asChild ? SlotPrimitive.Slot : "button";

  return (
    <ClearPrimitive
      type="button"
      aria-controls={context.listId}
      data-slot="file-upload-clear"
      data-disabled={isDisabled ? "" : undefined}
      {...clearProps}
      disabled={isDisabled}
      onClick={onClick}
    />
  );
}
