import * as React from "react";

import { Upload, UploadIcon, XIcon } from "lucide-react";
import { expect, fn } from "storybook/test";
import { Button } from "~/components/button";
import { Toaster, toast } from "~/components/toaster";

import {
  FileUpload,
  FileUploadClear,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadItemProgress,
  FileUploadList,
  FileUploadProps,
  FileUploadTrigger,
  useFileUploadStore
} from ".";

import preview from "~/.storybook/preview";

const meta = preview.meta({
  title: "Components/File Upload",
  component: FileUpload,
  tags: ["autodocs"],
  parameters: {
    docs: {
      subtitle:
        "A composable file upload component with drag-and-drop, file validation, upload progress, and accessible sub-components."
    }
  },
  argTypes: {
    accept: { control: "text" },
    maxFiles: { control: "number" },
    maxSize: { control: "number" },
    disabled: { control: "boolean" },
    invalid: { control: "boolean" },
    multiple: { control: "boolean" },
    required: { control: "boolean" },
    onValueChange: { control: false },
    onAccept: { control: false },
    onFileAccept: { control: false },
    onFileReject: { control: false },
    onFileValidate: { control: false },
    onUpload: { control: false }
  },
  args: {
    onValueChange: fn(),
    onAccept: fn(),
    onFileAccept: fn(),
    onFileReject: fn()
  }
});

export default meta;

// ─── Shared inner components ─────────────────────────────────────────────────

function DefaultFileList() {
  const files = useFileUploadStore((state) => Array.from(state.files.values()));

  return (
    <FileUploadList>
      {files.map(({ file }) => (
        <FileUploadItem key={file.name} value={file}>
          <FileUploadItemPreview />
          <FileUploadItemMetadata />
          <FileUploadItemProgress />
          <FileUploadItemDelete asChild>
            <Button variant="ghost" size="icon-sm" aria-label={`Remove ${file.name}`}>
              ✕
            </Button>
          </FileUploadItemDelete>
        </FileUploadItem>
      ))}
    </FileUploadList>
  );
}

// ─── Basic Dropzone ──────────────────────────────────────────────────────────

export const BasicDropzone = meta.story({
  name: "Basic Dropzone",
  args: {
    multiple: true
  },
  render(args) {
    return (
      <FileUpload
        multiple={args.multiple}
        disabled={args.disabled}
        onValueChange={args.onValueChange}
        onAccept={args.onAccept}
        onFileAccept={args.onFileAccept}
        onFileReject={args.onFileReject}
        className="w-full max-w-md"
      >
        <FileUploadDropzone>
          <div className="flex flex-col items-center gap-1 text-center">
            <p className="text-sm font-medium">Drop files here or click to browse</p>
            <p className="text-muted-foreground text-xs">Any file type accepted</p>
          </div>
        </FileUploadDropzone>
        <DefaultFileList />
        <FileUploadClear asChild>
          <Button variant="outline" size="sm">
            Clear all
          </Button>
        </FileUploadClear>
      </FileUpload>
    );
  }
});

BasicDropzone.test("renders dropzone region", async ({ canvasElement }) => {
  const dropzone = canvasElement.querySelector('[data-slot="file-upload-dropzone"]')!;
  await expect(dropzone).toBeVisible();
});

BasicDropzone.test("dropzone contains instructional text", async ({ canvas }) => {
  const text = canvas.getByText(/drop files here/i);
  await expect(text).toBeVisible();
});

// ─── With Progress ───────────────────────────────────────────────────────────

function ProgressFileList() {
  const files = useFileUploadStore((state) => Array.from(state.files.values()));

  return (
    <FileUploadList>
      {files.map(({ file }) => (
        <FileUploadItem key={file.name} value={file}>
          <FileUploadItemPreview />
          <div className="flex min-w-0 flex-1 flex-col gap-1.5">
            <FileUploadItemMetadata />
            <FileUploadItemProgress variant="linear" />
          </div>
          <FileUploadItemDelete asChild>
            <Button variant="ghost" size="icon-sm" aria-label={`Remove ${file.name}`}>
              ✕
            </Button>
          </FileUploadItemDelete>
        </FileUploadItem>
      ))}
    </FileUploadList>
  );
}

