# CountingNumber

**Category:** Misc · **Public:** yes · **Stories:** 10

## Import
```ts
import { CountingNumber } from "@szum-tech/design-system";
```

## Props
| Prop | Type | Required | Default |
|---|---|---|---|
| `from` | `number` | no | 0 |
| `to` | `number` | no | 100 |
| `duration` | `number` | no | 2 |
| `delay` | `number` | no | 0 |
| `className` | `string` | no | — |
| `startOnView` | `boolean` | no | true |
| `once` | `boolean` | no | false |
| `inViewMargin` | `UseInViewOptions["margin"]` | no | — |
| `onComplete` | `() => void` | no | — |
| `format` | `(value: number) => string` | no | — |

## Examples
### Default
```tsx
{
    from: 0,
    to: 100,
    duration: 2,
    startOnView: false
  }
```

### Custom Range
```tsx
<div className="flex flex-col gap-4">
  <div className="flex items-center gap-4">
    <span className="w-24 text-sm text-gray-400">0 → 50:</span>
    <CountingNumber from={0} to={50} duration={1.5} startOnView={false} className="text-2xl font-bold" />
  </div>
  <div className="flex items-center gap-4">
    <span className="w-24 text-sm text-gray-400">100 → 0:</span>
    <CountingNumber from={100} to={0} duration={1.5} startOnView={false} className="text-2xl font-bold" />
  </div>
  <div className="flex items-center gap-4">
    <span className="w-24 text-sm text-gray-400">-50 → 50:</span>
    <CountingNumber from={-50} to={50} duration={1.5} startOnView={false} className="text-2xl font-bold" />
  </div>
  <div className="flex items-center gap-4">
    <span className="w-24 text-sm text-gray-400">0 → 1000:</span>
    <CountingNumber from={0} to={1000} duration={2} startOnView={false} className="text-2xl font-bold" />
  </div>
</div>
```

### Durations
```tsx
<div className="flex flex-col gap-4">
  <div className="flex items-center gap-4">
    <span className="w-32 text-sm text-gray-400">0.5s (fast):</span>
    <CountingNumber to={100} duration={0.5} startOnView={false} className="text-xl font-semibold" />
  </div>
  <div className="flex items-center gap-4">
    <span className="w-32 text-sm text-gray-400">2s (default):</span>
    <CountingNumber to={100} duration={2} startOnView={false} className="text-xl font-semibold" />
  </div>
  <div className="flex items-center gap-4">
    <span className="w-32 text-sm text-gray-400">5s (slow):</span>
    <CountingNumber to={100} duration={5} startOnView={false} className="text-xl font-semibold" />
  </div>
</div>
```

### With Delay
```tsx
<div className="flex flex-col gap-4">
  <div className="flex items-center gap-4">
    <span className="w-32 text-sm text-gray-400">No delay:</span>
    <CountingNumber to={100} duration={1} delay={0} startOnView={false} className="text-xl font-semibold" />
  </div>
  <div className="flex items-center gap-4">
    <span className="w-32 text-sm text-gray-400">500ms delay:</span>
    <CountingNumber to={100} duration={1} delay={500} startOnView={false} className="text-xl font-semibold" />
  </div>
  <div className="flex items-center gap-4">
    <span className="w-32 text-sm text-gray-400">1000ms delay:</span>
    <CountingNumber to={100} duration={1} delay={1000} startOnView={false} className="text-xl font-semibold" />
  </div>
</div>
```

### With Formatting
```tsx
<div className="flex flex-col gap-6">
  <div className="flex items-center gap-4">
    <span className="w-32 text-sm text-gray-400">Currency:</span>
    <CountingNumber
      to={9999}
      duration={2}
      startOnView={false}
      format={(value) =>
        `$${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
      }
      className="text-2xl font-bold text-green-500"
    />
  </div>
  <div className="flex items-center gap-4">
    <span className="w-32 text-sm text-gray-400">Percentage:</span>
    <CountingNumber
      to={87.5}
      duration={2}
      startOnView={false}
      format={(value) => `${value.toFixed(1)}%`}
      className="text-2xl font-bold text-blue-500"
    />
  </div>
  <div className="flex items-center gap-4">
    <span className="w-32 text-sm text-gray-400">With suffix:</span>
    <CountingNumber
      to={1500}
      duration={2}
      startOnView={false}
      format={(value) => `${Math.round(value)}+ users`}
      className="text-2xl font-bold text-purple-500"
    />
  </div>
  <div className="flex items-center gap-4">
    <span className="w-32 text-sm text-gray-400">Compact:</span>
    <CountingNumber
      to={25000}
      duration={2}
      startOnView={false}
      format={(value) => {
        if (value >= 1000) {
          return `${(value / 1000).toFixed(1)}k`;
        }
        return Math.round(value).toString();
      }}
      className="text-2xl font-bold text-orange-500"
    />
  </div>
</div>
```

### Styling
```tsx
<div className="flex flex-col gap-6">
  <CountingNumber to={100} duration={1.5} startOnView={false} className="text-primary text-4xl font-black" />
  <CountingNumber
    to={100}
    duration={1.5}
    startOnView={false}
    className="text-3xl font-light text-gray-400 italic"
  />
  <CountingNumber
    to={100}
    duration={1.5}
    startOnView={false}
    className="bg-linear-to-r from-pink-500 to-violet-500 bg-clip-text text-5xl font-extrabold text-transparent"
  />
  <CountingNumber
    to={100}
    duration={1.5}
    startOnView={false}
    className="bg-success text-success-foreground rounded-lg px-4 py-2 text-2xl font-bold"
  />
</div>
```

### On Complete Callback
```tsx
<div className="flex flex-col gap-4">
  <CountingNumber
    to={100}
    duration={1}
    startOnView={false}
    onComplete={() => setCompleted(true)}
    className="text-3xl font-bold"
  />
  <p className="text-sm text-gray-400" data-testid="completion-status">
    Status: {completed ? "Animation completed!" : "Animating..."}
  </p>
</div>
```

### Statistics Card
```tsx
<div className="grid grid-cols-3 gap-4">
  <div className="bg-app-foreground flex flex-col items-center rounded-lg border border-gray-800 p-6">
    <CountingNumber
      to={1234}
      duration={2}
      startOnView={false}
      format={(v) => Math.round(v).toLocaleString()}
      className="text-primary text-4xl font-bold"
    />
    <span className="mt-2 text-sm text-gray-400">Total Users</span>
  </div>
  <div className="bg-app-foreground flex flex-col items-center rounded-lg border border-gray-800 p-6">
    <CountingNumber
      to={98.7}
      duration={2}
      startOnView={false}
      format={(v) => `${v.toFixed(1)}%`}
      className="text-success text-4xl font-bold"
    />
    <span className="mt-2 text-sm text-gray-400">Success Rate</span>
  </div>
  <div className="bg-app-foreground flex flex-col items-center rounded-lg border border-gray-800 p-6">
    <CountingNumber
      to={42}
      duration={2}
      startOnView={false}
      format={(v) => `${Math.round(v)}ms`}
      className="text-warning text-4xl font-bold"
    />
    <span className="mt-2 text-sm text-gray-400">Avg. Response</span>
  </div>
</div>
```

### Data Slot Attribute
```tsx
{
    to: 50,
    duration: 0.5,
    startOnView: false
  }
```

### Animation Test
```tsx
<CountingNumber from={0} to={10} duration={0.5} startOnView={false} data-testid="animated-number" />
```
