import * as React from "react";

import {
  BadgeCheckIcon,
  BellIcon,
  Building2Icon,
  CreditCardIcon,
  DownloadIcon,
  EyeIcon,
  FileCodeIcon,
  FileIcon,
  FileTextIcon,
  FolderIcon,
  FolderOpenIcon,
  FolderSearchIcon,
  HelpCircleIcon,
  KeyboardIcon,
  LanguagesIcon,
  LayoutIcon,
  LogOutIcon,
  MailIcon,
  MessageSquareIcon,
  MonitorIcon,
  MoonIcon,
  MoreHorizontalIcon,
  PaletteIcon,
  PencilIcon,
  SaveIcon,
  SettingsIcon,
  ShareIcon,
  ShieldIcon,
  SunIcon,
  TrashIcon,
  UserIcon,
  WalletIcon
} from "lucide-react";

import { expect, screen, waitFor } from "storybook/test";

import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import { Button } from "../button";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from ".";

import preview from "~/.storybook/preview";

const meta = preview.meta({
  title: "Components/Dropdown Menu",
  component: DropdownMenu,
  tags: ["autodocs"],
  parameters: {
    docs: {
      subtitle:
        "Dropdown menu component built on Radix UI primitives. Displays a menu of actions or options triggered by a button. Supports items, checkbox items, radio items, sub-menus, labels, separators, and keyboard shortcuts."
    }
  },
  argTypes: {
    open: {
      control: "boolean",
      description: "The controlled open state of the dropdown menu.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "undefined" }
      }
    },
    defaultOpen: {
      control: "boolean",
      description: "The open state when initially rendered.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" }
      }
    },
    onOpenChange: {
      description: "Event handler called when the open state changes.",
      table: {
        type: { summary: "(open: boolean) => void" }
      }
    },
    modal: {
      control: "boolean",
      description: "Whether the dropdown menu is modal.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "true" }
      }
    }
  }
});

// -- Basic --------------------------------------------------------------------

export const Basic = meta.story({
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>GitHub</DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuItem disabled>API</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
});

Basic.test("trigger is visible and has correct data-slot", async ({ canvas }) => {
  const trigger = canvas.getByRole("button", { name: "Open" });
  await expect(trigger).toBeVisible();
  await expect(trigger).toHaveAttribute("data-slot", "dropdown-menu-trigger");
});

Basic.test("menu content is not mounted initially", async () => {
  await expect(document.querySelector('[data-slot="dropdown-menu-content"]')).not.toBeInTheDocument();
});

Basic.test("opens on trigger click and shows items", async ({ canvas, userEvent }) => {
  await userEvent.click(canvas.getByRole("button", { name: "Open" }));

  await waitFor(async () => {
    await expect(document.querySelector('[data-slot="dropdown-menu-content"]')).toBeVisible();
  });

  await expect(screen.getByText("My Account")).toBeVisible();
  await expect(screen.getByText("Profile")).toBeVisible();
  await expect(screen.getByText("Billing")).toBeVisible();
  await expect(screen.getByText("Settings")).toBeVisible();
  await expect(screen.getByText("GitHub")).toBeVisible();
  await expect(screen.getByText("Support")).toBeVisible();
});

Basic.test("disabled item is present", async ({ canvas, userEvent }) => {
  await userEvent.click(canvas.getByRole("button", { name: "Open" }));

  await waitFor(async () => {
    await expect(document.querySelector('[data-slot="dropdown-menu-content"]')).toBeVisible();
  });

  const apiItem = screen.getByText("API").closest('[data-slot="dropdown-menu-item"]');
  await expect(apiItem).toHaveAttribute("data-disabled", "");
});

Basic.test("closes with Escape key", async ({ canvas, userEvent }) => {
  await userEvent.click(canvas.getByRole("button", { name: "Open" }));
  await waitFor(async () => {
    await expect(document.querySelector('[data-slot="dropdown-menu-content"]')).toBeVisible();
  });

  await userEvent.keyboard("{Escape}");

  await waitFor(async () => {
    await expect(document.querySelector('[data-slot="dropdown-menu-content"]')).not.toBeInTheDocument();
  });
});

