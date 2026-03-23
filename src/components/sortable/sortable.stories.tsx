import * as React from "react";

import { FileTextIcon, GripVerticalIcon, ImageIcon, MusicIcon, VideoIcon } from "lucide-react";

import { Badge, type BadgeVariant, Card, CardContent } from "~/components";
import { cn } from "~/utils";

import { toast } from "../toaster";

import { Sortable, SortableItem, SortableItemHandle } from ".";

import preview from "~/.storybook/preview";

const meta = preview.meta({
  title: "Components/Sortable",
  component: Sortable,
  tags: ["autodocs"],
  parameters: {
    docs: {
      subtitle: "A composable drag-and-drop sortable component built on @dnd-kit."
    }
  }
});

interface SortableItem {
  id: string;
  title: string;
  description: string;
  type: "image" | "document" | "audio" | "video";
  size: string;
}
const defaultItems: SortableItem[] = [
  {
    id: "1",
    title: "Product Demo",
    description: "Main product image",
    type: "image",
    size: "2.4 MB"
  },
  {
    id: "2",
    title: "Product Specification",
    description: "Technical details document",
    type: "document",
    size: "1.2 MB"
  },
  {
    id: "3",
    title: "Product Demo Video",
    description: "How to use the product",
    type: "video",
    size: "15.7 MB"
  },
  {
    id: "4",
    title: "Product Audio Guide",
    description: "Audio instructions",
    type: "audio",
    size: "8.3 MB"
  },
  {
    id: "5",
    title: "Product Specification",
    description: "Additional product view",
    type: "image",
    size: "3.1 MB"
  }
];
const getTypeIcon = (type: SortableItem["type"]) => {
  switch (type) {
    case "image":
      return <ImageIcon className="h-4 w-4" />;
    case "document":
      return <FileTextIcon className="h-4 w-4" />;
    case "audio":
      return <MusicIcon className="h-4 w-4" />;
    case "video":
      return <VideoIcon className="h-4 w-4" />;
  }
};
const getTypeColor = (type: SortableItem["type"]): BadgeVariant => {
  switch (type) {
    case "image":
      return "primary";
    case "document":
      return "success";
    case "audio":
      return "error";
    case "video":
      return "secondary";
  }
};

