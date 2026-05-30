# Sortable

**Category:** Misc · **Public:** yes · **Stories:** 3

## Import
```ts
import { Sortable } from "@szum-tech/design-system";
```

## Props
| Prop | Type | Required | Default |
|---|---|---|---|
| `value` | `T[]` | yes | — |
| `onValueChange` | `(value: T[]) => void` | yes | — |
| `getItemValue` | `(item: T) => string` | yes | — |
| `children` | `React.ReactNode` | yes | — |
| `onMove` | `(event: { event: DragEndEvent; activeIndex: number; overIndex: number }) => void` | no | — |
| `strategy` | `"horizontal" \| "vertical" \| "grid"` | no | — |
| `onDragStart` | `(event: DragStartEvent) => void` | no | — |
| `onDragEnd` | `(event: DragEndEvent) => void` | no | — |
| `modifiers` | `Modifiers` | no | — |
| `asChild` | `boolean` | no | — |

## Examples
### List
```tsx
<div className="mx-auto w-full max-w-xl space-y-8 p-6">
  <Sortable
    value={items}
    onValueChange={handleValueChange}
    getItemValue={getItemValue}
    strategy="vertical"
    className="space-y-2"
  >
    {items.map((item) => (
      <SortableItem key={item.id} value={item.id}>
        <div className="bg-background flex items-center gap-3 rounded border p-3 transition-colors">
          <SortableItemHandle className="text-muted-foreground hover:text-foreground">
            <GripVerticalIcon className="size-4" />
          </SortableItemHandle>
          <div className="text-muted-foreground flex items-center gap-2">{getTypeIcon(item.type)}</div>
          <div className="min-w-0 flex-1">
            <h4 className="truncate text-sm font-medium">{item.title}</h4>
            <p className="text-muted-foreground truncate text-xs">{item.description}</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={getTypeColor(item.type)}>{item.type}</Badge>
            <span className="text-muted-foreground text-xs">{item.size}</span>
          </div>
        </div>
      </SortableItem>
    ))}
  </Sortable>
</div>
```

### Grid
```tsx
<div className="mx-auto w-full max-w-2xl space-y-6 p-4">
  <Sortable
    value={items}
    onValueChange={handleValueChange}
    getItemValue={getItemValue}
    strategy="grid"
    className="grid auto-rows-fr grid-cols-3 gap-3"
  >
    {items.map((item) => (
      <SortableItem key={item.id} value={item.id}>
        <div
          className={cn(
            "group bg-background hover:bg-accent/50 relative cursor-pointer rounded-md border p-3 transition-colors",
            getItemSize(item.type),
            "flex min-h-25 flex-col"
          )}
          onClick={() => {}}
        >
          <SortableItemHandle className="text-muted-foreground hover:text-foreground absolute inset-e-1.5 top-2.5 z-10 opacity-0 transition-opacity group-hover:opacity-100">
            <GripVerticalIcon className="h-3.5 w-3.5" />
          </SortableItemHandle>
          <div className="min-w-0 flex-1">
            <h4 className="truncate text-sm font-medium">{item.title}</h4>
            <p className="text-muted-foreground mt-0.5 truncate text-xs">{item.description}</p>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <Badge variant={getTypeColor(item.type)}>{item.type}</Badge>
          </div>
        </div>
      </SortableItem>
    ))}
  </Sortable>
</div>
```

### Nested
```tsx
<div className="mx-auto w-full max-w-sm space-y-6 p-6">
  <Sortable
    value={optionGroups}
    onValueChange={handleParentReorder}
    getItemValue={getParentValue}
    strategy="vertical"
    className="space-y-4"
  >
    {optionGroups.map((group) => (
      <SortableItem key={group.id} value={group.id}>
        <Card className="p-2">
          <CardContent className="p-0">
            {/* Group Header */}
            <div className="mb-2 flex items-center gap-2">
              <SortableItemHandle className="text-muted-foreground hover:text-foreground cursor-grab">
                <GripVerticalIcon className="h-4 w-4" />
              </SortableItemHandle>
              <h3 className="text-sm font-semibold">{group.name}</h3>
            </div>
            {/* Option Values - Child Level */}
            <Sortable
              value={group.values}
              onValueChange={(newValues) => handleChildReorder(group.id, newValues)}
              getItemValue={getChildValue}
              strategy="vertical"
              className="space-y-2"
            >
              {group.values.map((value) => (
                <SortableItem key={value.id} value={value.id}>
                  <div className="border-border flex items-center gap-2 rounded-md border p-1.5">
                    <SortableItemHandle className="text-muted-foreground hover:text-foreground cursor-grab">
                      <GripVerticalIcon className="h-4 w-4" />
                    </SortableItemHandle>
                    <span className="flex-1 text-sm">{value.value}</span>
                  </div>
                </SortableItem>
              ))}
            </Sortable>
          </CardContent>
        </Card>
      </SortableItem>
    ))}
  </Sortable>
</div>
```

## Notes
- Supports `asChild` (polymorphic via Radix `Slot`).
