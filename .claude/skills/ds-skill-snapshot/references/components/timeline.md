# Timeline

**Category:** Misc · **Public:** yes · **Stories:** 6

## Import
```ts
import { Timeline } from "@szum-tech/design-system";
```

## Props
| Prop | Type | Required | Default |
|---|---|---|---|
| `asChild` | `boolean` | no | — |
| `dir` | `TimelineDirection` | no | — |
| `orientation` | `TimelineOrientation` | no | — |
| `variant` | `TimelineVariant` | no | — |
| `activeIndex` | `number` | no | — |

## Variants
- **orientation**: **vertical** (default), horizontal
- **variant**: **default** (default), alternate

## Examples
### Example
```tsx
<Timeline activeIndex={1}>
  {timelineItems.map((item) => (
    <TimelineItem key={item.id}>
      <TimelineDot />
      <TimelineConnector />
      <TimelineContent>
        <TimelineHeader>
          <TimelineTime dateTime={item.dateTime}>{item.date}</TimelineTime>
          <TimelineTitle>{item.title}</TimelineTitle>
        </TimelineHeader>
        <TimelineDescription>{item.description}</TimelineDescription>
      </TimelineContent>
    </TimelineItem>
  ))}
</Timeline>
```

### Horizontal
```tsx
<Timeline orientation="horizontal" activeIndex={1}>
  {timelineItemsHorizontalTimeline.map((item) => (
    <TimelineItem key={item.id}>
      <TimelineDot />
      <TimelineConnector />
      <TimelineContent>
        <TimelineHeader>
          <TimelineTime dateTime={item.dateTime}>{item.date}</TimelineTime>
          <TimelineTitle>{item.title}</TimelineTitle>
        </TimelineHeader>
        <TimelineDescription>{item.description}</TimelineDescription>
      </TimelineContent>
    </TimelineItem>
  ))}
</Timeline>
```

### R T L
```tsx
<Timeline dir="rtl" activeIndex={1}>
  {timelineItemsRTL.map((item) => (
    <TimelineItem key={item.id}>
      <TimelineDot />
      <TimelineConnector />
      <TimelineContent>
        <TimelineHeader>
          <TimelineTime dateTime={item.dateTime}>{item.date}</TimelineTime>
          <TimelineTitle>{item.title}</TimelineTitle>
        </TimelineHeader>
        <TimelineDescription>{item.description}</TimelineDescription>
      </TimelineContent>
    </TimelineItem>
  ))}
</Timeline>
```

### Alternate
```tsx
<Timeline variant="alternate" activeIndex={1}>
  {timelineItemsAlternate.map((item) => (
    <TimelineItem key={item.id}>
      <TimelineDot />
      <TimelineConnector />
      <TimelineContent>
        <TimelineHeader>
          <TimelineTime dateTime={item.dateTime}>{item.date}</TimelineTime>
          <TimelineTitle>{item.title}</TimelineTitle>
        </TimelineHeader>
        <TimelineDescription>{item.description}</TimelineDescription>
      </TimelineContent>
    </TimelineItem>
  ))}
</Timeline>
```

### Horizontal Alternate
```tsx
<Timeline variant="alternate" orientation="horizontal" activeIndex={1}>
  {timelineItemsHorizontalAlternate.map((item) => (
    <TimelineItem key={item.id}>
      <TimelineDot />
      <TimelineConnector />
      <TimelineContent>
        <TimelineHeader>
          <TimelineTime dateTime={item.dateTime}>{item.date}</TimelineTime>
          <TimelineTitle>{item.title}</TimelineTitle>
        </TimelineHeader>
        <TimelineDescription>{item.description}</TimelineDescription>
      </TimelineContent>
    </TimelineItem>
  ))}
</Timeline>
```

### With Custom Dots
```tsx
<Timeline activeIndex={1} className="[--timeline-dot-size:2rem]">
  {timelineItemsWithCustomDots.map((item) => (
    <TimelineItem key={item.id}>
      <TimelineDot>
        <item.icon className="size-3.5" />
      </TimelineDot>
      <TimelineConnector />
      <TimelineContent>
        <TimelineHeader>
          <TimelineTime dateTime={item.dateTime}>{item.date}</TimelineTime>
          <TimelineTitle>{item.title}</TimelineTitle>
        </TimelineHeader>
        <TimelineDescription>{item.description}</TimelineDescription>
      </TimelineContent>
    </TimelineItem>
  ))}
</Timeline>
```

## Notes
- Supports `asChild` (polymorphic via Radix `Slot`).