// -- Submenu ------------------------------------------------------------------

export const Submenu = meta.story({
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Email</DropdownMenuItem>
                <DropdownMenuItem>Message</DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>More options</DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem>Calendly</DropdownMenuItem>
                      <DropdownMenuItem>Slack</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Webhook</DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Advanced...</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem>
            New Team
            <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
});

Submenu.test("opens main menu with sub-trigger", async ({ canvas, userEvent }) => {
  await userEvent.click(canvas.getByRole("button", { name: "Open" }));

  await waitFor(async () => {
    await expect(document.querySelector('[data-slot="dropdown-menu-content"]')).toBeVisible();
  });

  await expect(screen.getByText("Invite users")).toBeVisible();
  await expect(document.querySelector('[data-slot="dropdown-menu-sub-trigger"]')).toBeInTheDocument();
});

// -- Shortcuts ----------------------------------------------------------------

export const Shortcuts = meta.story({
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuItem>
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Billing
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
});

Shortcuts.test("renders shortcuts", async ({ canvas, userEvent }) => {
  await userEvent.click(canvas.getByRole("button", { name: "Open" }));

  await waitFor(async () => {
    await expect(document.querySelector('[data-slot="dropdown-menu-content"]')).toBeVisible();
  });

  await expect(screen.getByText("⇧⌘P")).toBeVisible();
  await expect(screen.getByText("⌘B")).toBeVisible();
  await expect(screen.getByText("⌘S")).toBeVisible();
  await expect(screen.getByText("⇧⌘Q")).toBeVisible();
});

// -- Icons --------------------------------------------------------------------

export const Icons = meta.story({
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <UserIcon />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem>
          <CreditCardIcon />
          Billing
        </DropdownMenuItem>
        <DropdownMenuItem>
          <SettingsIcon />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="error">
          <LogOutIcon />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
});

Icons.test("renders items with icons", async ({ canvas, userEvent }) => {
  await userEvent.click(canvas.getByRole("button", { name: "Open" }));

  await waitFor(async () => {
    await expect(document.querySelector('[data-slot="dropdown-menu-content"]')).toBeVisible();
  });

  await expect(screen.getByText("Profile")).toBeVisible();
  await expect(screen.getByText("Billing")).toBeVisible();
  await expect(screen.getByText("Settings")).toBeVisible();
});

Icons.test("log out item has error variant", async ({ canvas, userEvent }) => {
  await userEvent.click(canvas.getByRole("button", { name: "Open" }));

  await waitFor(async () => {
    await expect(document.querySelector('[data-slot="dropdown-menu-content"]')).toBeVisible();
  });

  const logOutItem = screen.getByText("Log out").closest('[data-slot="dropdown-menu-item"]');
  await expect(logOutItem).toHaveAttribute("data-variant", "error");
});

// -- Checkboxes ---------------------------------------------------------------

