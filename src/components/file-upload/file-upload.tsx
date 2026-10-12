import { Direction as DirectionPrimitive, Slot as SlotPrimitive } from "radix-ui";
import * as React from "react";

import { useAsRef } from "~/hooks/use-as-ref";
import { useLazyRef } from "~/hooks/use-lazy-ref";
import { cn } from "~/utils";

import { FileUploadContext } from "./file-upload.context";
import { createFileUploadStore, FileUploadStoreContext } from "./file-upload.store";
import { type Direction } from "./file-upload.types";

export type FileUploadUploadOptions = {
  onProgress: (file: File, progress: number) => void;
  onSuccess: (file: File) => void;
  onError: (file: File, error: Error) => void;
};

export type FileUploadProps = Omit<React.ComponentProps<"div">, "defaultValue" | "onChange"> & {
  value?: File[];
  defaultValue?: File[];
  onValueChange?: (files: File[]) => void;
  onAccept?: (files: File[]) => void;
  onFileAccept?: (file: File) => void;
  onFileReject?: (file: File, message: string) => void;
  onFileValidate?: (file: File) => string | null | undefined;
  onUpload?: (files: File[], options: FileUploadUploadOptions) => Promise<void> | void;
  accept?: string;
  maxFiles?: number;
  maxSize?: number;
  dir?: Direction;
  label?: string;
  name?: string;
  asChild?: boolean;
  disabled?: boolean;
  invalid?: boolean;
  multiple?: boolean;
  required?: boolean;
};

