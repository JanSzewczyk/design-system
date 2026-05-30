# Masonry

**Category:** Misc · **Public:** yes · **Stories:** 10

## Import
```ts
import { Masonry } from "@szum-tech/design-system";
```

## Props
| Prop | Type | Required | Default |
|---|---|---|---|
| `columnWidth` | `number` | no | 200 |
| `columnCount` | `number` | no | — |
| `maxColumnCount` | `number` | no | — |
| `gap` | `number \| { column: number; row: number }` | no | 16 |
| `itemHeight` | `number` | no | 300 |
| `defaultWidth` | `number` | no | — |
| `defaultHeight` | `number` | no | — |
| `overscan` | `number` | no | 200 |
| `scrollFps` | `number` | no | 12 |
| `fallback` | `React.ReactNode` | no | — |
| `linear` | `boolean` | no | false |
| `asChild` | `boolean` | no | false |

## Examples
### Basic
```tsx
<Masonry>
  {items.map((item) => (
    <MasonryItem key={item.id}>
      <div
        style={{
          height: `${item.height}px`,
          backgroundColor: item.color,
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontWeight: "bold",
          fontSize: "24px"
        }}
      >
        {item.id + 1}
      </div>
    </MasonryItem>
  ))}
</Masonry>
```

### Custom Column Width
```tsx
<Masonry columnWidth={150}>
  {items.map((item) => (
    <MasonryItem key={item.id}>
      <div
        style={{
          height: `${item.height}px`,
          backgroundColor: item.color,
          borderRadius: "8px",
          padding: "16px"
        }}
      >
        <h3 style={{ margin: 0, color: "white" }}>Item {item.id + 1}</h3>
      </div>
    </MasonryItem>
  ))}
</Masonry>
```

### Fixed Columns
```tsx
<Masonry columnCount={4}>
  {items.map((item) => (
    <MasonryItem key={item.id}>
      <div
        style={{
          height: `${item.height}px`,
          backgroundColor: item.color,
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontWeight: "bold",
          fontSize: "18px"
        }}
      >
        Item {item.id + 1}
      </div>
    </MasonryItem>
  ))}
</Masonry>
```

### With Custom Gap
```tsx
<Masonry gap={{ column: 24, row: 32 }}>
  {items.map((item) => (
    <MasonryItem key={item.id}>
      <div
        style={{
          height: `${item.height}px`,
          backgroundColor: item.color,
          borderRadius: "12px",
          padding: "16px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
        }}
      >
        <div style={{ color: "white", fontWeight: "bold" }}>Item {item.id + 1}</div>
      </div>
    </MasonryItem>
  ))}
</Masonry>
```

### Linear Mode
```tsx
<Masonry linear columnCount={3}>
  {items.map((item) => (
    <MasonryItem key={item.id}>
      <div
        style={{
          height: `${item.height}px`,
          backgroundColor: item.color,
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontWeight: "bold",
          fontSize: "20px"
        }}
      >
        {item.id + 1}
      </div>
    </MasonryItem>
  ))}
</Masonry>
```

### Image Gallery
```tsx
<Masonry columnWidth={200} gap={12}>
  {images.map((img) => (
    <MasonryItem key={img.id}>
      <img
        src={`https://picsum.photos/seed/${img.id}/${img.width}/${img.height}`}
        alt={`Gallery item ${img.id + 1}`}
        style={{
          width: "100%",
          height: "auto",
          display: "block",
          borderRadius: "8px"
        }}
      />
    </MasonryItem>
  ))}
</Masonry>
```

### With Max Columns
```tsx
<Masonry columnWidth={180} maxColumnCount={5} gap={16}>
  {items.map((item) => (
    <MasonryItem key={item.id}>
      <div
        style={{
          height: `${item.height}px`,
          backgroundColor: item.color,
          borderRadius: "8px",
          padding: "16px"
        }}
      >
        <h4 style={{ margin: 0, color: "white" }}>Card {item.id + 1}</h4>
        <p style={{ margin: "8px 0 0", color: "rgba(255,255,255,0.8)", fontSize: "14px" }}>
          This is a sample card content
        </p>
      </div>
    </MasonryItem>
  ))}
</Masonry>
```

### Large Dataset
```tsx
<Masonry columnWidth={180} gap={16} overscan={400}>
  {items.map((item) => (
    <MasonryItem key={item.id}>
      <div
        style={{
          height: `${item.height}px`,
          backgroundColor: item.color,
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontWeight: "bold",
          padding: "16px"
        }}
      >
        <div style={{ fontSize: "32px" }}>{item.id + 1}</div>
        <div style={{ fontSize: "12px", opacity: 0.8 }}>Height: {item.height}px</div>
      </div>
    </MasonryItem>
  ))}
</Masonry>
```

### With Fallback
```tsx
<Masonry
  fallback={
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "400px",
        fontSize: "18px",
        color: "#666"
      }}
    >
      Loading items...
    </div>
  }
>
  {loading
    ? null
    : items.map((item) => (
        <MasonryItem key={item.id}>
          <div
            style={{
              height: `${item.height}px`,
              backgroundColor: item.color,
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontWeight: "bold",
              fontSize: "24px"
            }}
          >
            {item.id + 1}
          </div>
        </MasonryItem>
      ))}
</Masonry>
```

### Responsive
```tsx
<Masonry columnWidth={220} maxColumnCount={6} gap={20}>
  {items.map((item) => (
    <MasonryItem key={item.id}>
      <div
        style={{
          height: `${item.height}px`,
          backgroundColor: item.color,
          borderRadius: "12px",
          padding: "20px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)"
        }}
      >
        <div style={{ color: "white" }}>
          <div style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "8px" }}>Card {item.id + 1}</div>
          <div style={{ fontSize: "14px", opacity: 0.9 }}>Resize window to see layout adapt</div>
        </div>
      </div>
    </MasonryItem>
  ))}
</Masonry>
```

## Notes
- Supports `asChild` (polymorphic via Radix `Slot`).
