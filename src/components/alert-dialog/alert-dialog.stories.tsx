import { InfoIcon, Trash2Icon } from "lucide-react";

import { expect, screen, waitFor } from "storybook/test";

import { Button } from "../button";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger
} from ".";

import preview from "~/.storybook/preview";

const meta = preview.meta({
  title: "Components/Alert Dialog",
  component: AlertDialog,
  subcomponents: {
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogMedia
  }
});

export const BasicDialog = meta.story({
  render() {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline">Show Dialog</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your account and remove your data from our
              servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }
});

BasicDialog.test("Renders all expected content", async ({ canvas, userEvent, step }) => {
  await step("Trigger button is visible", async () => {
    await expect(canvas.getByRole("button", { name: "Show Dialog" })).toBeVisible();
  });

  await step("Open dialog", async () => {
    await userEvent.click(canvas.getByRole("button", { name: "Show Dialog" }));
    await waitFor(() => expect(screen.getByRole("alertdialog")).toBeVisible());
  });

  await step("Content has correct data-slot and data-size", async () => {
    const dialog = screen.getByRole("alertdialog");
    await expect(dialog).toHaveAttribute("data-slot", "alert-dialog-content");
    await expect(dialog).toHaveAttribute("data-size", "default");
  });

  await step("Overlay is rendered", async () => {
    await expect(document.querySelector('[data-slot="alert-dialog-overlay"]')).toBeInTheDocument();
  });

  await step("Header, footer, title and description are rendered", async () => {
    await expect(document.querySelector('[data-slot="alert-dialog-header"]')).toBeInTheDocument();
    await expect(document.querySelector('[data-slot="alert-dialog-footer"]')).toBeInTheDocument();
    const title = document.querySelector('[data-slot="alert-dialog-title"]');
    await expect(title).toBeInTheDocument();
    await expect(title?.textContent).toBe("Are you absolutely sure?");
    await expect(document.querySelector('[data-slot="alert-dialog-description"]')).toBeInTheDocument();
  });

  await step("Action and cancel buttons are rendered", async () => {
    await waitFor(() => expect(screen.getByRole("button", { name: "Continue" })).toBeVisible());
    await waitFor(() => expect(screen.getByRole("button", { name: "Cancel" })).toBeVisible());
  });
});

BasicDialog.test("Cancel closes the dialog", async ({ canvas, userEvent, step }) => {
  await step("Open dialog", async () => {
    await userEvent.click(canvas.getByRole("button", { name: "Show Dialog" }));
    await waitFor(() => expect(screen.getByRole("alertdialog")).toBeVisible());
  });

  await step("Click cancel and verify closed", async () => {
    await userEvent.click(screen.getByRole("button", { name: "Cancel" }));
    await waitFor(() => expect(screen.queryByRole("alertdialog")).toBeNull());
  });
});

BasicDialog.test("Action closes the dialog", async ({ canvas, userEvent, step }) => {
  await step("Open dialog", async () => {
    await userEvent.click(canvas.getByRole("button", { name: "Show Dialog" }));
    await waitFor(() => expect(screen.getByRole("alertdialog")).toBeVisible());
  });

  await step("Click action and verify closed", async () => {
    await userEvent.click(screen.getByRole("button", { name: "Continue" }));
    await waitFor(() => expect(screen.queryByRole("alertdialog")).toBeNull());
  });
});

export const SmallDialog = meta.story({
  render() {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline">Show Small Dialog</Button>
        </AlertDialogTrigger>
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogTitle>Allow accessory to connect?</AlertDialogTitle>
            <AlertDialogDescription>
              Do you want to allow the USB accessory to connect to this device?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Don&apos;t allow</AlertDialogCancel>
            <AlertDialogAction>Allow</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }
});

SmallDialog.test("Renders with data-size sm", async ({ canvas, userEvent }) => {
  await userEvent.click(canvas.getByRole("button", { name: "Show Small Dialog" }));
  const dialog = screen.getByRole("alertdialog");
  await expect(dialog).toHaveAttribute("data-size", "sm");
});

