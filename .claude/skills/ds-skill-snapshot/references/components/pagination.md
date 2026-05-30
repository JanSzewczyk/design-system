# Pagination

**Category:** Misc · **Public:** yes · **Stories:** 4

## Import
```ts
import { Pagination } from "@szum-tech/design-system";
```

## Examples
### Pagination Story
```tsx
<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#" isActive>
        2
      </PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">3</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>
```

### Simple
```tsx
<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationLink href="#">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#" isActive>
        2
      </PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">3</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">4</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">5</PaginationLink>
    </PaginationItem>
  </PaginationContent>
</Pagination>
```

### Icons Only
```tsx
<div className="flex items-center justify-between gap-4">
  <Field orientation="horizontal" className="w-fit">
    <FieldLabel htmlFor="select-rows-per-page">Rows per page</FieldLabel>
    <Select defaultValue="25" className="w-20" id="select-rows-per-page">
      <SelectContent align="start">
        <SelectGroup>
          <SelectItem value="10">10</SelectItem>
          <SelectItem value="25">25</SelectItem>
          <SelectItem value="50">50</SelectItem>
          <SelectItem value="100">100</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  </Field>
  <Pagination className="mx-0 w-auto">
    <PaginationContent>
      <PaginationItem>
        <PaginationPrevious href="#" />
      </PaginationItem>
      <PaginationItem>
        <PaginationNext href="#" />
      </PaginationItem>
    </PaginationContent>
  </Pagination>
</div>
```

### As Child Button
```tsx
<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationLink asChild>
        <button type="button">1</button>
      </PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink asChild isActive>
        <button type="button">2</button>
      </PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink asChild>
        <button type="button">3</button>
      </PaginationLink>
    </PaginationItem>
  </PaginationContent>
</Pagination>
```