export const WithProgress = meta.story({
  render() {
    const onUpload = React.useCallback(
      async (
        files: File[],
        {
          onProgress,
          onSuccess
        }: {
          onProgress: (file: File, progress: number) => void;
          onSuccess: (file: File) => void;
          onError: (file: File, error: Error) => void;
        }
      ) => {
        for (const file of files) {
          await new Promise<void>((resolve) => {
            let progress = 0;
            const interval = setInterval(() => {
              progress += 20;
              onProgress(file, progress);
              if (progress >= 100) {
                clearInterval(interval);
                onSuccess(file);
                resolve();
              }
            }, 200);
          });
        }
      },
      []
    );

    return (
      <FileUpload multiple onUpload={onUpload} className="w-full max-w-md">
        <FileUploadDropzone>
          <div className="flex flex-col items-center gap-1 text-center">
            <p className="text-sm font-medium">Drop files to start uploading</p>
            <p className="text-muted-foreground text-xs">Progress will animate automatically</p>
          </div>
        </FileUploadDropzone>
        <ProgressFileList />
      </FileUpload>
    );
  }
});

WithProgress.test("renders dropzone", async ({ canvasElement }) => {
  const dropzone = canvasElement.querySelector('[data-slot="file-upload-dropzone"]')!;
  await expect(dropzone).toBeVisible();
});

// ─── Logo Upload ─────────────────────────────────────────────────────────────

function LogoUploadInner() {
  const files = useFileUploadStore((state) => Array.from(state.files.values()));
  const currentFile = files[0];

  if (currentFile) {
    return (
      <FileUploadList>
        <FileUploadItem value={currentFile.file} className="relative size-24 overflow-hidden rounded border-0 p-0">
          <FileUploadItemPreview className="size-full rounded border-0" />
          <FileUploadItemProgress variant="circular" size={96} />
          <FileUploadItemDelete asChild>
            <button
              className="bg-background/80 absolute right-0 bottom-0 flex size-6 items-center justify-center rounded border text-xs"
              aria-label="Remove logo"
            >
              ✕
            </button>
          </FileUploadItemDelete>
        </FileUploadItem>
      </FileUploadList>
    );
  }

  return (
    <FileUploadDropzone className="size-24 rounded p-0">
      <div className="flex flex-col items-center gap-0.5 text-center">
        <p className="text-muted-foreground text-xs">Logo</p>
      </div>
    </FileUploadDropzone>
  );
}

export const LogoUpload = meta.story({
  name: "Logo Upload",
  render(args) {
    return (
      <FileUpload accept="image/*" maxFiles={1} onFileReject={args.onFileReject} className="items-center">
        <LogoUploadInner />
        <FileUploadTrigger asChild>
          <Button variant="outline" size="sm">
            Upload Logo
          </Button>
        </FileUploadTrigger>
      </FileUpload>
    );
  }
});

LogoUpload.test("renders upload trigger button", async ({ canvas }) => {
  const trigger = canvas.getByRole("button", { name: /upload logo/i });
  await expect(trigger).toBeVisible();
});

LogoUpload.test("renders dropzone placeholder", async ({ canvasElement }) => {
  const dropzone = canvasElement.querySelector('[data-slot="file-upload-dropzone"]')!;
  await expect(dropzone).toBeVisible();
});

// ─── Multiple Files ───────────────────────────────────────────────────────────

function MultipleFileList() {
  const files = useFileUploadStore((state) => Array.from(state.files.values()));

  return (
    <FileUploadList orientation="vertical">
      {files.map(({ file }) => (
        <FileUploadItem key={file.name} value={file}>
          <FileUploadItemPreview />
          <FileUploadItemMetadata />
          <FileUploadItemDelete asChild>
            <Button variant="ghost" size="icon-sm" aria-label={`Remove ${file.name}`}>
              ✕
            </Button>
          </FileUploadItemDelete>
        </FileUploadItem>
      ))}
    </FileUploadList>
  );
}

export const MultipleFiles = meta.story({
  name: "Multiple Files",
  render(args) {
    return (
      <FileUpload
        multiple
        maxFiles={3}
        onFileReject={args.onFileReject}
        onValueChange={args.onValueChange}
        className="w-full max-w-md"
      >
        <FileUploadDropzone>
          <div className="flex flex-col items-center gap-1 text-center">
            <p className="text-sm font-medium">Upload up to 3 files</p>
            <p className="text-muted-foreground text-xs">4th file will be rejected</p>
          </div>
        </FileUploadDropzone>
        <MultipleFileList />
        <FileUploadClear asChild>
          <Button variant="outline" size="sm">
            Clear all
          </Button>
        </FileUploadClear>
      </FileUpload>
    );
  }
});

MultipleFiles.test("renders dropzone with max-files label", async ({ canvas }) => {
  const text = canvas.getByText(/upload up to 3 files/i);
  await expect(text).toBeVisible();
});

