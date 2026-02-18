import { type Meta, type StoryObj } from "@storybook/react";
import { Badge, type BadgeVariant } from "~/components/badge";

import { BadgeOverflow } from "./index";

const meta = {
  title: "Components/Badge Overflow",
  component: BadgeOverflow,
  tags: ["autodocs"],
  argTypes: {
    lineCount: {
      control: { type: "number", min: 1, max: 5 }
    }
  },
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
  }
} satisfies Meta<typeof BadgeOverflow>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
  render: (args) => (
    <div className="w-full max-w-sm rounded-lg border p-4">
      <BadgeOverflow {...args} />
    </div>
  )
};

export const CustomOverflow: Story = {
  args: {
    renderOverflow: (count) => (
      <Badge variant="secondary" className="bg-muted">
        +{count} more
      </Badge>
    )
  },
  render: (args) => (
    <div className="w-full max-w-sm rounded-lg border p-4">
      <BadgeOverflow {...args} />
    </div>
  )
};

export const MultiLine: Story = {
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
};

export const ObjectItems: Story = {
  render: () => (
    <div className="w-full max-w-50 rounded-lg border p-4">
      <BadgeOverflow
        items={[
          { id: 1, name: "Alpha", type: "default" },
          { id: 2, name: "Beta", type: "secondary" },
          { id: 3, name: "Gamma", type: "success" },
          { id: 4, name: "Delta", type: "warning" },
          { id: 5, name: "Epsilon", type: "danger" },
          { id: 6, name: "Zeta", type: "info" }
        ]}
        getBadgeLabel={(item) => item.name}
        renderBadge={(item, label) => <Badge variant={item.type as BadgeVariant}>{label}</Badge>}
      />
    </div>
  )
};
