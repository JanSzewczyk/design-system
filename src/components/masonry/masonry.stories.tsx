import * as React from "react";

import { Masonry, MasonryItem } from ".";

import preview from "~/.storybook/preview";

// Sample data for masonry items
const generateItems = (count: number) =>
  Array.from({ length: count }, (_, i) => ({
    id: i,
    height: Math.floor(Math.random() * 300) + 150,
    color: `hsl(${Math.random() * 360}, 70%, 60%)`
  }));

const meta = preview.meta({
  title: "Components/Masonry",
  component: Masonry,
  subcomponents: { MasonryItem },
  argTypes: {
    columnWidth: {
      control: { type: "number", min: 100, max: 500, step: 50 },
      description: "Width of each column in pixels"
    },
    columnCount: {
      control: { type: "number", min: 1, max: 6, step: 1 },
      description: "Fixed number of columns"
    },
    maxColumnCount: {
      control: { type: "number", min: 1, max: 10, step: 1 },
      description: "Maximum number of columns allowed"
    },
    gap: {
      control: "number",
      description: "Gap between items (px)"
    },
    itemHeight: {
      control: { type: "number", min: 100, max: 500, step: 50 },
      description: "Default height for items before measurement"
    },
    overscan: {
      control: { type: "number", min: 0, max: 500, step: 50 },
      description: "Pixels to render outside visible viewport"
    },
    scrollFps: {
      control: { type: "number", min: 1, max: 60, step: 1 },
      description: "Scroll event sampling rate (fps)"
    },
    linear: {
      control: "boolean",
      description: "Use linear positioning instead of shortest column"
    }
  },
  tags: ["autodocs", "beta"],
  decorators: [
    (Story) => (
      <div style={{ height: "600px", width: "100%", overflow: "auto" }}>
        <Story />
      </div>
    )
  ]
});

/**
 * Basic masonry layout with default settings.
 * Items are arranged in columns with automatic height detection.
 */
export const Basic = meta.story({
  render: () => {
    const items = generateItems(20);

    return (
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
    );
  }
});

/**
 * Masonry with custom column width.
 * Smaller columns allow more items to fit horizontally.
 */
export const CustomColumnWidth = meta.story({
  render: () => {
    const items = generateItems(30);

    return (
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
    );
  }
});

/**
 * Fixed number of columns regardless of container width.
 */
export const FixedColumns = meta.story({
  render: () => {
    const items = generateItems(24);

    return (
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
    );
  }
});

/**
 * Masonry with custom gap spacing.
 * Different gaps for columns and rows.
 */
export const WithCustomGap = meta.story({
  render: () => {
    const items = generateItems(20);

    return (
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
    );
  }
});

/**
 * Linear positioning mode.
 * Items are positioned left-to-right, top-to-bottom instead of filling shortest columns.
 */
export const LinearMode = meta.story({
  render: () => {
    const items = generateItems(20);

    return (
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
    );
  }
});

/**
 * Image gallery example with varying aspect ratios.
 */
export const ImageGallery = meta.story({
  render: () => {
    const images = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      width: 400,
      height: Math.floor(Math.random() * 300) + 200
    }));

    return (
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
    );
  }
});

/**
 * Masonry with maximum column count limit.
 * Prevents too many columns on ultra-wide screens.
 */
export const WithMaxColumns = meta.story({
  render: () => {
    const items = generateItems(30);

    return (
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
    );
  }
});

/**
 * Large dataset with virtualization.
 * Efficiently renders many items by only mounting visible ones.
 */
export const LargeDataset = meta.story({
  render: () => {
    const items = generateItems(100);

    return (
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
    );
  }
});

/**
 * Masonry with loading fallback.
 * Shows spinner while items are being measured.
 */
export const WithFallback = meta.story({
  render: () => {
    const [items, setItems] = React.useState<ReturnType<typeof generateItems>>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
      const timer = setTimeout(() => {
        setItems(generateItems(20));
        setLoading(false);
      }, 2000);

      return () => clearTimeout(timer);
    }, []);

    return (
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
    );
  }
});

/**
 * Responsive masonry that adapts to container width.
 * Try resizing window to see columns adjust.
 */
export const Responsive = meta.story({
  render: () => {
    const items = generateItems(30);

    return (
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
    );
  }
});
