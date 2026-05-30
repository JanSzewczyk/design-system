# Accordion

**Category:** Misc · **Public:** yes · **Stories:** 2

## Import
```ts
import { Accordion } from "@szum-tech/design-system";
```

## Examples
### Single
```tsx
<Accordion {...args} className="w-full">
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Is it styled?</AccordionTrigger>
    <AccordionContent>
      Yes. It comes with default styles that matches the other components aesthetic.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-3">
    <AccordionTrigger>Is it animated?</AccordionTrigger>
    <AccordionContent>Yes. It&apos;s animated by default, but you can disable it if you prefer.</AccordionContent>
  </AccordionItem>
</Accordion>
```

### Multiple
```tsx
<Accordion {...args} className="w-full">
  <AccordionItem value="item-1">
    <AccordionTrigger>Can I open multiple items?</AccordionTrigger>
    <AccordionContent>
      Yes. Use type=&quot;multiple&quot; to allow multiple items to be open at the same time.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Can I set default open items?</AccordionTrigger>
    <AccordionContent>Yes. Use the defaultValue prop to set which items are open by default.</AccordionContent>
  </AccordionItem>
</Accordion>
```
