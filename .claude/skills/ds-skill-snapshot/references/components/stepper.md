# Stepper

**Category:** Misc · **Public:** yes · **Stories:** 9

## Import
```ts
import { Stepper } from "@szum-tech/design-system";
```

## Props
| Prop | Type | Required | Default |
|---|---|---|---|
| `asChild` | `boolean` | no | — |
| `value` | `string` | no | — |
| `defaultValue` | `string` | no | — |
| `onValueChange` | `(value: string) => void` | no | — |
| `onValueComplete` | `(value: string, completed: boolean) => void` | no | — |
| `onValueAdd` | `(value: string) => void` | no | — |
| `onValueRemove` | `(value: string) => void` | no | — |
| `onValidate` | `(value: string, direction: StepperNavigationDirection) => boolean \| Promise<boolean>` | no | — |
| `activationMode` | `StepperActivationMode` | no | — |
| `dir` | `StepperDirection` | no | — |
| `orientation` | `StepperOrientation` | no | — |
| `disabled` | `boolean` | no | — |
| `loop` | `boolean` | no | — |
| `nonInteractive` | `boolean` | no | — |
| `indicators` | `StepIndicators` | no | — |

## Examples
### Default
```tsx
<Stepper value={step} onValueChange={setStep}>
  <StepperNav>
    <StepperItem value="step1">
      <StepperTrigger>
        <StepperIndicator />
        <div>
          <StepperTitle>Step 1</StepperTitle>
          <StepperDescription>Basic Information</StepperDescription>
        </div>
      </StepperTrigger>
    </StepperItem>
    <StepperItem value="step2">
      <StepperTrigger>
        <StepperIndicator />
        <div>
          <StepperTitle>Step 2</StepperTitle>
          <StepperDescription>Details</StepperDescription>
        </div>
      </StepperTrigger>
    </StepperItem>
    <StepperItem value="step3">
      <StepperTrigger>
        <StepperIndicator />
        <div>
          <StepperTitle>Step 3</StepperTitle>
          <StepperDescription>Review</StepperDescription>
        </div>
      </StepperTrigger>
    </StepperItem>
  </StepperNav>

  <StepperPanel>
    <StepperContent value="step1">
      <div className="rounded-lg border p-6">
        <h3 className="mb-4 text-lg font-semibold">Step 1: Basic Information</h3>
        <p className="mb-4 text-gray-600">Enter your basic information to get started.</p>
        <StepperNextTrigger asChild>
          <Button>Next</Button>
        </StepperNextTrigger>
      </div>
    </StepperContent>

    <StepperContent value="step2">
      <div className="rounded-lg border p-6">
        <h3 className="mb-4 text-lg font-semibold">Step 2: Details</h3>
        <p className="mb-4 text-gray-600">Provide additional details about yourself.</p>
        <div className="flex gap-2">
          <StepperPrevTrigger asChild>
            <Button>Previous</Button>
          </StepperPrevTrigger>
          <StepperNextTrigger asChild>
            <Button>Next</Button>
          </StepperNextTrigger>
        </div>
      </div>
    </StepperContent>

    <StepperContent value="step3">
      <div className="rounded-lg border p-6">
        <h3 className="mb-4 text-lg font-semibold">Step 3: Review</h3>
        <p className="mb-4 text-gray-600">Review your information and submit.</p>
        <div className="flex gap-2">
          <StepperPrevTrigger asChild>
            <Button>Previous</Button>
          </StepperPrevTrigger>
          <Button>Submit</Button>
        </div>
      </div>
    </StepperContent>
  </StepperPanel>
</Stepper>
```

