import * as React from "react";

import {
  AnchorIcon,
  AudioWaveformIcon,
  BookOpen,
  BotIcon,
  CameraIcon,
  ChartBarIcon,
  ChevronRightIcon,
  ChevronsUpDownIcon,
  CommandIcon,
  CreditCardIcon,
  DatabaseIcon,
  DotSquareIcon,
  FileIcon,
  FolderIcon,
  ForwardIcon,
  FrameIcon,
  GalleryVerticalEnd,
  HammerIcon,
  HelpCircleIcon,
  HomeIcon,
  LogOutIcon,
  MailboxIcon,
  MapIcon,
  MoreHorizontalIcon,
  OptionIcon,
  PieChartIcon,
  PlusCircleIcon,
  PlusIcon,
  SearchIcon,
  Settings2Icon,
  SettingsIcon,
  ShareIcon,
  SquareTerminalIcon,
  Trash2Icon,
  TrashIcon,
  UserCircleIcon,
  UsersIcon
} from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuShortcut
} from "~/components";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "~/components/dropdown-menu";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar
} from ".";

import preview from "~/.storybook/preview";

const meta = preview.meta({
  title: "Components/Sidebar",
  component: Sidebar,
  tags: ["autodocs"],
  parameters: {
    docs: {
      subtitle: "A composable sidebar navigation component with mobile support and collapsible states."
    },
    layout: "fullscreen"
  },
  decorators: [
    (Story) => (
      <SidebarProvider>
        <Story />
        <SidebarInset>
          <header className="flex h-14 items-center gap-2 border-b px-4">
            <SidebarTrigger />
            <span className="text-sm font-medium">Main Content</span>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-6">
            <p className="text-muted-foreground text-sm">Select an item from the sidebar to get started.</p>
          </div>
        </SidebarInset>
      </SidebarProvider>
    )
  ]
});

export const VariantSidebar = meta.story({
  args: {
    variant: "sidebar"
  },
  render(args) {
    return <Sidebar {...args}></Sidebar>;
  }
});

export const VariantFloating = meta.story({
  args: {
    variant: "floating"
  },
  render(args) {
    return <Sidebar {...args}>asssaa sda sda</Sidebar>;
  }
});

export const VariantInset = meta.story({
  args: {
    variant: "inset"
  },
  render(args) {
    return <Sidebar {...args}>asssaa sda sda</Sidebar>;
  }
});

export const CollapsibleOffcanvas = meta.story({
  args: {
    collapsible: "offcanvas"
  },
  render(args) {
    return <Sidebar {...args}>asssaa sda sda</Sidebar>;
  }
});

export const CollapsibleIcon = meta.story({
  args: {
    collapsible: "icon"
  },
  render(args) {
    return <Sidebar {...args}>asssaa sda sda</Sidebar>;
  }
});

export const CollapsibleNone = meta.story({
  args: {
    collapsible: "none"
  },
  render(args) {
    return <Sidebar {...args}>asssaa sda sda</Sidebar>;
  }
});

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "https://i.pravatar.cc/300"
  },
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: HomeIcon
    },
    {
      title: "Lifecycle",
      url: "#",
      icon: AnchorIcon
    },
    {
      title: "Analytics",
      url: "#",
      icon: ChartBarIcon
    },
    {
      title: "Projects",
      url: "#",
      icon: FileIcon
    },
    {
      title: "Team",
      url: "#",
      icon: UsersIcon
    }
  ],
  navClouds: [
    {
      title: "Capture",
      icon: CameraIcon,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#"
        },
        {
          title: "Archived",
          url: "#"
        }
      ]
    },
    {
      title: "Proposal",
      icon: FileIcon,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#"
        },
        {
          title: "Archived",
          url: "#"
        }
      ]
    },
    {
      title: "Prompts",
      icon: FileIcon,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#"
        },
        {
          title: "Archived",
          url: "#"
        }
      ]
    }
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: SettingsIcon
    },
    {
      title: "Get Help",
      url: "#",
      icon: HelpCircleIcon
    },
    {
      title: "Search",
      url: "#",
      icon: SearchIcon
    }
  ],
  documents: [
    {
      name: "Data Library",
      url: "#",
      icon: DatabaseIcon
    },
    {
      name: "Reports",
      url: "#",
      icon: FileIcon
    },
    {
      name: "Word Assistant",
      url: "#",
      icon: FileIcon
    }
  ]
};

