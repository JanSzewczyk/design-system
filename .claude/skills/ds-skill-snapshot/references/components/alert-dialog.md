# AlertDialog

**Category:** Misc · **Public:** yes · **Stories:** 5

## Import
```ts
import { AlertDialog } from "@szum-tech/design-system";
```

## Examples
### Basic Dialog
```tsx
<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="outline">Show Dialog</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your account and remove your data from our
        servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

### Small Dialog
```tsx
<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="outline">Show Small Dialog</Button>
  </AlertDialogTrigger>
  <AlertDialogContent size="sm">
    <AlertDialogHeader>
      <AlertDialogTitle>Allow accessory to connect?</AlertDialogTitle>
      <AlertDialogDescription>
        Do you want to allow the USB accessory to connect to this device?
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Don&apos;t allow</AlertDialogCancel>
      <AlertDialogAction>Allow</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

### With Media
```tsx
<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="outline">Share Project</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogMedia>
        <InfoIcon />
      </AlertDialogMedia>
      <AlertDialogTitle>Share this project?</AlertDialogTitle>
      <AlertDialogDescription>
        Anyone with the link will be able to view and edit this project.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Share</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

### Small With Media
```tsx
<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="outline">Show Small Media Dialog</Button>
  </AlertDialogTrigger>
  <AlertDialogContent size="sm">
    <AlertDialogHeader>
      <AlertDialogMedia>
        <InfoIcon />
      </AlertDialogMedia>
      <AlertDialogTitle>Allow accessory to connect?</AlertDialogTitle>
      <AlertDialogDescription>
        Do you want to allow the USB accessory to connect to this device?
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Don&apos;t allow</AlertDialogCancel>
      <AlertDialogAction>Allow</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

### Destructive Dialog
```tsx
<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="error">Delete Chat</Button>
  </AlertDialogTrigger>
  <AlertDialogContent size="sm">
    <AlertDialogHeader>
      <AlertDialogMedia className="bg-error/10 text-error dark:bg-error/20 dark:text-error">
        <Trash2Icon />
      </AlertDialogMedia>
      <AlertDialogTitle>Delete chat?</AlertDialogTitle>
      <AlertDialogDescription>This will permanently delete this chat conversation.</AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction variant="error">Delete</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```