### Vertical Orientation
```tsx
<Stepper value={step} onValueChange={setStep} orientation="vertical">
  <StepperNav>
    <StepperItem value="step1">
      <StepperTrigger>
        <StepperIndicator />
        <div>
          <StepperTitle>Step 1</StepperTitle>
          <StepperDescription>Basic Information</StepperDescription>
        </div>
      </StepperTrigger>
    </StepperItem>
    <StepperItem value="step2">
      <StepperTrigger>
        <StepperIndicator />
        <div>
          <StepperTitle>Step 2</StepperTitle>
          <StepperDescription>Details</StepperDescription>
        </div>
      </StepperTrigger>
    </StepperItem>
    <StepperItem value="step3">
      <StepperTrigger>
        <StepperIndicator />
        <div>
          <StepperTitle>Step 3</StepperTitle>
          <StepperDescription>Review</StepperDescription>
        </div>
      </StepperTrigger>
    </StepperItem>
  </StepperNav>

  <StepperPanel>
    <StepperContent value="step1">
      <div className="rounded-lg border p-6">
        <h3 className="mb-4 text-lg font-semibold">Step 1: Basic Information</h3>
        <p className="mb-4 text-gray-600">Enter your basic information.</p>
        <StepperNextTrigger asChild>
          <Button>Next</Button>
        </StepperNextTrigger>
      </div>
    </StepperContent>

    <StepperContent value="step2">
      <div className="rounded-lg border p-6">
        <h3 className="mb-4 text-lg font-semibold">Step 2: Details</h3>
        <p className="mb-4 text-gray-600">Provide additional details.</p>
        <div className="flex gap-2">
          <StepperPrevTrigger asChild>
            <Button>Previous</Button>
          </StepperPrevTrigger>
          <StepperNextTrigger asChild>
            <Button>Next</Button>
          </StepperNextTrigger>
        </div>
      </div>
    </StepperContent>

    <StepperContent value="step3">
      <div className="rounded-lg border p-6">
        <h3 className="mb-4 text-lg font-semibold">Step 3: Review</h3>
        <p className="mb-4 text-gray-600">Review and submit.</p>
        <div className="flex gap-2">
          <StepperPrevTrigger asChild>
            <Button>Previous</Button>
          </StepperPrevTrigger>
          <Button>Submit</Button>
        </div>
      </div>
    </StepperContent>
  </StepperPanel>
</Stepper>
```

### With Completed Steps
```tsx
<Stepper value={step} onValueChange={setStep}>
  <StepperNav>
    <StepperItem value="step1" completed>
      <StepperTrigger>
        <StepperIndicator />
        <div>
          <StepperTitle>Step 1</StepperTitle>
          <StepperDescription>Completed</StepperDescription>
        </div>
      </StepperTrigger>
    </StepperItem>
    <StepperItem value="step2">
      <StepperTrigger>
        <StepperIndicator />
        <div>
          <StepperTitle>Step 2</StepperTitle>
          <StepperDescription>In Progress</StepperDescription>
        </div>
      </StepperTrigger>
    </StepperItem>
    <StepperItem value="step3">
      <StepperTrigger>
        <StepperIndicator />
        <div>
          <StepperTitle>Step 3</StepperTitle>
          <StepperDescription>Pending</StepperDescription>
        </div>
      </StepperTrigger>
    </StepperItem>
  </StepperNav>

  <StepperPanel>
    <StepperContent value="step1">
      <div className="rounded-lg border p-6">
        <h3 className="mb-4 text-lg font-semibold">Step 1 Content</h3>
      </div>
    </StepperContent>
    <StepperContent value="step2">
      <div className="rounded-lg border p-6">
        <h3 className="mb-4 text-lg font-semibold">Step 2 Content</h3>
      </div>
    </StepperContent>
    <StepperContent value="step3">
      <div className="rounded-lg border p-6">
        <h3 className="mb-4 text-lg font-semibold">Step 3 Content</h3>
      </div>
    </StepperContent>
  </StepperPanel>
</Stepper>
```

### With Disabled Steps
```tsx
<Stepper value={step} onValueChange={setStep}>
  <StepperNav>
    <StepperItem value="step1">
      <StepperTrigger>
        <StepperIndicator />
        <div>
          <StepperTitle>Step 1</StepperTitle>
          <StepperDescription>Available</StepperDescription>
        </div>
      </StepperTrigger>
    </StepperItem>
    <StepperItem value="step2" disabled>
      <StepperTrigger>
        <StepperIndicator />
        <div>
          <StepperTitle>Step 2</StepperTitle>
          <StepperDescription>Disabled</StepperDescription>
        </div>
      </StepperTrigger>
    </StepperItem>
    <StepperItem value="step3" disabled>
      <StepperTrigger>
        <StepperIndicator />
        <div>
          <StepperTitle>Step 3</StepperTitle>
          <StepperDescription>Disabled</StepperDescription>
        </div>
      </StepperTrigger>
    </StepperItem>
  </StepperNav>

  <StepperPanel>
    <StepperContent value="step1">
      <div className="rounded-lg border p-6">
        <h3 className="mb-4 text-lg font-semibold">Only Step 1 is Available</h3>
        <p className="text-gray-600">Other steps are disabled.</p>
      </div>
    </StepperContent>
  </StepperPanel>
</Stepper>
```

