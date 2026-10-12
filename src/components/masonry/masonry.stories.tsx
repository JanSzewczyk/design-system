import * as React from "react";
import preview from "~/.storybook/preview";
import { Masonry, MasonryItem } from ".";

// Sample data for masonry items
const generateItems = (count: number) =>
  Array.from({ length: count }, (_, i) => ({
    color: `hsl(${Math.random() * 360}, 70%, 60%)`,
    height: Math.floor(Math.random() * 300) + 150,
    id: i
  }));

const meta = preview.meta({
  argTypes: {
    columnCount: {
      control: { max: 6, min: 1, step: 1, type: "number" },
      description: "Fixed number of columns"
    },
    columnWidth: {
      control: { max: 500, min: 100, step: 50, type: "number" },
      description: "Width of each column in pixels"
    },
    gap: {
      control: "number",
      description: "Gap between items (px)"
    },
    itemHeight: {
      control: { max: 500, min: 100, step: 50, type: "number" },
      description: "Default height for items before measurement"
    },
    linear: {
      control: "boolean",
      description: "Use linear positioning instead of shortest column"
    },
    maxColumnCount: {
      control: { max: 10, min: 1, step: 1, type: "number" },
      description: "Maximum number of columns allowed"
    },
    overscan: {
      control: { max: 500, min: 0, step: 50, type: "number" },
      description: "Pixels to render outside visible viewport"
    },
    scrollFps: {
      control: { max: 60, min: 1, step: 1, type: "number" },
      description: "Scroll event sampling rate (fps)"
    }
  },
  component: Masonry,
  decorators: [
    (Story) => (
      <div style={{ height: "600px", overflow: "auto", width: "100%" }}>
        <Story />
      </div>
    )
  ],
  subcomponents: { MasonryItem },
  tags: ["autodocs", "beta"],
  title: "Components/Masonry"
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
                alignItems: "center",
                backgroundColor: item.color,
                borderRadius: "8px",
                color: "white",
                display: "flex",
                fontSize: "24px",
                fontWeight: "bold",
                height: `${item.height}px`,
                justifyContent: "center"
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
                backgroundColor: item.color,
                borderRadius: "8px",
                height: `${item.height}px`,
                padding: "16px"
              }}
            >
              <h3 style={{ color: "white", margin: 0 }}>Item {item.id + 1}</h3>
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
                alignItems: "center",
                backgroundColor: item.color,
                borderRadius: "8px",
                color: "white",
                display: "flex",
                fontSize: "18px",
                fontWeight: "bold",
                height: `${item.height}px`,
                justifyContent: "center"
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
                backgroundColor: item.color,
                borderRadius: "12px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                height: `${item.height}px`,
                padding: "16px"
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
      <Masonry columnCount={3} linear>
        {items.map((item) => (
          <MasonryItem key={item.id}>
            <div
              style={{
                alignItems: "center",
                backgroundColor: item.color,
                borderRadius: "8px",
                color: "white",
                display: "flex",
                fontSize: "20px",
                fontWeight: "bold",
                height: `${item.height}px`,
                justifyContent: "center"
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
      height: Math.floor(Math.random() * 300) + 200,
      id: i,
      width: 400
    }));

    return (
      <Masonry columnWidth={200} gap={12}>
        {images.map((img) => (
          <MasonryItem key={img.id}>
            <img
              alt={`Gallery item ${img.id + 1}`}
              src={`https://picsum.photos/seed/${img.id}/${img.width}/${img.height}`}
              style={{
                borderRadius: "8px",
                display: "block",
                height: "auto",
                width: "100%"
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
      <Masonry columnWidth={180} gap={16} maxColumnCount={5}>
        {items.map((item) => (
          <MasonryItem key={item.id}>
            <div
              style={{
                backgroundColor: item.color,
                borderRadius: "8px",
                height: `${item.height}px`,
                padding: "16px"
              }}
            >
              <h4 style={{ color: "white", margin: 0 }}>Card {item.id + 1}</h4>
              <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "14px", margin: "8px 0 0" }}>
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
                alignItems: "center",
                backgroundColor: item.color,
                borderRadius: "8px",
                color: "white",
                display: "flex",
                flexDirection: "column",
                fontWeight: "bold",
                height: `${item.height}px`,
                justifyContent: "center",
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
              alignItems: "center",
              color: "#666",
              display: "flex",
              fontSize: "18px",
              height: "400px",
              justifyContent: "center"
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
                    alignItems: "center",
                    backgroundColor: item.color,
                    borderRadius: "8px",
                    color: "white",
                    display: "flex",
                    fontSize: "24px",
                    fontWeight: "bold",
                    height: `${item.height}px`,
                    justifyContent: "center"
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
      <Masonry columnWidth={220} gap={20} maxColumnCount={6}>
        {items.map((item) => (
          <MasonryItem key={item.id}>
            <div
              style={{
                backgroundColor: item.color,
                borderRadius: "12px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                height: `${item.height}px`,
                padding: "20px"
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