export const WithGroups = meta.story({
  render(args) {
    const { isMobile } = useSidebar();

    return (
      <Sidebar {...args}>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="#">
                  <HammerIcon className="size-5!" />
                  <span className="text-base font-semibold">Acme Inc.</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent className="flex flex-col gap-2">
              <SidebarMenu>
                <SidebarMenuItem className="flex items-center gap-2">
                  <SidebarMenuButton
                    tooltip="Quick Create"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"
                  >
                    <PlusCircleIcon />
                    <span>Quick Create</span>
                  </SidebarMenuButton>
                  <Button size="icon" className="size-8 group-data-[collapsible=icon]:opacity-0" variant="outline">
                    <MailboxIcon />
                    <span className="sr-only">Inbox</span>
                  </Button>
                </SidebarMenuItem>
              </SidebarMenu>
              <SidebarMenu>
                {data.navMain.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton tooltip={item.title}>
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarGroupLabel>Documents</SidebarGroupLabel>
            <SidebarMenu>
              {data.documents.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.name}</span>
                    </a>
                  </SidebarMenuButton>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <SidebarMenuAction showOnHover className="data-[state=open]:bg-accent">
                        <OptionIcon />
                        <span className="sr-only">More</span>
                      </SidebarMenuAction>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-24 rounded-lg"
                      side={isMobile ? "bottom" : "right"}
                      align={isMobile ? "end" : "start"}
                    >
                      <DropdownMenuItem>
                        <FolderIcon />
                        <span>Open</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <ShareIcon />
                        <span>Share</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem variant="error">
                        <TrashIcon />
                        <span>Delete</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <SidebarMenuButton className="text-sidebar-foreground/70">
                  <DotSquareIcon className="text-sidebar-foreground/70" />
                  <span>More</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>

          <SidebarGroup className="mt-auto">
            <SidebarGroupContent>
              <SidebarMenu>
                {data.navSecondary.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        {/* Footer */}
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  >
                    <Avatar className="size-8 grayscale">
                      <AvatarImage src={data.user.avatar} alt={data.user.name} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-medium">{data.user.name}</span>
                      <span className="text-muted-foreground truncate text-xs">{data.user.email}</span>
                    </div>
                    <OptionIcon className="ml-auto size-4" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded"
                  side={isMobile ? "bottom" : "right"}
                  align="end"
                  sideOffset={4}
                >
                  <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                      <Avatar className="size-8">
                        <AvatarImage src={data.user.avatar} alt={data.user.name} />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="text-foreground truncate font-medium">{data.user.name}</span>
                        <span className="text-muted-foreground truncate text-xs">{data.user.email}</span>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <UserCircleIcon />
                      Account
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <CreditCardIcon />
                      Billing
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <MailboxIcon />
                      Notifications
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOutIcon />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    );
  }
});

// -- WithSubmenus ----------------------------------------------------------

const submenusData = {
  navMain: [
    {
      title: "Getting Started",
      url: "#",
      items: [
        {
          title: "Installation",
          url: "#"
        },
        {
          title: "Project Structure",
          url: "#"
        }
      ]
    },
    {
      title: "Build Your Application",
      url: "#",
      items: [
        {
          title: "Routing",
          url: "#"
        },
        {
          title: "Data Fetching",
          url: "#",
          isActive: true
        },
        {
          title: "Rendering",
          url: "#"
        },
        {
          title: "Caching",
          url: "#"
        },
        {
          title: "Styling",
          url: "#"
        },
        {
          title: "Optimizing",
          url: "#"
        },
        {
          title: "Configuring",
          url: "#"
        },
        {
          title: "Testing",
          url: "#"
        },
        {
          title: "Authentication",
          url: "#"
        },
        {
          title: "Deploying",
          url: "#"
        },
        {
          title: "Upgrading",
          url: "#"
        },
        {
          title: "Examples",
          url: "#"
        }
      ]
    },
    {
      title: "API Reference",
      url: "#",
      items: [
        {
          title: "Components",
          url: "#"
        },
        {
          title: "File Conventions",
          url: "#"
        },
        {
          title: "Functions",
          url: "#"
        },
        {
          title: "next.config.js Options",
          url: "#"
        },
        {
          title: "CLI",
          url: "#"
        },
        {
          title: "Edge Runtime",
          url: "#"
        }
      ]
    },
    {
      title: "Architecture",
      url: "#",
      items: [
        {
          title: "Accessibility",
          url: "#"
        },
        {
          title: "Fast Refresh",
          url: "#"
        },
        {
          title: "Next.js Compiler",
          url: "#"
        },
        {
          title: "Supported Browsers",
          url: "#"
        },
        {
          title: "Turbopack",
          url: "#"
        }
      ]
    },
    {
      title: "Community",
      url: "#",
      items: [
        {
          title: "Contribution Guide",
          url: "#"
        }
      ]
    }
  ]
};

export const WithSubmenus = meta.story({
  render(args) {
    return (
      <Sidebar {...args}>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <a href="#">
                  <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                    <GalleryVerticalEnd className="size-4" />
                  </div>
                  <div className="flex flex-col gap-0.5 leading-none">
                    <span className="font-medium">Documentation</span>
                    <span className="">v1.0.0</span>
                  </div>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              {submenusData.navMain.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="font-medium">
                      {item.title}
                    </a>
                  </SidebarMenuButton>
                  {item.items?.length ? (
                    <SidebarMenuSub>
                      {item.items.map((item) => (
                        <SidebarMenuSubItem key={item.title}>
                          <SidebarMenuSubButton asChild isActive={item.isActive}>
                            <a href={item.url}>{item.title}</a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  ) : null}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
    );
  }
});

// -- WithCollapsibleSumMenus ----------------------------------------------------------

const collapsibleData = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "https://i.pravatar.cc/300"
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise"
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveformIcon,
      plan: "Startup"
    },
    {
      name: "Evil Corp.",
      logo: CommandIcon,
      plan: "Free"
    }
  ],
  navMain: [
    {
      title: "Playground",
      url: "#",
      icon: SquareTerminalIcon,
      isActive: true,
      items: [
        {
          title: "History",
          url: "#"
        },
        {
          title: "Starred",
          url: "#"
        },
        {
          title: "Settings",
          url: "#"
        }
      ]
    },
    {
      title: "Models",
      url: "#",
      icon: BotIcon,
      items: [
        {
          title: "Genesis",
          url: "#"
        },
        {
          title: "Explorer",
          url: "#"
        },
        {
          title: "Quantum",
          url: "#"
        }
      ]
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#"
        },
        {
          title: "Get Started",
          url: "#"
        },
        {
          title: "Tutorials",
          url: "#"
        },
        {
          title: "Changelog",
          url: "#"
        }
      ]
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2Icon,
      items: [
        {
          title: "General",
          url: "#"
        },
        {
          title: "Team",
          url: "#"
        },
        {
          title: "Billing",
          url: "#"
        },
        {
          title: "Limits",
          url: "#"
        }
      ]
    }
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: FrameIcon
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChartIcon
    },
    {
      name: "Travel",
      url: "#",
      icon: MapIcon
    }
  ]
};

