import preview from "~/.storybook/preview";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from ".";

const meta = preview.meta({
  component: Accordion,
  subcomponents: { AccordionContent, AccordionItem, AccordionTrigger },
  tags: ["autodocs"],
  title: "Components/Accordion"
});

export const Single = meta.story({
  args: {
    collapsible: true,
    type: "single"
  },
  render: (args) => (
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
  )
});

export const Multiple = meta.story({
  args: {
    defaultValue: ["item-1"],
    type: "multiple"
  },
  render: (args) => (
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
  )
});
