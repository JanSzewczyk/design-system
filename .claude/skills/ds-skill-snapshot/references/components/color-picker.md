# ColorPicker

**Category:** Misc · **Public:** yes · **Stories:** 2

## Import
```ts
import { ColorPicker } from "@szum-tech/design-system";
```

## Props
| Prop | Type | Required | Default |
|---|---|---|---|
| `value` | `string` | no | — |
| `defaultValue` | `string` | no | — |
| `onValueChange` | `(value: string) => void` | no | — |
| `dir` | `Direction` | no | — |
| `format` | `ColorFormat` | no | — |
| `defaultFormat` | `ColorFormat` | no | — |
| `onFormatChange` | `(format: ColorFormat) => void` | no | — |
| `name` | `string` | no | — |
| `asChild` | `boolean` | no | — |
| `disabled` | `boolean` | no | — |
| `inline` | `boolean` | no | — |
| `readOnly` | `boolean` | no | — |
| `required` | `boolean` | no | — |

## Variants
- **position**: first, middle, last, **isolated** (default)

## Examples
### Inline Color Picker
```tsx
<ColorPicker
  defaultValue={args.defaultValue}
  onValueChange={args.onValueChange}
  onFormatChange={args.onFormatChange}
  inline={args.inline}
  defaultFormat="hex"
>
  <div className="flex flex-col gap-4">
    <div className="flex items-center gap-3">
      <ColorPickerSwatch className="size-8" />
      <span className="text-sm font-medium">Selected Color</span>
    </div>
    <div className="flex flex-col gap-4 rounded border p-4">
      <ColorPickerArea />
      <div className="flex items-center gap-2">
        <ColorPickerEyeDropper />
        <div className="flex flex-1 flex-col gap-2">
          <ColorPickerHueSlider />
          <ColorPickerAlphaSlider />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <ColorPickerFormatSelect />
        <ColorPickerInput />
      </div>
    </div>
  </div>
</ColorPicker>
```

### Controlled State
```tsx
<div className="flex flex-col gap-4">
  <div className="flex items-center gap-3">
    <ColorPicker
      value={color}
      onValueChange={setColor}
      open={isOpen}
      onOpenChange={setIsOpen}
      defaultFormat="hex"
    >
      <ColorPickerTrigger asChild>
        <Button variant="outline" startIcon={<ColorPickerSwatch className="size-4" />}>
          Pick Color
        </Button>
      </ColorPickerTrigger>
      <ColorPickerContent>
        <ColorPickerArea />
        <div className="flex items-center gap-2">
          <ColorPickerEyeDropper />
          <div className="flex flex-1 flex-col gap-2">
            <ColorPickerHueSlider />
            <ColorPickerAlphaSlider />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ColorPickerFormatSelect />
          <ColorPickerInput />
        </div>
      </ColorPickerContent>
    </ColorPicker>

    <Button variant="outline" onClick={onReset}>
      Reset
    </Button>
  </div>

  <div className="flex flex-col gap-2">
    <h4 className="text-sm font-medium">Preset Colors</h4>
    <div className="flex flex-wrap gap-2">
      {presetColors.map((presetColor) => (
        <button
          key={presetColor}
          type="button"
          className="hover:border-border focus:border-ring size-8 rounded border-2 border-transparent focus:outline-none"
          style={{ backgroundColor: presetColor }}
          onClick={() => onPresetSelect(presetColor)}
          aria-label={`Select color ${presetColor}`}
        />
      ))}
    </div>
  </div>

  <div className="flex flex-col gap-2 text-sm">
    <div>
      <span className="font-medium">Current color:</span>
      <code className="ml-2 font-mono">{color}</code>
    </div>
    <div>
      <span className="font-medium">Picker state:</span>
      <span className="ml-2">{isOpen ? "Open" : "Closed"}</span>
    </div>
  </div>
</div>
```

## Notes
- Supports `asChild` (polymorphic via Radix `Slot`).