export function FileUpload(props: FileUploadProps) {
  const {
    value,
    defaultValue,
    onValueChange,
    onAccept,
    onFileAccept,
    onFileReject,
    onFileValidate,
    onUpload,
    accept,
    maxFiles,
    maxSize,
    dir: dirProp,
    label,
    name,
    asChild,
    disabled = false,
    invalid = false,
    multiple = false,
    required = false,
    children,
    className,
    ...rootProps
  } = props;

  const inputId = React.useId();
  const dropzoneId = React.useId();
  const listId = React.useId();
  const labelId = React.useId();

  const dir = DirectionPrimitive.useDirection(dirProp);
  const listeners = useLazyRef(() => new Set<() => void>()).current;
  const files = useLazyRef<
    Map<File, { file: File; progress: number; error?: string; status: "idle" | "uploading" | "error" | "success" }>
  >(() => new Map()).current;
  const urlCache = useLazyRef(() => new WeakMap<File, string>()).current;
  const inputRef = React.useRef<HTMLInputElement>(null);
  const isControlled = value !== undefined;

  const propsRef = useAsRef({
    onAccept,
    onFileAccept,
    onFileReject,
    onFileValidate,
    onUpload,
    onValueChange
  });

  const store = React.useMemo(
    () => createFileUploadStore(listeners, files, urlCache, propsRef, invalid),
    [listeners, files, urlCache, propsRef]
  );

  React.useEffect(() => {
    store.dispatch({ invalid, type: "SET_INVALID" });
  }, [store, invalid]);

  const acceptTypes = React.useMemo(() => accept?.split(",").map((t) => t.trim()) ?? null, [accept]);

  const onProgress = useLazyRef(() => {
    let frame = 0;
    return (file: File, progress: number) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        store.dispatch({
          file,
          progress: Math.min(Math.max(0, progress), 100),
          type: "SET_PROGRESS"
        });
      });
    };
  }).current;

  React.useEffect(() => {
    if (isControlled) {
      store.dispatch({ files: value, type: "SET_FILES" });
    } else if (defaultValue && defaultValue.length > 0 && !store.getState().files.size) {
      store.dispatch({ files: defaultValue, type: "SET_FILES" });
    }
  }, [value, defaultValue, isControlled, store]);

  React.useEffect(() => {
    return () => {
      for (const file of files.keys()) {
        const cachedUrl = urlCache.get(file);
        if (cachedUrl) {
          URL.revokeObjectURL(cachedUrl);
        }
      }
    };
  }, [files, urlCache]);

  const onFilesUpload = React.useCallback(
    async (filesToUpload: File[]) => {
      try {
        for (const file of filesToUpload) {
          store.dispatch({ file, progress: 0, type: "SET_PROGRESS" });
        }

        if (propsRef.current.onUpload) {
          await propsRef.current.onUpload(filesToUpload, {
            onError: (file, error) => {
              store.dispatch({
                error: error.message ?? "Upload failed",
                file,
                type: "SET_ERROR"
              });
            },
            onProgress,
            onSuccess: (file) => {
              store.dispatch({ file, type: "SET_SUCCESS" });
            }
          });
        } else {
          for (const file of filesToUpload) {
            store.dispatch({ file, type: "SET_SUCCESS" });
          }
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Upload failed";
        for (const file of filesToUpload) {
          store.dispatch({
            error: errorMessage,
            file,
            type: "SET_ERROR"
          });
        }
      }
    },
    [store, propsRef, onProgress]
  );

  const onFilesChange = React.useCallback(
    (originalFiles: File[]) => {
      if (disabled) return;

      let filesToProcess = [...originalFiles];
      let hasInvalid = false;

      if (maxFiles) {
        const currentCount = store.getState().files.size;
        const remainingSlotCount = Math.max(0, maxFiles - currentCount);

        if (remainingSlotCount < filesToProcess.length) {
          const rejectedFiles = filesToProcess.slice(remainingSlotCount);
          hasInvalid = true;

          filesToProcess = filesToProcess.slice(0, remainingSlotCount);

          for (const file of rejectedFiles) {
            let rejectionMessage = `Maximum ${maxFiles} files allowed`;

            if (propsRef.current.onFileValidate) {
              const validationMessage = propsRef.current.onFileValidate(file);
              if (validationMessage) {
                rejectionMessage = validationMessage;
              }
            }

            propsRef.current.onFileReject?.(file, rejectionMessage);
          }
        }
      }

      const acceptedFiles: File[] = [];

      for (const file of filesToProcess) {
        let rejected = false;
        let rejectionMessage = "";

        if (propsRef.current.onFileValidate) {
          const validationMessage = propsRef.current.onFileValidate(file);
          if (validationMessage) {
            rejectionMessage = validationMessage;
            propsRef.current.onFileReject?.(file, rejectionMessage);
            rejected = true;
            hasInvalid = true;
            continue;
          }
        }

        if (acceptTypes) {
          const fileType = file.type;
          const fileExtension = `.${file.name.split(".").pop()}`;

          if (
            !acceptTypes.some(
              (type) =>
                type === fileType ||
                type === fileExtension ||
                (type.includes("/*") && fileType.startsWith(type.replace("/*", "/")))
            )
          ) {
            rejectionMessage = "File type not accepted";
            propsRef.current.onFileReject?.(file, rejectionMessage);
            rejected = true;
            hasInvalid = true;
          }
        }

        if (maxSize && file.size > maxSize) {
          rejectionMessage = "File too large";
          propsRef.current.onFileReject?.(file, rejectionMessage);
          rejected = true;
          hasInvalid = true;
        }

        if (!rejected) {
          acceptedFiles.push(file);
        }
      }

      if (hasInvalid) {
        store.dispatch({ invalid: true, type: "SET_INVALID" });
        setTimeout(() => {
          store.dispatch({ invalid: false, type: "SET_INVALID" });
        }, 2000);
      }

      if (acceptedFiles.length > 0) {
        store.dispatch({ files: acceptedFiles, type: "ADD_FILES" });

        if (isControlled && propsRef.current.onValueChange) {
          const currentFiles = Array.from(store.getState().files.values()).map((f) => f.file);
          propsRef.current.onValueChange([...currentFiles]);
        }

        if (propsRef.current.onAccept) {
          propsRef.current.onAccept(acceptedFiles);
        }

        for (const file of acceptedFiles) {
          propsRef.current.onFileAccept?.(file);
        }

        if (propsRef.current.onUpload) {
          requestAnimationFrame(() => {
            void onFilesUpload(acceptedFiles);
          });
        }
      }
    },
    [store, isControlled, propsRef, onFilesUpload, maxFiles, acceptTypes, maxSize, disabled]
  );

  const onInputChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const changedFiles = Array.from(event.target.files ?? []);
      onFilesChange(changedFiles);
      event.target.value = "";
    },
    [onFilesChange]
  );

  const contextValue = React.useMemo(
    () => ({
      dir,
      disabled,
      dropzoneId,
      inputId,
      inputRef,
      labelId,
      listId,
      urlCache
    }),
    [dropzoneId, inputId, listId, labelId, dir, disabled, urlCache]
  );

  const RootPrimitive = asChild ? SlotPrimitive.Slot : "div";

  return (
    <FileUploadStoreContext.Provider value={store}>
      <FileUploadContext.Provider value={contextValue}>
        <RootPrimitive
          data-disabled={disabled ? "" : undefined}
          data-slot="file-upload"
          dir={dir}
          {...rootProps}
          className={cn("relative flex flex-col gap-2", className)}
        >
          {children}
          <input
            accept={accept}
            aria-describedby={dropzoneId}
            aria-labelledby={labelId}
            className="sr-only"
            disabled={disabled}
            id={inputId}
            multiple={multiple}
            name={name}
            onChange={onInputChange}
            ref={inputRef}
            required={required}
            tabIndex={-1}
            type="file"
          />
          <div className="sr-only" id={labelId}>
            {label ?? "File upload"}
          </div>
        </RootPrimitive>
      </FileUploadContext.Provider>
    </FileUploadStoreContext.Provider>
  );
}
