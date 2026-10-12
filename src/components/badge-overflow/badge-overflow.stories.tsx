import preview from "~/.storybook/preview";
import { Badge, type BadgeVariant } from "~/components/badge";
import { BadgeOverflow } from "./index";

const meta = preview.meta({
  args: {
    items: [
      "React",
      "TypeScript",
      "Next.js",
      "Tailwind CSS",
      "Radix UI",
      "Vite",
      "Storybook",
      "Playwright",
      "Vitest",
      "ESLint",
      "Prettier"
    ],
    lineCount: 1,
    renderBadge: (_item, label) => <Badge variant="outline">{label}</Badge>
  },
  argTypes: {
    lineCount: {
      control: { max: 5, min: 1, type: "number" }
    }
  },
  component: BadgeOverflow,
  tags: ["autodocs"],
  title: "Components/Badge Overflow"
});

export const Example = meta.story({
  render: (args) => (
    <div className="w-full max-w-sm rounded-lg border p-4">
      <BadgeOverflow {...args} />
    </div>
  )
});

export const CustomOverflow = meta.story({
  args: {
    renderOverflow: (count) => (
      <Badge className="bg-muted" variant="secondary">
        +{count} more
      </Badge>
    )
  },
  render: (args) => (
    <div className="w-full max-w-sm rounded-lg border p-4">
      <BadgeOverflow {...args} />
    </div>
  )
});

export const MultiLine = meta.story({
  args: {
    items: [
      "Frontend Development",
      "Backend Architecture",
      "DevOps & CI/CD",
      "User Experience Design",
      "Product Management",
      "Quality Assurance",
      "Data Science",
      "Machine Learning",
      "Cloud Computing",
      "Cybersecurity"
    ],
    lineCount: 2,
    renderBadge: (_item, label) => <Badge variant="secondary">{label}</Badge>
  },
  render: (args) => (
    <div className="w-full max-w-sm rounded-lg border p-4">
      <BadgeOverflow {...args} />
    </div>
  )
});

export const ObjectItems = meta.story({
  render: () => (
    <div className="w-full max-w-50 rounded-lg border p-4">
      <BadgeOverflow
        getBadgeLabel={(item) => item.name}
        items={[
          { id: 1, name: "Alpha", type: "default" },
          { id: 2, name: "Beta", type: "secondary" },
          { id: 3, name: "Gamma", type: "success" },
          { id: 4, name: "Delta", type: "warning" },
          { id: 5, name: "Epsilon", type: "danger" },
          { id: 6, name: "Zeta", type: "info" }
        ]}
        renderBadge={(item, label) => <Badge variant={item.type as BadgeVariant}>{label}</Badge>}
      />
    </div>
  )
});