export const WithCollapsibleSumMenus = meta.story({
  render(args) {
    const { isMobile } = useSidebar();
    const [activeTeam, setActiveTeam] = React.useState(collapsibleData.teams[0]);

    return (
      <Sidebar {...args}>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  >
                    <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded">
                      <activeTeam.logo className="size-4" />
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-medium">{activeTeam.name}</span>
                      <span className="truncate text-xs">{activeTeam.plan}</span>
                    </div>
                    <ChevronsUpDownIcon className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                  align="start"
                  side={isMobile ? "bottom" : "right"}
                  sideOffset={4}
                >
                  <DropdownMenuLabel>Teams</DropdownMenuLabel>
                  {collapsibleData.teams.map((team, index) => (
                    <DropdownMenuItem key={team.name} onClick={() => setActiveTeam(team)} className="gap-2 p-2">
                      <div className="flex size-6 items-center justify-center rounded border">
                        <team.logo className="size-3.5 shrink-0" />
                      </div>
                      {team.name}
                      <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="gap-2 p-2">
                    <div className="flex size-6 items-center justify-center rounded border bg-transparent">
                      <PlusIcon className="size-4" />
                    </div>
                    <div className="text-muted-foreground font-medium">Add team</div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
              {collapsibleData.navMain.map((item) => (
                <Collapsible key={item.title} asChild defaultOpen={item.isActive} className="group/collapsible">
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton tooltip={item.title} isActive={item.isActive}>
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                        <ChevronRightIcon className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items?.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton asChild>
                              <a href={subItem.url}>
                                <span>{subItem.title}</span>
                              </a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroup>

          <SidebarSeparator />

          <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarGroupLabel>Projects</SidebarGroupLabel>
            <SidebarMenu>
              {collapsibleData.projects.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.name}</span>
                    </a>
                  </SidebarMenuButton>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <SidebarMenuAction showOnHover>
                        <MoreHorizontalIcon />
                        <span className="sr-only">More</span>
                      </SidebarMenuAction>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-48 rounded-lg"
                      side={isMobile ? "bottom" : "right"}
                      align={isMobile ? "end" : "start"}
                    >
                      <DropdownMenuItem>
                        <FolderIcon className="text-muted-foreground" />
                        <span>View Project</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <ForwardIcon className="text-muted-foreground" />
                        <span>Share Project</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Trash2Icon className="text-muted-foreground" />
                        <span>Delete Project</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <SidebarMenuButton className="text-sidebar-foreground/70">
                  <MoreHorizontalIcon className="text-sidebar-foreground/70" />
                  <span>More</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    );
  }
});
