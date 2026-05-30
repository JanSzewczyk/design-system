# Status

**Category:** Misc · **Public:** yes · **Stories:** 14

## Import
```ts
import { Status } from "@szum-tech/design-system";
```

## Props
| Prop | Type | Required | Default |
|---|---|---|---|
| `asChild` | `boolean` | no | — |
| `variant` | `StatusVariant` | no | — |

## Variants
- **variant**: **default** (default), success, error, warning, primary

## Examples
### Default
```tsx
<Status {...args}>
  <StatusIndicator />
  <StatusLabel>Default</StatusLabel>
</Status>
```

### All Variants
```tsx
<div className="flex flex-wrap items-center gap-4">
  <Status variant="default">
    <StatusIndicator />
    <StatusLabel>Default</StatusLabel>
  </Status>
  <Status variant="success">
    <StatusIndicator />
    <StatusLabel>Success</StatusLabel>
  </Status>
  <Status variant="error">
    <StatusIndicator />
    <StatusLabel>Error</StatusLabel>
  </Status>
  <Status variant="warning">
    <StatusIndicator />
    <StatusLabel>Warning</StatusLabel>
  </Status>
  <Status variant="primary">
    <StatusIndicator />
    <StatusLabel>Primary</StatusLabel>
  </Status>
</div>
```

### Success
```tsx
<Status variant="success">
  <StatusIndicator />
  <StatusLabel>Online</StatusLabel>
</Status>
```

### Error
```tsx
<Status variant="error">
  <StatusIndicator />
  <StatusLabel>Offline</StatusLabel>
</Status>
```

### Warning
```tsx
<Status variant="warning">
  <StatusIndicator />
  <StatusLabel>Pending</StatusLabel>
</Status>
```

### Primary
```tsx
<Status variant="primary">
  <StatusIndicator />
  <StatusLabel>Active</StatusLabel>
</Status>
```

### Without Indicator
```tsx
<div className="flex flex-wrap items-center gap-4">
  <Status variant="default">
    <StatusLabel>Default</StatusLabel>
  </Status>
  <Status variant="success">
    <StatusLabel>Completed</StatusLabel>
  </Status>
  <Status variant="error">
    <StatusLabel>Failed</StatusLabel>
  </Status>
  <Status variant="warning">
    <StatusLabel>In Progress</StatusLabel>
  </Status>
  <Status variant="primary">
    <StatusLabel>New</StatusLabel>
  </Status>
</div>
```

### Indicator Only
```tsx
<div className="flex items-center gap-4">
  <Status variant="default">
    <StatusIndicator />
  </Status>
  <Status variant="success">
    <StatusIndicator />
  </Status>
  <Status variant="error">
    <StatusIndicator />
  </Status>
  <Status variant="warning">
    <StatusIndicator />
  </Status>
  <Status variant="primary">
    <StatusIndicator />
  </Status>
</div>
```

### User Status
```tsx
<div className="flex flex-col gap-4">
  <div className="flex items-center gap-3">
    <div className="bg-primary flex size-10 items-center justify-center rounded-full text-sm font-medium text-white">
      JD
    </div>
    <div className="flex flex-col gap-1">
      <span className="text-sm font-medium text-gray-100">John Doe</span>
      <Status variant="success">
        <StatusIndicator />
        <StatusLabel>Online</StatusLabel>
      </Status>
    </div>
  </div>
  <div className="flex items-center gap-3">
    <div className="flex size-10 items-center justify-center rounded-full bg-purple-500 text-sm font-medium text-white">
      AS
    </div>
    <div className="flex flex-col gap-1">
      <span className="text-sm font-medium text-gray-100">Alice Smith</span>
      <Status variant="warning">
        <StatusIndicator />
        <StatusLabel>Away</StatusLabel>
      </Status>
    </div>
  </div>
  <div className="flex items-center gap-3">
    <div className="flex size-10 items-center justify-center rounded-full bg-gray-500 text-sm font-medium text-white">
      BW
    </div>
    <div className="flex flex-col gap-1">
      <span className="text-sm font-medium text-gray-100">Bob Wilson</span>
      <Status variant="error">
        <StatusIndicator />
        <StatusLabel>Offline</StatusLabel>
      </Status>
    </div>
  </div>
</div>
```