// ─── Controlled State ─────────────────────────────────────────────────────────

function ControlledFileList({ files }: { files: File[] }) {
  const storeFiles = useFileUploadStore((state) => Array.from(state.files.values()));

  return (
    <>
      <FileUploadList>
        {storeFiles.map(({ file }) => (
          <FileUploadItem key={file.name} value={file}>
            <FileUploadItemPreview />
            <FileUploadItemMetadata />
            <FileUploadItemDelete asChild>
              <Button variant="ghost" size="icon-sm" aria-label={`Remove ${file.name}`}>
                ✕
              </Button>
            </FileUploadItemDelete>
          </FileUploadItem>
        ))}
      </FileUploadList>
      <div className="text-muted-foreground text-sm">
        <span className="text-foreground font-medium">Files in state:</span>{" "}
        {files.length === 0 ? "none" : files.map((f) => f.name).join(", ")}
      </div>
    </>
  );
}

export const ControlledState = meta.story({
  name: "Controlled State",
  render() {
    const [files, setFiles] = React.useState<File[]>([]);

    return (
      <div className="flex w-full max-w-md flex-col gap-4">
        <FileUpload multiple value={files} onValueChange={setFiles} className="w-full">
          <FileUploadDropzone>
            <div className="flex flex-col items-center gap-1 text-center">
              <p className="text-sm font-medium">Controlled file upload</p>
              <p className="text-muted-foreground text-xs">State managed externally</p>
            </div>
          </FileUploadDropzone>
          <ControlledFileList files={files} />
        </FileUpload>

        {files.length > 0 && (
          <Button variant="outline" size="sm" onClick={() => setFiles([])}>
            Reset state
          </Button>
        )}
      </div>
    );
  }
});

ControlledState.test("renders controlled dropzone", async ({ canvas }) => {
  const text = canvas.getByText(/controlled file upload/i);
  await expect(text).toBeVisible();
});

ControlledState.test("shows no files initially", async ({ canvas }) => {
  const label = canvas.getByText(/files in state:/i);
  await expect(label).toBeVisible();
});

export const WithValidation = meta.story({
  render() {
    const [files, setFiles] = React.useState<File[]>([]);

    const onFileValidate = React.useCallback(
      (file: File): string | null => {
        // Validate max files
        if (files.length >= 2) {
          return "You can only upload up to 2 files";
        }

        // Validate file type (only images)
        if (!file.type.startsWith("image/")) {
          return "Only image files are allowed";
        }

        // Validate file size (max 2MB)
        const MAX_SIZE = 2 * 1024 * 1024; // 2MB
        if (file.size > MAX_SIZE) {
          return `File size must be less than ${MAX_SIZE / (1024 * 1024)}MB`;
        }

        return null;
      },
      [files]
    );

    const onFileReject = React.useCallback((file: File, message: string) => {
      window.alert(message);
    }, []);

    return (
      <FileUpload
        value={files}
        onValueChange={setFiles}
        onFileValidate={onFileValidate}
        onFileReject={onFileReject}
        accept="image/*"
        maxFiles={2}
        className="w-full max-w-md"
        multiple
      >
        <FileUploadDropzone>
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center justify-center rounded-full border p-2.5">
              <Upload className="text-muted-foreground size-6" />
            </div>
            <p className="text-sm font-medium">Drag & drop files here</p>
            <p className="text-muted-foreground text-xs">Or click to browse (max 2 files)</p>
          </div>
          <FileUploadTrigger asChild>
            <Button variant="outline" size="sm" className="mt-2 w-fit">
              Browse files
            </Button>
          </FileUploadTrigger>
        </FileUploadDropzone>
        <FileUploadList>
          {files.map((file) => (
            <FileUploadItem key={file.name} value={file}>
              <FileUploadItemPreview />
              <FileUploadItemMetadata />
              <FileUploadItemDelete asChild>
                <Button variant="ghost" size="icon" className="size-7">
                  <XIcon />
                </Button>
              </FileUploadItemDelete>
            </FileUploadItem>
          ))}
        </FileUploadList>
      </FileUpload>
    );
  }
});

