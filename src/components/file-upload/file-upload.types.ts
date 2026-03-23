import { type VariantProps } from "class-variance-authority";

import { type fileUploadListVariants } from "./file-upload.styles";

export type Direction = "ltr" | "rtl";

export type FileState = {
  file: File;
  progress: number;
  error?: string;
  status: "idle" | "uploading" | "error" | "success";
};

type FileUploadListCvaProps = VariantProps<typeof fileUploadListVariants>;
export type FileUploadListOrientationType = NonNullable<FileUploadListCvaProps["orientation"]>;