### Service Health
```tsx
<div className="bg-app-foreground rounded-lg border border-gray-800 p-4">
  <h3 className="mb-4 text-sm font-semibold text-gray-100">Service Health</h3>
  <div className="flex flex-col gap-3">
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-300">API Server</span>
      <Status variant="success">
        <StatusIndicator />
        <StatusLabel>Operational</StatusLabel>
      </Status>
    </div>
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-300">Database</span>
      <Status variant="success">
        <StatusIndicator />
        <StatusLabel>Operational</StatusLabel>
      </Status>
    </div>
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-300">CDN</span>
      <Status variant="warning">
        <StatusIndicator />
        <StatusLabel>Degraded</StatusLabel>
      </Status>
    </div>
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-300">Email Service</span>
      <Status variant="error">
        <StatusIndicator />
        <StatusLabel>Outage</StatusLabel>
      </Status>
    </div>
  </div>
</div>
```

### Order Status
```tsx
<div className="flex flex-col gap-2">
  <div className="bg-app-foreground flex items-center justify-between rounded-lg border border-gray-800 p-3">
    <div className="flex flex-col">
      <span className="text-sm font-medium text-gray-100">Order #12345</span>
      <span className="text-xs text-gray-400">Placed on Jan 15, 2024</span>
    </div>
    <Status variant="success">
      <StatusLabel>Delivered</StatusLabel>
    </Status>
  </div>
  <div className="bg-app-foreground flex items-center justify-between rounded-lg border border-gray-800 p-3">
    <div className="flex flex-col">
      <span className="text-sm font-medium text-gray-100">Order #12346</span>
      <span className="text-xs text-gray-400">Placed on Jan 18, 2024</span>
    </div>
    <Status variant="primary">
      <StatusIndicator />
      <StatusLabel>In Transit</StatusLabel>
    </Status>
  </div>
  <div className="bg-app-foreground flex items-center justify-between rounded-lg border border-gray-800 p-3">
    <div className="flex flex-col">
      <span className="text-sm font-medium text-gray-100">Order #12347</span>
      <span className="text-xs text-gray-400">Placed on Jan 19, 2024</span>
    </div>
    <Status variant="warning">
      <StatusIndicator />
      <StatusLabel>Processing</StatusLabel>
    </Status>
  </div>
  <div className="bg-app-foreground flex items-center justify-between rounded-lg border border-gray-800 p-3">
    <div className="flex flex-col">
      <span className="text-sm font-medium text-gray-100">Order #12348</span>
      <span className="text-xs text-gray-400">Placed on Jan 10, 2024</span>
    </div>
    <Status variant="error">
      <StatusLabel>Cancelled</StatusLabel>
    </Status>
  </div>
</div>
```

### Data Slot Attributes
```tsx
<Status variant="success">
  <StatusIndicator />
  <StatusLabel>Test</StatusLabel>
</Status>
```

### As Child Pattern
```tsx
<Status asChild variant="success">
  <a href="#" className="cursor-pointer hover:opacity-80">
    <StatusIndicator />
    <StatusLabel>Clickable Status</StatusLabel>
  </a>
</Status>
```

### Custom Styling
```tsx
<div className="flex flex-wrap items-center gap-4">
  <Status variant="success" className="px-4 py-2">
    <StatusIndicator />
    <StatusLabel>Larger Padding</StatusLabel>
  </Status>
  <Status variant="primary" className="rounded-md">
    <StatusIndicator />
    <StatusLabel>Less Rounded</StatusLabel>
  </Status>
  <Status variant="warning" className="border-2">
    <StatusIndicator />
    <StatusLabel>Thicker Border</StatusLabel>
  </Status>
</div>
```

## Notes
- Supports `asChild` (polymorphic via Radix `Slot`).