export const DirectUpload = meta.story({
  render() {
    const [files, setFiles] = React.useState<File[]>([]);

    const onUpload: NonNullable<FileUploadProps["onUpload"]> = React.useCallback(
      async (files, { onProgress, onSuccess, onError }) => {
        try {
          // Process each file individually
          const uploadPromises = files.map(async (file) => {
            try {
              // Simulate file upload with progress
              const totalChunks = 10;
              let uploadedChunks = 0;

              // Simulate chunk upload with delays
              for (let i = 0; i < totalChunks; i++) {
                // Simulate network delay (100-300ms per chunk)
                await new Promise((resolve) => setTimeout(resolve, Math.random() * 200 + 100));

                // Update progress for this specific file
                uploadedChunks++;
                const progress = (uploadedChunks / totalChunks) * 100;
                onProgress(file, progress);
              }

              // Simulate server processing delay
              await new Promise((resolve) => setTimeout(resolve, 500));
              onSuccess(file);
            } catch (error) {
              onError(file, error instanceof Error ? error : new Error("Upload failed"));
            }
          });

          // Wait for all uploads to complete
          await Promise.all(uploadPromises);
        } catch (error) {
          // This handles any error that might occur outside the individual upload processes
          console.error("Unexpected error during upload:", error);
        }
      },
      []
    );

    const onFileReject = React.useCallback((file: File, message: string) => {
      window.alert(message);
    }, []);

    return (
      <FileUpload
        value={files}
        onValueChange={setFiles}
        onUpload={onUpload}
        onFileReject={onFileReject}
        maxFiles={2}
        className="w-full max-w-md"
        multiple
      >
        <FileUploadDropzone>
          <div className="flex flex-col items-center gap-1 text-center">
            <div className="flex items-center justify-center rounded-full border p-2.5">
              <UploadIcon className="text-muted-foreground size-6" />
            </div>
            <p className="text-sm font-medium">Drag & drop files here</p>
            <p className="text-muted-foreground text-xs">Or click to browse (max 2 files)</p>
          </div>
          <FileUploadTrigger asChild>
            <Button variant="outline" size="sm" className="mt-2 w-fit">
              Browse files
            </Button>
          </FileUploadTrigger>
        </FileUploadDropzone>
        <FileUploadList>
          {files.map((file, index) => (
            <FileUploadItem key={index} value={file} className="flex-col">
              <div className="flex w-full items-center gap-2">
                <FileUploadItemPreview />
                <FileUploadItemMetadata />
                <FileUploadItemDelete asChild>
                  <Button variant="ghost" size="icon" className="size-7">
                    <XIcon />
                  </Button>
                </FileUploadItemDelete>
              </div>
              <FileUploadItemProgress />
            </FileUploadItem>
          ))}
        </FileUploadList>
      </FileUpload>
    );
  }
});

export const CircularProgress = meta.story({
  render() {
    const [files, setFiles] = React.useState<File[]>([]);

    const onUpload = React.useCallback(
      async (
        files: File[],
        {
          onProgress,
          onSuccess,
          onError
        }: {
          onProgress: (file: File, progress: number) => void;
          onSuccess: (file: File) => void;
          onError: (file: File, error: Error) => void;
        }
      ) => {
        try {
          // Process each file individually
          const uploadPromises = files.map(async (file) => {
            try {
              // Simulate file upload with progress
              const totalChunks = 10;
              let uploadedChunks = 0;

              // Simulate chunk upload with delays
              for (let i = 0; i < totalChunks; i++) {
                // Simulate network delay (100-300ms per chunk)
                await new Promise((resolve) => setTimeout(resolve, Math.random() * 200 + 100));

                // Update progress for this specific file
                uploadedChunks++;
                const progress = (uploadedChunks / totalChunks) * 100;
                onProgress(file, progress);
              }

              // Simulate server processing delay
              await new Promise((resolve) => setTimeout(resolve, 500));
              onSuccess(file);
            } catch (error) {
              onError(file, error instanceof Error ? error : new Error("Upload failed"));
            }
          });

          // Wait for all uploads to complete
          await Promise.all(uploadPromises);
        } catch (error) {
          // This handles any error that might occur outside the individual upload processes
          console.error("Unexpected error during upload:", error);
        }
      },
      []
    );

    const onFileReject = React.useCallback((file: File, message: string) => {
      toast(message, {
        description: `"${file.name.length > 20 ? `${file.name.slice(0, 20)}...` : file.name}" has been rejected`
      });
    }, []);

    return (
      <>
        <FileUpload
          value={files}
          onValueChange={setFiles}
          maxFiles={10}
          maxSize={5 * 1024 * 1024}
          className="w-full max-w-md"
          onUpload={onUpload}
          onFileReject={onFileReject}
          multiple
        >
          <FileUploadDropzone>
            <div className="flex flex-col items-center gap-1 text-center">
              <div className="flex items-center justify-center rounded-full border p-2.5">
                <UploadIcon className="text-muted-foreground size-6" />
              </div>
              <p className="text-sm font-medium">Drag & drop files here</p>
              <p className="text-muted-foreground text-xs">Or click to browse (max 10 files, up to 5MB each)</p>
            </div>
            <FileUploadTrigger asChild>
              <Button variant="outline" size="sm" className="mt-2 w-fit">
                Browse files
              </Button>
            </FileUploadTrigger>
          </FileUploadDropzone>
          <FileUploadList orientation="horizontal">
            {files.map((file, index) => (
              <FileUploadItem key={index} value={file} className="p-0">
                <FileUploadItemPreview className="size-20 [&>svg]:size-12">
                  <FileUploadItemProgress variant="circular" size={40} />
                </FileUploadItemPreview>
                <FileUploadItemMetadata className="sr-only" />
                <FileUploadItemDelete asChild>
                  <Button variant="secondary" size="icon" className="absolute -top-1 -right-1 size-5 rounded-full">
                    <XIcon className="size-3" />
                  </Button>
                </FileUploadItemDelete>
              </FileUploadItem>
            ))}
          </FileUploadList>
        </FileUpload>
        <Toaster />
      </>
    );
  }
});