### With Loading State
```tsx
<Stepper value={step} onValueChange={setStep} indicators={{ loading: <Spinner /> }}>
  <StepperNav>
    <StepperItem value="step1" completed>
      <StepperTrigger>
        <StepperIndicator />
        <div>
          <StepperTitle>Step 1</StepperTitle>
          <StepperDescription>Completed</StepperDescription>
        </div>
      </StepperTrigger>
    </StepperItem>
    <StepperItem value="step2" loading>
      <StepperTrigger>
        <StepperIndicator />
        <div>
          <StepperTitle>Step 2</StepperTitle>
          <StepperDescription>Loading...</StepperDescription>
        </div>
      </StepperTrigger>
    </StepperItem>
    <StepperItem value="step3">
      <StepperTrigger>
        <StepperIndicator />
        <div>
          <StepperTitle>Step 3</StepperTitle>
          <StepperDescription>Pending</StepperDescription>
        </div>
      </StepperTrigger>
    </StepperItem>
  </StepperNav>

  <StepperPanel>
    <StepperContent value="step1">
      <div className="rounded-lg border p-6">
        <h3 className="mb-4 text-lg font-semibold">Step 1 Content</h3>
      </div>
    </StepperContent>
    <StepperContent value="step2">
      <div className="rounded-lg border p-6">
        <h3 className="mb-4 text-lg font-semibold">Step 2 is Loading</h3>
        <p className="text-gray-600">Please wait...</p>
      </div>
    </StepperContent>
    <StepperContent value="step3">
      <div className="rounded-lg border p-6">
        <h3 className="mb-4 text-lg font-semibold">Step 3 Content</h3>
      </div>
    </StepperContent>
  </StepperPanel>
</Stepper>
```

### Manual Activation
```tsx
<Stepper value={step} onValueChange={setStep} activationMode="manual">
  <StepperNav>
    <StepperItem value="step1">
      <StepperTrigger>
        <StepperIndicator />
        <div>
          <StepperTitle>Step 1</StepperTitle>
          <StepperDescription>Manual activation</StepperDescription>
        </div>
      </StepperTrigger>
    </StepperItem>
    <StepperItem value="step2">
      <StepperTrigger>
        <StepperIndicator />
        <div>
          <StepperTitle>Step 2</StepperTitle>
          <StepperDescription>Press Enter/Space to activate</StepperDescription>
        </div>
      </StepperTrigger>
    </StepperItem>
    <StepperItem value="step3">
      <StepperTrigger>
        <StepperIndicator />
        <div>
          <StepperTitle>Step 3</StepperTitle>
          <StepperDescription>Keyboard navigation</StepperDescription>
        </div>
      </StepperTrigger>
    </StepperItem>
  </StepperNav>

  <StepperPanel>
    <StepperContent value="step1">
      <div className="rounded-lg border p-6">
        <h3 className="mb-4 text-lg font-semibold">Manual Activation Mode</h3>
        <p className="mb-4 text-gray-600">
          Navigate with arrow keys, then press Enter or Space to activate a step.
        </p>
      </div>
    </StepperContent>
    <StepperContent value="step2">
      <div className="rounded-lg border p-6">
        <h3 className="mb-4 text-lg font-semibold">Step 2 Content</h3>
      </div>
    </StepperContent>
    <StepperContent value="step3">
      <div className="rounded-lg border p-6">
        <h3 className="mb-4 text-lg font-semibold">Step 3 Content</h3>
      </div>
    </StepperContent>
  </StepperPanel>
</Stepper>
```

### With Custom Indicators
```tsx
<Stepper
  value={step}
  onValueChange={setStep}
  indicators={{
    active: <span className="text-xl">→</span>,
    completed: <span className="text-xl">✓</span>,
    inactive: <span className="text-xl">○</span>
  }}
>
  <StepperNav>
    <StepperItem value="step1" completed>
      <StepperTrigger>
        <StepperIndicator />
        <div>
          <StepperTitle>Step 1</StepperTitle>
          <StepperDescription>Custom indicators</StepperDescription>
        </div>
      </StepperTrigger>
    </StepperItem>
    <StepperItem value="step2">
      <StepperTrigger>
        <StepperIndicator />
        <div>
          <StepperTitle>Step 2</StepperTitle>
          <StepperDescription>With custom icons</StepperDescription>
        </div>
      </StepperTrigger>
    </StepperItem>
    <StepperItem value="step3">
      <StepperTrigger>
        <StepperIndicator />
        <div>
          <StepperTitle>Step 3</StepperTitle>
          <StepperDescription>Inactive state</StepperDescription>
        </div>
      </StepperTrigger>
    </StepperItem>
  </StepperNav>

  <StepperPanel>
    <StepperContent value="step1">
      <div className="rounded-lg border p-6">
        <h3 className="mb-4 text-lg font-semibold">Step 1 Content</h3>
      </div>
    </StepperContent>
    <StepperContent value="step2">
      <div className="rounded-lg border p-6">
        <h3 className="mb-4 text-lg font-semibold">Step 2 Content</h3>
      </div>
    </StepperContent>
    <StepperContent value="step3">
      <div className="rounded-lg border p-6">
        <h3 className="mb-4 text-lg font-semibold">Step 3 Content</h3>
      </div>
    </StepperContent>
  </StepperPanel>
</Stepper>
```

