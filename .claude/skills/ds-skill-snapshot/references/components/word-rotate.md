# WordRotate

**Category:** Misc · **Public:** yes · **Stories:** 15

## Import
```ts
import { WordRotate } from "@szum-tech/design-system";
```

## Props
| Prop | Type | Required | Default |
|---|---|---|---|
| `words` | `string[]` | yes | — |
| `duration` | `number` | no | — |
| `animationStyle` | `WordRotateAnimationStyle` | no | — |
| `loop` | `boolean` | no | — |
| `pauseDuration` | `number` | no | — |
| `className` | `string` | no | — |
| `containerClassName` | `string` | no | — |
| `startOnView` | `boolean` | no | — |
| `once` | `boolean` | no | — |
| `inViewMargin` | `UseInViewOptions["margin"]` | no | — |

## Examples
### Default
```tsx
{
    words: ["Hello", "World", "React", "TypeScript"],
    startOnView: false
  }
```

### Animation Styles
```tsx
<div className="space-y-6">
  <div>
    <p className="text-muted-foreground mb-2 text-sm">Fade (default)</p>
    <WordRotate words={["Fade", "Animation", "Style"]} animationStyle="fade" startOnView={false} />
  </div>
  <div>
    <p className="text-muted-foreground mb-2 text-sm">Slide Up</p>
    <WordRotate words={["Slide", "Up", "Animation"]} animationStyle="slide-up" startOnView={false} />
  </div>
  <div>
    <p className="text-muted-foreground mb-2 text-sm">Slide Down</p>
    <WordRotate words={["Slide", "Down", "Animation"]} animationStyle="slide-down" startOnView={false} />
  </div>
  <div>
    <p className="text-muted-foreground mb-2 text-sm">Scale</p>
    <WordRotate words={["Scale", "Animation", "Effect"]} animationStyle="scale" startOnView={false} />
  </div>
  <div>
    <p className="text-muted-foreground mb-2 text-sm">Flip</p>
    <WordRotate words={["Flip", "Animation", "3D"]} animationStyle="flip" startOnView={false} />
  </div>
</div>
```

### Custom Duration
```tsx
<div className="space-y-6">
  <div>
    <p className="text-muted-foreground mb-2 text-sm">Fast (500ms)</p>
    <WordRotate words={["Fast", "Quick", "Rapid"]} duration={500} pauseDuration={100} startOnView={false} />
  </div>
  <div>
    <p className="text-muted-foreground mb-2 text-sm">Normal (1500ms)</p>
    <WordRotate words={["Normal", "Standard", "Default"]} duration={1500} startOnView={false} />
  </div>
  <div>
    <p className="text-muted-foreground mb-2 text-sm">Slow (3000ms)</p>
    <WordRotate words={["Slow", "Relaxed", "Calm"]} duration={3000} startOnView={false} />
  </div>
</div>
```

### No Loop
```tsx
{
    words: ["First", "Second", "Third", "Final"],
    loop: false,
    duration: 1000,
    startOnView: false
  }
```

### Hero Section
```tsx
<div className="bg-app-background flex min-h-64 flex-col items-center justify-center rounded-lg p-8">
  <h1 className="text-4xl font-bold">
    <span>Build </span>
    <WordRotate
      words={["amazing", "beautiful", "powerful", "modern"]}
      animationStyle="slide-up"
      className="text-primary"
      startOnView={false}
    />
    <span> apps</span>
  </h1>
</div>
```

### Role Rotator
```tsx
<div className="text-2xl font-bold">
  <span>I am a </span>
  <WordRotate
    words={["Developer", "Designer", "Creator", "Problem Solver"]}
    animationStyle="flip"
    className="text-primary"
    duration={2000}
    startOnView={false}
  />
</div>
```

### Tech Stack
```tsx
<div className="flex flex-col items-center gap-4">
  <p className="text-muted-foreground text-sm">Built with</p>
  <div className="text-3xl font-bold">
    <WordRotate
      words={["React", "TypeScript", "Tailwind", "Radix UI"]}
      animationStyle="scale"
      duration={1500}
      startOnView={false}
    />
  </div>
</div>
```

### Gradient Text
```tsx
<div className="text-4xl font-bold">
  <WordRotate
    words={["Innovative", "Creative", "Dynamic", "Inspiring"]}
    animationStyle="fade"
    className="bg-linear-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent"
    startOnView={false}
  />
</div>
```

### Call To Action
```tsx
<div className="bg-app-background rounded-lg p-8 text-center">
  <h2 className="mb-4 text-3xl font-bold">
    <WordRotate words={["Start", "Create", "Build", "Launch"]} animationStyle="slide-up" startOnView={false} />
    <span> your project today</span>
  </h2>
  <p className="text-muted-foreground">Join thousands of developers building with our design system</p>
</div>
```

### Features
```tsx
<div className="space-y-2 text-lg">
  <div className="flex items-center gap-2">
    <span className="text-primary">*</span>
    <WordRotate words={["Fast", "Performant", "Optimized"]} animationStyle="fade" startOnView={false} />
    <span>performance</span>
  </div>
  <div className="flex items-center gap-2">
    <span className="text-primary">*</span>
    <WordRotate words={["Beautiful", "Modern", "Clean"]} animationStyle="fade" startOnView={false} />
    <span>design</span>
  </div>
  <div className="flex items-center gap-2">
    <span className="text-primary">*</span>
    <WordRotate words={["Accessible", "Inclusive", "Universal"]} animationStyle="fade" startOnView={false} />
    <span>components</span>
  </div>
</div>
```

### Slide Up Animation
```tsx
{
    words: ["Slide", "Up", "Animation", "Demo"],
    animationStyle: "slide-up",
    startOnView: false
  }
```

### Flip Animation
```tsx
{
    words: ["Flip", "3D", "Effect", "Cool"],
    animationStyle: "flip",
    startOnView: false
  }
```

### Data Slot Attribute
```tsx
{
    words: ["Testing", "Data", "Slot"],
    startOnView: false
  }
```

### Custom Styling
```tsx
{
    words: ["Custom", "Styled", "Words"],
    className: "font-mono text-2xl tracking-wider",
    containerClassName: "bg-gray-900 px-4 py-2 rounded-lg",
    startOnView: false
  }
```

### Quick Transitions
```tsx
{
    words: ["Quick", "Fast", "Rapid", "Swift"],
    duration: 800,
    pauseDuration: 150,
    animationStyle: "slide-up",
    startOnView: false
  }
```