export const FillProgress = meta.story({
  render() {
    const [files, setFiles] = React.useState<File[]>([]);

    const onUpload = React.useCallback(
      async (
        files: File[],
        {
          onProgress,
          onSuccess,
          onError
        }: {
          onProgress: (file: File, progress: number) => void;
          onSuccess: (file: File) => void;
          onError: (file: File, error: Error) => void;
        }
      ) => {
        try {
          // Process each file individually
          const uploadPromises = files.map(async (file) => {
            try {
              // Simulate file upload with progress
              const totalChunks = 10;
              let uploadedChunks = 0;

              // Simulate chunk upload with delays
              for (let i = 0; i < totalChunks; i++) {
                // Simulate network delay (100-300ms per chunk)
                await new Promise((resolve) => setTimeout(resolve, Math.random() * 200 + 100));

                // Update progress for this specific file
                uploadedChunks++;
                const progress = (uploadedChunks / totalChunks) * 100;
                onProgress(file, progress);
              }

              // Simulate server processing delay
              await new Promise((resolve) => setTimeout(resolve, 500));
              onSuccess(file);
            } catch (error) {
              onError(file, error instanceof Error ? error : new Error("Upload failed"));
            }
          });

          // Wait for all uploads to complete
          await Promise.all(uploadPromises);
        } catch (error) {
          // This handles any error that might occur outside the individual upload processes
          console.error("Unexpected error during upload:", error);
        }
      },
      []
    );

    const onFileReject = React.useCallback((file: File, message: string) => {
      toast(message, {
        description: `"${file.name.length > 20 ? `${file.name.slice(0, 20)}...` : file.name}" has been rejected`
      });
    }, []);

    return (
      <>
        <FileUpload
          value={files}
          onValueChange={setFiles}
          maxFiles={10}
          maxSize={5 * 1024 * 1024}
          className="w-full max-w-md"
          onUpload={onUpload}
          onFileReject={onFileReject}
          multiple
        >
          <FileUploadDropzone>
            <div className="flex flex-col items-center gap-1 text-center">
              <div className="flex items-center justify-center rounded-full border p-2.5">
                <UploadIcon className="text-muted-foreground size-6" />
              </div>
              <p className="text-sm font-medium">Drag & drop files here</p>
              <p className="text-muted-foreground text-xs">Or click to browse (max 10 files, up to 5MB each)</p>
            </div>
            <FileUploadTrigger asChild>
              <Button variant="outline" size="sm" className="mt-2 w-fit">
                Browse files
              </Button>
            </FileUploadTrigger>
          </FileUploadDropzone>
          <FileUploadList orientation="horizontal">
            {files.map((file, index) => (
              <FileUploadItem key={index} value={file} className="p-0">
                <FileUploadItemPreview className="size-20">
                  <FileUploadItemProgress variant="fill" />
                </FileUploadItemPreview>
                <FileUploadItemMetadata className="sr-only" />
                <FileUploadItemDelete asChild>
                  <Button variant="secondary" size="icon" className="absolute -top-1 -right-1 size-5 rounded-full">
                    <XIcon className="size-3" />
                  </Button>
                </FileUploadItemDelete>
              </FileUploadItem>
            ))}
          </FileUploadList>
        </FileUpload>
        <Toaster />
      </>
    );
  }
});
