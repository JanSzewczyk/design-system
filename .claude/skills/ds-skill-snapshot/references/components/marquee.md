# Marquee

**Category:** Misc · **Public:** yes · **Stories:** 13

## Import
```ts
import { Marquee } from "@szum-tech/design-system";
```

## Props
| Prop | Type | Required | Default |
|---|---|---|---|
| `className` | `string` | no | — |
| `reverse` | `boolean` | no | false |
| `pauseOnHover` | `boolean` | no | false |
| `children` | `React.ReactNode` | yes | — |
| `vertical` | `boolean` | no | false |
| `repeat` | `number` | no | 4 |
| `ariaLabel` | `string` | no | — |
| `ariaLive` | `"off" \| "polite" \| "assertive"` | no | — |
| `ariaRole` | `string` | no | — |

## Examples
### Default
```tsx
<div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
  <Marquee pauseOnHover className="[--duration:20s]">
    {firstRow.map((review) => (
      <ReviewCard key={review.username} {...review} />
    ))}
  </Marquee>
</div>
```

### With Two Rows
```tsx
<div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
  <Marquee pauseOnHover className="[--duration:20s]">
    {firstRow.map((review) => (
      <ReviewCard key={review.username} {...review} />
    ))}
  </Marquee>
  <Marquee reverse pauseOnHover className="[--duration:20s]">
    {secondRow.map((review) => (
      <ReviewCard key={review.username} {...review} />
    ))}
  </Marquee>
</div>
```

### Vertical
```tsx
<div className="relative flex h-100 w-full flex-row items-center justify-center gap-4 overflow-hidden">
  <Marquee vertical pauseOnHover className="[--duration:15s]">
    {firstRow.map((review) => (
      <ReviewCard key={review.username} {...review} />
    ))}
  </Marquee>
  <Marquee vertical reverse pauseOnHover className="[--duration:15s]">
    {secondRow.map((review) => (
      <ReviewCard key={review.username} {...review} />
    ))}
  </Marquee>
</div>
```

### Reversed
```tsx
<div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
  <Marquee reverse pauseOnHover className="[--duration:20s]">
    {firstRow.map((review) => (
      <ReviewCard key={review.username} {...review} />
    ))}
  </Marquee>
</div>
```

### Simple Text
```tsx
<Marquee className="text-xl font-semibold text-gray-100 [--duration:30s] [--gap:2rem]">
  <span>Welcome to our design system</span>
  <span className="text-primary">Built with React & Tailwind</span>
  <span>Beautiful components</span>
  <span className="text-success">Easy to customize</span>
</Marquee>
```

### Logo Cloud
```tsx
<div className="bg-app rounded-lg border border-gray-800 py-8">
  <Marquee pauseOnHover className="[--duration:25s]">
    {logos.map((logo) => (
      <div
        key={logo.name}
        className="flex items-center gap-2 rounded-lg border border-gray-700 bg-gray-900 px-6 py-3"
      >
        <span className={`text-lg font-bold ${logo.color}`}>{logo.name}</span>
      </div>
    ))}
  </Marquee>
</div>
```

### Custom Speed
```tsx
<div className="space-y-8">
  <div>
    <p className="mb-2 text-sm text-gray-400">Fast (10s)</p>
    <Marquee className="[--duration:10s]">
      {firstRow.map((review) => (
        <ReviewCard key={review.username} {...review} />
      ))}
    </Marquee>
  </div>
  <div>
    <p className="mb-2 text-sm text-gray-400">Normal (20s)</p>
    <Marquee className="[--duration:20s]">
      {firstRow.map((review) => (
        <ReviewCard key={review.username} {...review} />
      ))}
    </Marquee>
  </div>
  <div>
    <p className="mb-2 text-sm text-gray-400">Slow (40s)</p>
    <Marquee className="[--duration:40s]">
      {firstRow.map((review) => (
        <ReviewCard key={review.username} {...review} />
      ))}
    </Marquee>
  </div>
</div>
```

### Custom Gap
```tsx
<div className="space-y-8">
  <div>
    <p className="mb-2 text-sm text-gray-400">Small gap (0.5rem)</p>
    <Marquee className="[--duration:20s] [--gap:0.5rem]">
      {firstRow.map((review) => (
        <ReviewCard key={review.username} {...review} />
      ))}
    </Marquee>
  </div>
  <div>
    <p className="mb-2 text-sm text-gray-400">Large gap (3rem)</p>
    <Marquee className="[--duration:20s] [--gap:3rem]">
      {firstRow.map((review) => (
        <ReviewCard key={review.username} {...review} />
      ))}
    </Marquee>
  </div>
</div>
```

### Repeat Count
```tsx
{
    repeat: 2,
    className: "[--duration:15s]",
    children: (
      <>
        <div className="rounded-lg border border-gray-700 bg-gray-900 px-4 py-2">Item 1</div>
        <div className="rounded-lg border border-gray-700 bg-gray-900 px-4 py-2">Item 2</div>
        <div className="rounded-lg border border-gray-700 bg-gray-900 px-4 py-2">Item 3</div>
      </>
    )
  }
```

### Pause On Hover
```tsx
<div>
  <p className="mb-4 text-center text-sm text-gray-400">Hover over to marquee to pause</p>
  <Marquee pauseOnHover className="[--duration:15s]">
    {firstRow.map((review) => (
      <ReviewCard key={review.username} {...review} />
    ))}
  </Marquee>
</div>
```

### Accessibility
```tsx
{
    ariaLabel: "Customer testimonials carousel",
    ariaLive: "polite",
    ariaRole: "region",
    className: "[--duration:20s]",
    children: (
      <>
        <div className="rounded-lg border border-gray-700 bg-gray-900 px-4 py-2">Testimonial 1</div>
        <div className="rounded-lg border border-gray-700 bg-gray-900 px-4 py-2">Testimonial 2</div>
        <div className="rounded-lg border border-gray-700 bg-gray-900 px-4 py-2">Testimonial 3</div>
      </>
    )
  }
```

### Data Slot Attribute
```tsx
{
    className: "[--duration:20s]",
    children: <span>Test content</span>
  }
```

### Three D Effect
```tsx
<div className="relative flex h-125 w-full flex-row items-center justify-center gap-4 overflow-hidden perspective-near">
  <div className="flex transform-[rotateX(10deg)] flex-row gap-4">
    <Marquee vertical className="[--duration:20s]" pauseOnHover>
      {firstRow.map((review) => (
        <ReviewCard key={review.username} {...review} />
      ))}
    </Marquee>
    <Marquee vertical reverse className="[--duration:20s]" pauseOnHover>
      {secondRow.map((review) => (
        <ReviewCard key={review.username} {...review} />
      ))}
    </Marquee>
    <Marquee vertical className="[--duration:20s]" pauseOnHover>
      {firstRow.map((review) => (
        <ReviewCard key={review.username} {...review} />
      ))}
    </Marquee>
  </div>
  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-linear-to-t from-gray-950" />
  <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-linear-to-b from-gray-950" />
</div>
```