export const Checkboxes = meta.story({
  render: function CheckboxesStory() {
    const [showStatusBar, setShowStatusBar] = React.useState(true);
    const [showActivityBar, setShowActivityBar] = React.useState(false);
    const [showPanel, setShowPanel] = React.useState(false);

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Open</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40">
          <DropdownMenuGroup>
            <DropdownMenuLabel>Appearance</DropdownMenuLabel>
            <DropdownMenuCheckboxItem checked={showStatusBar ?? false} onCheckedChange={setShowStatusBar}>
              Status Bar
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem checked={showActivityBar} onCheckedChange={setShowActivityBar} disabled>
              Activity Bar
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem checked={showPanel} onCheckedChange={setShowPanel}>
              Panel
            </DropdownMenuCheckboxItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
});

Checkboxes.test("opens and shows checkbox items", async ({ canvas, userEvent }) => {
  await userEvent.click(canvas.getByRole("button", { name: "Open" }));

  await waitFor(async () => {
    await expect(document.querySelector('[data-slot="dropdown-menu-content"]')).toBeVisible();
  });

  await expect(screen.getByText("Status Bar")).toBeVisible();
  await expect(screen.getByText("Activity Bar")).toBeVisible();
  await expect(screen.getByText("Panel")).toBeVisible();
});

Checkboxes.test("checkbox items have correct data-slot", async ({ canvas, userEvent }) => {
  await userEvent.click(canvas.getByRole("button", { name: "Open" }));

  await waitFor(async () => {
    await expect(document.querySelector('[data-slot="dropdown-menu-content"]')).toBeVisible();
  });

  const checkboxItems = document.querySelectorAll('[data-slot="dropdown-menu-checkbox-item"]');
  await expect(checkboxItems.length).toBe(3);
});

// -- CheckboxesIcons ----------------------------------------------------------

export const CheckboxesIcons = meta.story({
  render() {
    const [notifications, setNotifications] = React.useState({
      email: true,
      sms: false,
      push: true
    });

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Notifications</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48">
          <DropdownMenuGroup>
            <DropdownMenuLabel>Notification Preferences</DropdownMenuLabel>
            <DropdownMenuCheckboxItem
              checked={notifications.email}
              onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked === true })}
            >
              <MailIcon />
              Email notifications
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={notifications.sms}
              onCheckedChange={(checked) => setNotifications({ ...notifications, sms: checked === true })}
            >
              <MessageSquareIcon />
              SMS notifications
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={notifications.push}
              onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked === true })}
            >
              <BellIcon />
              Push notifications
            </DropdownMenuCheckboxItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
});

CheckboxesIcons.test("opens and shows checkbox items with icons", async ({ canvas, userEvent }) => {
  await userEvent.click(canvas.getByRole("button", { name: "Notifications" }));

  await waitFor(async () => {
    await expect(document.querySelector('[data-slot="dropdown-menu-content"]')).toBeVisible();
  });

  await expect(screen.getByText("Email notifications")).toBeVisible();
  await expect(screen.getByText("SMS notifications")).toBeVisible();
  await expect(screen.getByText("Push notifications")).toBeVisible();
});

// -- RadioGroup ---------------------------------------------------------------

