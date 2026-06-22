import * as React from "react";
// Access components from the shipped bundle — avoids story Math.random() in render
// which triggers infinite re-renders via ResizeObserver (the cause of timeout).
const g: any = (typeof window !== "undefined" && (window as any).SzumTechDesignSystem) || {};
const Masonry: any = g.Masonry;
const MasonryItem: any = g.MasonryItem;

// Stable heights — never change between renders
const ITEMS = [180, 260, 140, 310, 200, 240, 170, 290, 150, 220, 280, 160].map((h, i) => ({
  id: i,
  h,
  bg: `hsl(${i * 30}, 65%, 55%)`
}));

function Item({ id, h, bg }: { id: number; h: number; bg: string }) {
  return (
    <MasonryItem>
      <div
        style={{
          height: h,
          backgroundColor: bg,
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontWeight: "bold",
          fontSize: "20px"
        }}
      >
        {id + 1}
      </div>
    </MasonryItem>
  );
}

const items = ITEMS.map((item) => <Item key={item.id} {...item} />);

const Wrap = ({ children }: { children: React.ReactNode }) => (
  <div style={{ height: "500px", width: "100%", overflow: "auto" }}>{children}</div>
);

export const Basic = () => (
  <Wrap>
    <Masonry>{items}</Masonry>
  </Wrap>
);
export const CustomColumnWidth = () => (
  <Wrap>
    <Masonry columnWidth={150}>{items}</Masonry>
  </Wrap>
);
export const FixedColumns = () => (
  <Wrap>
    <Masonry columnCount={3}>{items}</Masonry>
  </Wrap>
);
export const WithCustomGap = () => (
  <Wrap>
    <Masonry gap={16}>{items}</Masonry>
  </Wrap>
);
export const LinearMode = () => (
  <Wrap>
    <Masonry linear>{items}</Masonry>
  </Wrap>
);
export const WithMaxColumns = () => (
  <Wrap>
    <Masonry maxColumnCount={4}>{items}</Masonry>
  </Wrap>
);
export const LargeDataset = () => (
  <Wrap>
    <Masonry>
      {Array.from({ length: 24 }, (_, i) => (
        <MasonryItem key={i}>
          <div
            style={{
              height: [180, 260, 140, 310, 200, 240, 170, 290, 150, 220, 280, 160][i % 12],
              backgroundColor: `hsl(${i * 15}, 65%, 55%)`,
              borderRadius: "8px"
            }}
          />
        </MasonryItem>
      ))}
    </Masonry>
  </Wrap>
);
export const WithFallback = () => (
  <Wrap>
    <Masonry>{items.slice(0, 6)}</Masonry>
  </Wrap>
);
export const Responsive = () => (
  <Wrap>
    <Masonry>{items}</Masonry>
  </Wrap>
);
export const ImageGallery = () => (
  <Wrap>
    <Masonry>
      {ITEMS.map(({ id, h, bg }) => (
        <MasonryItem key={id}>
          <div style={{ height: h, backgroundColor: bg, borderRadius: "8px", overflow: "hidden" }}>
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: "bold"
              }}
            >
              {id + 1}
            </div>
          </div>
        </MasonryItem>
      ))}
    </Masonry>
  </Wrap>
);