export const List = meta.story({
  render() {
    const [items, setItems] = React.useState<SortableItem[]>(defaultItems);

    const handleValueChange = (newItems: SortableItem[]) => {
      setItems(newItems);
      // Show toast with new order
      toast.success("Items reordered successfully!", {
        description: newItems.map((item, index) => `${index + 1}. ${item.title}`).join(", ")
      });
    };

    const getItemValue = (item: SortableItem) => item.id;

    return (
      <div className="mx-auto w-full max-w-xl space-y-8 p-6">
        <Sortable
          value={items}
          onValueChange={handleValueChange}
          getItemValue={getItemValue}
          strategy="vertical"
          className="space-y-2"
        >
          {items.map((item) => (
            <SortableItem key={item.id} value={item.id}>
              <div className="bg-background flex items-center gap-3 rounded border p-3 transition-colors">
                <SortableItemHandle className="text-muted-foreground hover:text-foreground">
                  <GripVerticalIcon className="size-4" />
                </SortableItemHandle>
                <div className="text-muted-foreground flex items-center gap-2">{getTypeIcon(item.type)}</div>
                <div className="min-w-0 flex-1">
                  <h4 className="truncate text-sm font-medium">{item.title}</h4>
                  <p className="text-muted-foreground truncate text-xs">{item.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={getTypeColor(item.type)}>{item.type}</Badge>
                  <span className="text-muted-foreground text-xs">{item.size}</span>
                </div>
              </div>
            </SortableItem>
          ))}
        </Sortable>
      </div>
    );
  }
});

interface GridItem {
  id: string;
  title: string;
  description: string;
  type: "image" | "document" | "audio" | "video";
  size: string;
  priority: "high" | "medium" | "low";
}
const defaultGridItems: GridItem[] = [
  {
    id: "1",
    title: "Hero Image",
    description: "Main banner image",
    type: "image",
    size: "2.4 MB",
    priority: "high"
  },
  {
    id: "2",
    title: "Product Specs",
    description: "Technical documentation",
    type: "document",
    size: "1.2 MB",
    priority: "medium"
  },
  {
    id: "3",
    title: "Demo Video",
    description: "Product demonstration",
    type: "video",
    size: "15.7 MB",
    priority: "high"
  },
  {
    id: "4",
    title: "Audio Guide",
    description: "Voice instructions",
    type: "audio",
    size: "8.3 MB",
    priority: "low"
  },
  {
    id: "5",
    title: "Gallery Photo 1",
    description: "Product view 1",
    type: "image",
    size: "3.1 MB",
    priority: "medium"
  },
  {
    id: "6",
    title: "Gallery Photo 2",
    description: "Product view 2",
    type: "image",
    size: "2.8 MB",
    priority: "medium"
  },
  {
    id: "7",
    title: "User Manual",
    description: "Installation guide",
    type: "document",
    size: "4.2 MB",
    priority: "high"
  },
  {
    id: "8",
    title: "Background Music",
    description: "Ambient soundtrack",
    type: "audio",
    size: "12.1 MB",
    priority: "low"
  },
  {
    id: "9",
    title: "Feature Highlight",
    description: "Key product features",
    type: "audio",
    size: "N/A",
    priority: "high"
  }
];
const getItemSize = (type: GridItem["type"]) => {
  switch (type) {
    case "image":
    case "video":
      return "col-span-1 row-span-1";
    case "document":
    case "audio":
      return "col-span-1 row-span-1";
    default:
      return "col-span-1 row-span-1";
  }
};

export const Grid = meta.story({
  render() {
    const [items, setItems] = React.useState<GridItem[]>(defaultGridItems);
    const handleValueChange = (newItems: GridItem[]) => {
      setItems(newItems);
      // Show toast with new order
      toast.success("Grid items reordered successfully!", {
        description: `New order: ${newItems.map((item, index) => `${index + 1}. ${item.title}`).join(", ")}`
      });
    };
    const getItemValue = (item: GridItem) => item.id;
    return (
      <div className="mx-auto w-full max-w-2xl space-y-6 p-4">
        <Sortable
          value={items}
          onValueChange={handleValueChange}
          getItemValue={getItemValue}
          strategy="grid"
          className="grid auto-rows-fr grid-cols-3 gap-3"
        >
          {items.map((item) => (
            <SortableItem key={item.id} value={item.id}>
              <div
                className={cn(
                  "group bg-background hover:bg-accent/50 relative cursor-pointer rounded-md border p-3 transition-colors",
                  getItemSize(item.type),
                  "flex min-h-[100px] flex-col"
                )}
                onClick={() => {}}
              >
                <SortableItemHandle className="text-muted-foreground hover:text-foreground absolute end-1.5 top-2.5 z-10 opacity-0 transition-opacity group-hover:opacity-100">
                  <GripVerticalIcon className="h-3.5 w-3.5" />
                </SortableItemHandle>
                <div className="min-w-0 flex-1">
                  <h4 className="truncate text-sm font-medium">{item.title}</h4>
                  <p className="text-muted-foreground mt-0.5 truncate text-xs">{item.description}</p>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <Badge variant={getTypeColor(item.type)}>{item.type}</Badge>
                </div>
              </div>
            </SortableItem>
          ))}
        </Sortable>
      </div>
    );
  }
});

interface OptionValue {
  id: string;
  value: string;
}
interface OptionGroup {
  id: string;
  name: string;
  values: OptionValue[];
}
const defaultOptionGroups: OptionGroup[] = [
  {
    id: "1",
    name: "Colors",
    values: [
      { id: "1-1", value: "White" },
      { id: "1-2", value: "Black" },
      { id: "1-3", value: "Grey" },
      { id: "1-4", value: "Green" }
    ]
  },
  {
    id: "2",
    name: "Sizes",
    values: [
      { id: "2-1", value: "Small" },
      { id: "2-2", value: "Medium" },
      { id: "2-3", value: "Large" }
    ]
  },
  {
    id: "3",
    name: "Materials",
    values: [
      { id: "3-1", value: "Cotton" },
      { id: "3-2", value: "Polyester" },
      { id: "3-3", value: "Wool" }
    ]
  }
];

export const Nested = meta.story({
  render() {
    const [optionGroups, setOptionGroups] = React.useState<OptionGroup[]>(defaultOptionGroups);

    const handleParentReorder = (newGroups: OptionGroup[]) => {
      setOptionGroups(newGroups);
      toast.success("Option groups reordered successfully!", {
        description: `${newGroups.map((group, index) => `${index + 1}. ${group.name}`).join(", ")}`
      });
    };
    const getParentValue = (group: OptionGroup) => group.id;
    const getChildValue = (value: OptionValue) => value.id;
    const handleChildReorder = (groupId: string, newValues: OptionValue[]) => {
      setOptionGroups((prev) => prev.map((group) => (group.id === groupId ? { ...group, values: newValues } : group)));
      toast.success("Values reordered successfully!", {
        description: newValues.map((value, index) => `${index + 1}. ${value.value}`).join(", ")
      });
    };

    return (
      <div className="mx-auto w-full max-w-sm space-y-6 p-6">
        <Sortable
          value={optionGroups}
          onValueChange={handleParentReorder}
          getItemValue={getParentValue}
          strategy="vertical"
          className="space-y-4"
        >
          {optionGroups.map((group) => (
            <SortableItem key={group.id} value={group.id}>
              <Card className="p-2">
                <CardContent className="p-0">
                  {/* Group Header */}
                  <div className="mb-2 flex items-center gap-2">
                    <SortableItemHandle className="text-muted-foreground hover:text-foreground cursor-grab">
                      <GripVerticalIcon className="h-4 w-4" />
                    </SortableItemHandle>
                    <h3 className="text-sm font-semibold">{group.name}</h3>
                  </div>
                  {/* Option Values - Child Level */}
                  <Sortable
                    value={group.values}
                    onValueChange={(newValues) => handleChildReorder(group.id, newValues)}
                    getItemValue={getChildValue}
                    strategy="vertical"
                    className="space-y-2"
                  >
                    {group.values.map((value) => (
                      <SortableItem key={value.id} value={value.id}>
                        <div className="border-border flex items-center gap-2 rounded-md border p-1.5">
                          <SortableItemHandle className="text-muted-foreground hover:text-foreground cursor-grab">
                            <GripVerticalIcon className="h-4 w-4" />
                          </SortableItemHandle>
                          <span className="flex-1 text-sm">{value.value}</span>
                        </div>
                      </SortableItem>
                    ))}
                  </Sortable>
                </CardContent>
              </Card>
            </SortableItem>
          ))}
        </Sortable>
      </div>
    );
  }
});