export const RadioGroup = meta.story({
  render() {
    const [position, setPosition] = React.useState("bottom");

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Open</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-32">
          <DropdownMenuGroup>
            <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
            <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
              <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
});

RadioGroup.test("opens and shows radio items", async ({ canvas, userEvent }) => {
  await userEvent.click(canvas.getByRole("button", { name: "Open" }));

  await waitFor(async () => {
    await expect(document.querySelector('[data-slot="dropdown-menu-content"]')).toBeVisible();
  });

  await expect(screen.getByText("Top")).toBeVisible();
  await expect(screen.getByText("Bottom")).toBeVisible();
  await expect(screen.getByText("Right")).toBeVisible();
});

RadioGroup.test("radio items have correct data-slot", async ({ canvas, userEvent }) => {
  await userEvent.click(canvas.getByRole("button", { name: "Open" }));

  await waitFor(async () => {
    await expect(document.querySelector('[data-slot="dropdown-menu-content"]')).toBeVisible();
  });

  const radioItems = document.querySelectorAll('[data-slot="dropdown-menu-radio-item"]');
  await expect(radioItems.length).toBe(3);
});

// -- RadioIcons ---------------------------------------------------------------

export const RadioIcons = meta.story({
  render() {
    const [paymentMethod, setPaymentMethod] = React.useState("card");

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Payment Method</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-56">
          <DropdownMenuGroup>
            <DropdownMenuLabel>Select Payment Method</DropdownMenuLabel>
            <DropdownMenuRadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              <DropdownMenuRadioItem value="card">
                <CreditCardIcon />
                Credit Card
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="paypal">
                <WalletIcon />
                PayPal
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="bank">
                <Building2Icon />
                Bank Transfer
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
});

RadioIcons.test("opens and shows radio items with icons", async ({ canvas, userEvent }) => {
  await userEvent.click(canvas.getByRole("button", { name: "Payment Method" }));

  await waitFor(async () => {
    await expect(document.querySelector('[data-slot="dropdown-menu-content"]')).toBeVisible();
  });

  await expect(screen.getByText("Credit Card")).toBeVisible();
  await expect(screen.getByText("PayPal")).toBeVisible();
  await expect(screen.getByText("Bank Transfer")).toBeVisible();
});

// -- Error --------------------------------------------------------------

export const Error = meta.story({
  render() {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Actions</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <PencilIcon />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem>
              <ShareIcon />
              Share
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem variant="error">
              <TrashIcon />
              Delete
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
});

Error.test("renders error variant item with correct data-variant", async ({ canvas, userEvent }) => {
  await userEvent.click(canvas.getByRole("button", { name: "Actions" }));

  await waitFor(async () => {
    await expect(document.querySelector('[data-slot="dropdown-menu-content"]')).toBeVisible();
  });

  const errorItem = document.querySelector('[data-slot="dropdown-menu-item"][data-variant="error"]');
  await expect(errorItem).toBeInTheDocument();
  await expect(errorItem).toHaveTextContent("Delete");
});

Error.test("non-error items have default variant", async ({ canvas, userEvent }) => {
  await userEvent.click(canvas.getByRole("button", { name: "Actions" }));

  await waitFor(async () => {
    await expect(document.querySelector('[data-slot="dropdown-menu-content"]')).toBeVisible();
  });

  const defaultItems = document.querySelectorAll('[data-slot="dropdown-menu-item"][data-variant="default"]');
  await expect(defaultItems.length).toBe(2);
});

// -- AvatarDemo ---------------------------------------------------------------

export const AvatarDemo = meta.story({
  render() {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
              <AvatarFallback>LR</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <BadgeCheckIcon />
              Account
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CreditCardIcon />
              Billing
            </DropdownMenuItem>
            <DropdownMenuItem>
              <BellIcon />
              Notifications
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <LogOutIcon />
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
});

AvatarDemo.test("trigger with avatar is visible", async ({ canvas }) => {
  const trigger = canvas.getByRole("button");
  await expect(trigger).toBeVisible();
});

AvatarDemo.test("opens and shows user info", async ({ canvas, userEvent }) => {
  await userEvent.click(canvas.getByRole("button"));

  await waitFor(async () => {
    await expect(document.querySelector('[data-slot="dropdown-menu-content"]')).toBeVisible();
  });

  await expect(screen.getByText("Account")).toBeVisible();
  await expect(screen.getByText("Sign Out")).toBeVisible();
});

// -- Complex ------------------------------------------------------------------

export const Complex = meta.story({
  render() {
    const [notifications, setNotifications] = React.useState({
      email: true,
      sms: false,
      push: true
    });
    const [theme, setTheme] = React.useState("light");

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Complex Menu</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-44">
          <DropdownMenuGroup>
            <DropdownMenuLabel>File</DropdownMenuLabel>
            <DropdownMenuItem>
              <FileIcon />
              New File
              <DropdownMenuShortcut>⌘N</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <FolderIcon />
              New Folder
              <DropdownMenuShortcut>⇧⌘N</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <FolderOpenIcon />
                Open Recent
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>Recent Projects</DropdownMenuLabel>
                    <DropdownMenuItem>
                      <FileCodeIcon />
                      Project Alpha
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <FileCodeIcon />
                      Project Beta
                    </DropdownMenuItem>
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger>
                        <MoreHorizontalIcon />
                        More Projects
                      </DropdownMenuSubTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                          <DropdownMenuItem>
                            <FileCodeIcon />
                            Project Gamma
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <FileCodeIcon />
                            Project Delta
                          </DropdownMenuItem>
                        </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                    </DropdownMenuSub>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <FolderSearchIcon />
                      Browse...
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <SaveIcon />
              Save
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <DownloadIcon />
              Export
              <DropdownMenuShortcut>⇧⌘E</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuLabel>View</DropdownMenuLabel>
            <DropdownMenuCheckboxItem
              checked={notifications.email}
              onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked === true })}
            >
              <EyeIcon />
              Show Sidebar
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={notifications.sms}
              onCheckedChange={(checked) => setNotifications({ ...notifications, sms: checked === true })}
            >
              <LayoutIcon />
              Show Status Bar
            </DropdownMenuCheckboxItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <PaletteIcon />
                Theme
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>Appearance</DropdownMenuLabel>
                    <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
                      <DropdownMenuRadioItem value="light">
                        <SunIcon />
                        Light
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="dark">
                        <MoonIcon />
                        Dark
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="system">
                        <MonitorIcon />
                        System
                      </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuGroup>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuLabel>Account</DropdownMenuLabel>
            <DropdownMenuItem>
              <UserIcon />
              Profile
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CreditCardIcon />
              Billing
            </DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <SettingsIcon />
                Settings
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>Preferences</DropdownMenuLabel>
                    <DropdownMenuItem>
                      <KeyboardIcon />
                      Keyboard Shortcuts
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <LanguagesIcon />
                      Language
                    </DropdownMenuItem>
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger>
                        <BellIcon />
                        Notifications
                      </DropdownMenuSubTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                          <DropdownMenuGroup>
                            <DropdownMenuLabel>Notification Types</DropdownMenuLabel>
                            <DropdownMenuCheckboxItem
                              checked={notifications.push}
                              onCheckedChange={(checked) =>
                                setNotifications({
                                  ...notifications,
                                  push: checked === true
                                })
                              }
                            >
                              <BellIcon />
                              Push Notifications
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem
                              checked={notifications.email}
                              onCheckedChange={(checked) =>
                                setNotifications({
                                  ...notifications,
                                  email: checked === true
                                })
                              }
                            >
                              <MailIcon />
                              Email Notifications
                            </DropdownMenuCheckboxItem>
                          </DropdownMenuGroup>
                        </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                    </DropdownMenuSub>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <ShieldIcon />
                      Privacy & Security
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <HelpCircleIcon />
              Help & Support
            </DropdownMenuItem>
            <DropdownMenuItem>
              <FileTextIcon />
              Documentation
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem variant="error">
              <LogOutIcon />
              Sign Out
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
});

Complex.test("opens and shows all sections", async ({ canvas, userEvent }) => {
  await userEvent.click(canvas.getByRole("button", { name: "Complex Menu" }));

  await waitFor(async () => {
    await expect(document.querySelector('[data-slot="dropdown-menu-content"]')).toBeVisible();
  });

  await expect(screen.getByText("File")).toBeVisible();
  await expect(screen.getByText("View")).toBeVisible();
  await expect(screen.getByText("Show Sidebar")).toBeVisible();
  await expect(screen.getByText("Account")).toBeVisible();
  await expect(screen.getByText("Billing")).toBeVisible();
  await expect(screen.getByText("Help & Support")).toBeVisible();
});

Complex.test("has checkbox, radio, and regular items", async ({ canvas, userEvent }) => {
  await userEvent.click(canvas.getByRole("button", { name: "Complex Menu" }));

  await waitFor(async () => {
    await expect(document.querySelector('[data-slot="dropdown-menu-content"]')).toBeVisible();
  });

  const checkboxItems = document.querySelectorAll('[data-slot="dropdown-menu-checkbox-item"]');
  await expect(checkboxItems.length).toBe(2);

  // Radio items live inside the Theme sub-menu (not yet open); verify sub-trigger is present
  await expect(screen.getByText("Theme")).toBeVisible();

  const errorItem = document.querySelector('[data-slot="dropdown-menu-item"][data-variant="error"]');
  await expect(errorItem).toBeInTheDocument();
});