SmallDialog.test("Cancel closes the small dialog", async ({ canvas, userEvent, step }) => {
  await step("Open dialog", async () => {
    await userEvent.click(canvas.getByRole("button", { name: "Show Small Dialog" }));
    await waitFor(() => expect(screen.getByRole("alertdialog")).toBeVisible());
  });

  await step("Click cancel and verify closed", async () => {
    await userEvent.click(screen.getByRole("button", { name: "Don't allow" }));
    await waitFor(() => expect(screen.queryByRole("alertdialog")).toBeNull());
  });
});

export const WithMedia = meta.story({
  render() {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline">Share Project</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogMedia>
              <InfoIcon />
            </AlertDialogMedia>
            <AlertDialogTitle>Share this project?</AlertDialogTitle>
            <AlertDialogDescription>
              Anyone with the link will be able to view and edit this project.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Share</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }
});

WithMedia.test("Renders all expected content", async ({ canvas, userEvent, step }) => {
  await userEvent.click(canvas.getByRole("button", { name: "Share Project" }));

  await step("Dialog has default size", async () => {
    const dialog = screen.getByRole("alertdialog");
    await expect(dialog).toHaveAttribute("data-size", "default");
  });

  await step("Media is rendered", async () => {
    await expect(document.querySelector('[data-slot="alert-dialog-media"]')).toBeInTheDocument();
  });
});

export const SmallWithMedia = meta.story({
  render() {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline">Show Small Media Dialog</Button>
        </AlertDialogTrigger>
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogMedia>
              <InfoIcon />
            </AlertDialogMedia>
            <AlertDialogTitle>Allow accessory to connect?</AlertDialogTitle>
            <AlertDialogDescription>
              Do you want to allow the USB accessory to connect to this device?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Don&apos;t allow</AlertDialogCancel>
            <AlertDialogAction>Allow</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }
});

SmallWithMedia.test("Renders all expected content", async ({ canvas, userEvent, step }) => {
  await userEvent.click(canvas.getByRole("button", { name: "Show Small Media Dialog" }));

  await step("Dialog has sm size", async () => {
    const dialog = screen.getByRole("alertdialog");
    await expect(dialog).toHaveAttribute("data-size", "sm");
  });

  await step("Media is rendered", async () => {
    await expect(document.querySelector('[data-slot="alert-dialog-media"]')).toBeInTheDocument();
  });
});

export const DestructiveDialog = meta.story({
  render() {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="error">Delete Chat</Button>
        </AlertDialogTrigger>
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogMedia className="bg-error/10 text-error dark:bg-error/20 dark:text-error">
              <Trash2Icon />
            </AlertDialogMedia>
            <AlertDialogTitle>Delete chat?</AlertDialogTitle>
            <AlertDialogDescription>This will permanently delete this chat conversation.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction variant="error">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }
});

DestructiveDialog.test("Renders all expected content", async ({ canvas, userEvent, step }) => {
  await userEvent.click(canvas.getByRole("button", { name: "Delete Chat" }));
  await waitFor(() => expect(screen.getByRole("alertdialog")).toBeVisible());

  await step("Destructive action button is rendered", async () => {
    await waitFor(() => expect(screen.getByRole("button", { name: "Delete" })).toBeVisible());
  });

  await step("Media is rendered", async () => {
    await expect(document.querySelector('[data-slot="alert-dialog-media"]')).toBeInTheDocument();
  });
});

DestructiveDialog.test("Cancel closes destructive dialog", async ({ canvas, userEvent, step }) => {
  await step("Open dialog", async () => {
    await userEvent.click(canvas.getByRole("button", { name: "Delete Chat" }));
    await waitFor(() => expect(screen.getByRole("alertdialog")).toBeVisible());
  });

  await step("Click cancel and verify closed", async () => {
    await userEvent.click(screen.getByRole("button", { name: "Cancel" }));
    await waitFor(() => expect(screen.queryByRole("alertdialog")).toBeNull());
  });
});