### With Validation
```tsx
<Stepper value={step} onValueChange={setStep} onValidate={handleValidate}>
  <StepperNav>
    <StepperItem value="step1">
      <StepperTrigger>
        <StepperIndicator />
        <div>
          <StepperTitle>Step 1</StepperTitle>
          <StepperDescription>Form with validation</StepperDescription>
        </div>
      </StepperTrigger>
    </StepperItem>
    <StepperItem value="step2">
      <StepperTrigger>
        <StepperIndicator />
        <div>
          <StepperTitle>Step 2</StepperTitle>
          <StepperDescription>Next step</StepperDescription>
        </div>
      </StepperTrigger>
    </StepperItem>
  </StepperNav>

  <StepperPanel>
    <StepperContent value="step1">
      <div className="rounded-lg border p-6">
        <h3 className="mb-4 text-lg font-semibold">Validation Example</h3>
        <label className="mb-4 flex items-center gap-2">
          <input type="checkbox" checked={formValid} onChange={(e) => setFormValid(e.target.checked)} />
          <span>Check this to enable next step</span>
        </label>
        <StepperNextTrigger asChild>
          <Button>Next</Button>
        </StepperNextTrigger>
      </div>
    </StepperContent>
    <StepperContent value="step2">
      <div className="rounded-lg border p-6">
        <h3 className="mb-4 text-lg font-semibold">Step 2 Content</h3>
        <p className="text-gray-600">You successfully validated form!</p>
      </div>
    </StepperContent>
  </StepperPanel>
</Stepper>
```

### Interactive Navigation
```tsx
<Stepper value={step} onValueChange={setStep}>
  <StepperNav>
    <StepperItem value="step1">
      <StepperTrigger>
        <StepperIndicator />
        <div>
          <StepperTitle>Step 1</StepperTitle>
          <StepperDescription>Click to navigate</StepperDescription>
        </div>
      </StepperTrigger>
    </StepperItem>
    <StepperItem value="step2">
      <StepperTrigger>
        <StepperIndicator />
        <div>
          <StepperTitle>Step 2</StepperTitle>
          <StepperDescription>Interactive steps</StepperDescription>
        </div>
      </StepperTrigger>
    </StepperItem>
    <StepperItem value="step3">
      <StepperTrigger>
        <StepperIndicator />
        <div>
          <StepperTitle>Step 3</StepperTitle>
          <StepperDescription>Direct navigation</StepperDescription>
        </div>
      </StepperTrigger>
    </StepperItem>
  </StepperNav>

  <StepperPanel>
    <StepperContent value="step1">
      <div className="rounded-lg border p-6">
        <h3 className="mb-4 text-lg font-semibold">Step 1: Interactive Navigation</h3>
        <p className="mb-4 text-gray-600">Click on any step above to navigate directly.</p>
        <p className="mb-4 text-gray-600">Current step: {step}</p>
      </div>
    </StepperContent>
    <StepperContent value="step2">
      <div className="rounded-lg border p-6">
        <h3 className="mb-4 text-lg font-semibold">Step 2: Interactive Navigation</h3>
        <p className="mb-4 text-gray-600">Click on any step above to navigate directly.</p>
        <p className="mb-4 text-gray-600">Current step: {step}</p>
      </div>
    </StepperContent>
    <StepperContent value="step3">
      <div className="rounded-lg border p-6">
        <h3 className="mb-4 text-lg font-semibold">Step 3: Interactive Navigation</h3>
        <p className="mb-4 text-gray-600">Click on any step above to navigate directly.</p>
        <p className="mb-4 text-gray-600">Current step: {step}</p>
      </div>
    </StepperContent>
  </StepperPanel>
</Stepper>
```

## Notes
- Supports `asChild` (polymorphic via Radix `Slot`).
