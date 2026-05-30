# FileUpload

**Category:** Misc · **Public:** yes · **Stories:** 9

## Import
```ts
import { FileUpload } from "@szum-tech/design-system";
```

## Props
| Prop | Type | Required | Default |
|---|---|---|---|
| `value` | `File[]` | no | — |
| `defaultValue` | `File[]` | no | — |
| `onValueChange` | `(files: File[]) => void` | no | — |
| `onAccept` | `(files: File[]) => void` | no | — |
| `onFileAccept` | `(file: File) => void` | no | — |
| `onFileReject` | `(file: File, message: string) => void` | no | — |
| `onFileValidate` | `(file: File) => string \| null \| undefined` | no | — |
| `onUpload` | `(files: File[], options: FileUploadUploadOptions) => Promise<void> \| void` | no | — |
| `accept` | `string` | no | — |
| `maxFiles` | `number` | no | — |
| `maxSize` | `number` | no | — |
| `dir` | `Direction` | no | — |
| `label` | `string` | no | — |
| `name` | `string` | no | — |
| `asChild` | `boolean` | no | — |
| `disabled` | `boolean` | no | — |
| `invalid` | `boolean` | no | — |
| `multiple` | `boolean` | no | — |
| `required` | `boolean` | no | — |

## Variants
- **orientation**: **vertical** (default), horizontal

## Examples
### Basic Dropzone
```tsx
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
```

### With Progress
```tsx
<FileUpload multiple onUpload={onUpload} className="w-full max-w-md">
  <FileUploadDropzone>
    <div className="flex flex-col items-center gap-1 text-center">
      <p className="text-sm font-medium">Drop files to start uploading</p>
      <p className="text-muted-foreground text-xs">Progress will animate automatically</p>
    </div>
  </FileUploadDropzone>
  <ProgressFileList />
</FileUpload>
```

### Logo Upload
```tsx
<FileUpload accept="image/*" maxFiles={1} onFileReject={args.onFileReject} className="items-center">
  <LogoUploadInner />
  <FileUploadTrigger asChild>
    <Button variant="outline" size="sm">
      Upload Logo
    </Button>
  </FileUploadTrigger>
</FileUpload>
```

### Multiple Files
```tsx
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
```

### Controlled State
```tsx
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
```

### With Validation
```tsx
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
```

### Direct Upload
```tsx
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
```

### Circular Progress
```tsx
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
```

### Fill Progress
```tsx
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
```

## Notes
- Supports `asChild` (polymorphic via Radix `Slot`).
