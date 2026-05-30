# Avatar

**Category:** Misc · **Public:** yes · **Stories:** 3

## Import
```ts
import { Avatar } from "@szum-tech/design-system";
```

## Examples
### Image
```tsx
<Avatar>
  <AvatarImage src="https://bi.im-g.pl/im/d9/00/13/z19924697AMP,-Mona-Lisa---Leonardo-da-Vinci.jpg" />
  <AvatarFallback>ML</AvatarFallback>
</Avatar>
```

### Fallback
```tsx
<Avatar>
  <AvatarFallback>ML</AvatarFallback>
</Avatar>
```

### Sizes
```tsx
<div className="mb-4 flex flex-row items-center gap-x-4">
  <Avatar className="size-4">
    <AvatarImage src="https://bi.im-g.pl/im/d9/00/13/z19924697AMP,-Mona-Lisa---Leonardo-da-Vinci.jpg" />
    <AvatarFallback>ML</AvatarFallback>
  </Avatar>
  <Avatar>
    <AvatarImage src="https://bi.im-g.pl/im/d9/00/13/z19924697AMP,-Mona-Lisa---Leonardo-da-Vinci.jpg" />
    <AvatarFallback>ML</AvatarFallback>
  </Avatar>
  <Avatar className="size-10">
    <AvatarImage src="https://bi.im-g.pl/im/d9/00/13/z19924697AMP,-Mona-Lisa---Leonardo-da-Vinci.jpg" />
    <AvatarFallback>ML</AvatarFallback>
  </Avatar>
</div>
```
