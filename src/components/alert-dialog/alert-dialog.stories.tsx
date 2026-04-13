import { InfoIcon, Trash2Icon } from "lucide-react";

import { expect, screen } from "storybook/test";

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
  render: () => (
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
  )
});

BasicDialog.test("opens dialog on trigger click", async ({ userEvent }) => {
  const trigger = screen.getByRole("button", { name: "Show Dialog" });
  await userEvent.click(trigger);
  const dialog = screen.getByRole("alertdialog");
  await expect(dialog).toBeTruthy();
});

BasicDialog.test("renders content with data-slot attributes", async ({ userEvent }) => {
  const trigger = screen.getByRole("button", { name: "Show Dialog" });
  await userEvent.click(trigger);
  const dialog = screen.getByRole("alertdialog");
  await expect(dialog.getAttribute("data-slot")).toBe("alert-dialog-content");
  await expect(dialog.getAttribute("data-size")).toBe("default");
});

BasicDialog.test("renders header with data-slot", async ({ userEvent }) => {
  const trigger = screen.getByRole("button", { name: "Show Dialog" });
  await userEvent.click(trigger);
  const header = document.querySelector('[data-slot="alert-dialog-header"]');
  await expect(header).toBeTruthy();
});

BasicDialog.test("renders footer with data-slot", async ({ userEvent }) => {
  const trigger = screen.getByRole("button", { name: "Show Dialog" });
  await userEvent.click(trigger);
  const footer = document.querySelector('[data-slot="alert-dialog-footer"]');
  await expect(footer).toBeTruthy();
});

BasicDialog.test("renders title and description", async ({ userEvent }) => {
  const trigger = screen.getByRole("button", { name: "Show Dialog" });
  await userEvent.click(trigger);
  const title = document.querySelector('[data-slot="alert-dialog-title"]');
  const description = document.querySelector('[data-slot="alert-dialog-description"]');
  await expect(title?.textContent).toBe("Are you absolutely sure?");
  await expect(description).toBeTruthy();
});

BasicDialog.test("renders action and cancel buttons", async ({ userEvent }) => {
  const trigger = screen.getByRole("button", { name: "Show Dialog" });
  await userEvent.click(trigger);
  const action = document.querySelector('[data-slot="alert-dialog-action"]');
  const cancel = document.querySelector('[data-slot="alert-dialog-cancel"]');
  await expect(action?.textContent).toBe("Continue");
  await expect(cancel?.textContent).toBe("Cancel");
});

BasicDialog.test("cancel closes the dialog", async ({ userEvent }) => {
  const trigger = screen.getByRole("button", { name: "Show Dialog" });
  await userEvent.click(trigger);
  const cancel = screen.getByRole("button", { name: "Cancel" });
  await userEvent.click(cancel);
  await expect(screen.queryByRole("alertdialog")).toBeNull();
});

BasicDialog.test("action closes the dialog", async ({ userEvent }) => {
  const trigger = screen.getByRole("button", { name: "Show Dialog" });
  await userEvent.click(trigger);
  const action = screen.getByRole("button", { name: "Continue" });
  await userEvent.click(action);
  await expect(screen.queryByRole("alertdialog")).toBeNull();
});

BasicDialog.test("renders overlay with data-slot", async ({ userEvent }) => {
  const trigger = screen.getByRole("button", { name: "Show Dialog" });
  await userEvent.click(trigger);
  const overlay = document.querySelector('[data-slot="alert-dialog-overlay"]');
  await expect(overlay).toBeTruthy();
});

export const SmallDialog = meta.story({
  render: () => (
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
  )
});

SmallDialog.test("renders with data-size sm", async ({ userEvent }) => {
  const trigger = screen.getByRole("button", { name: "Show Small Dialog" });
  await userEvent.click(trigger);
  const dialog = screen.getByRole("alertdialog");
  await expect(dialog.getAttribute("data-size")).toBe("sm");
});

SmallDialog.test("cancel closes the small dialog", async ({ userEvent }) => {
  const trigger = screen.getByRole("button", { name: "Show Small Dialog" });
  await userEvent.click(trigger);
  const cancel = screen.getByRole("button", { name: "Don't allow" });
  await userEvent.click(cancel);
  await expect(screen.queryByRole("alertdialog")).toBeNull();
});

export const WithMedia = meta.story({
  render: () => (
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
  )
});

WithMedia.test("renders media with data-slot", async ({ userEvent }) => {
  const trigger = screen.getByRole("button", { name: "Share Project" });
  await userEvent.click(trigger);
  const media = document.querySelector('[data-slot="alert-dialog-media"]');
  await expect(media).toBeTruthy();
});

WithMedia.test("renders with default size", async ({ userEvent }) => {
  const trigger = screen.getByRole("button", { name: "Share Project" });
  await userEvent.click(trigger);
  const dialog = screen.getByRole("alertdialog");
  await expect(dialog.getAttribute("data-size")).toBe("default");
});

export const SmallWithMedia = meta.story({
  render: () => (
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
  )
});

SmallWithMedia.test("renders small dialog with media", async ({ userEvent }) => {
  const trigger = screen.getByRole("button", { name: "Show Small Media Dialog" });
  await userEvent.click(trigger);
  const dialog = screen.getByRole("alertdialog");
  await expect(dialog.getAttribute("data-size")).toBe("sm");
  const media = document.querySelector('[data-slot="alert-dialog-media"]');
  await expect(media).toBeTruthy();
});

export const DestructiveDialog = meta.story({
  render: () => (
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
  )
});

DestructiveDialog.test("renders destructive action with error variant", async ({ userEvent }) => {
  const trigger = screen.getByRole("button", { name: "Delete Chat" });
  await userEvent.click(trigger);
  const action = document.querySelector('[data-slot="alert-dialog-action"]');
  await expect(action).toBeTruthy();
  await expect(action?.textContent).toBe("Delete");
});

DestructiveDialog.test("renders media with error styling", async ({ userEvent }) => {
  const trigger = screen.getByRole("button", { name: "Delete Chat" });
  await userEvent.click(trigger);
  const media = document.querySelector('[data-slot="alert-dialog-media"]');
  await expect(media).toBeTruthy();
});

DestructiveDialog.test("cancel closes destructive dialog", async ({ userEvent }) => {
  const trigger = screen.getByRole("button", { name: "Delete Chat" });
  await userEvent.click(trigger);
  const cancel = screen.getByRole("button", { name: "Cancel" });
  await userEvent.click(cancel);
  await expect(screen.queryByRole("alertdialog")).toBeNull();
});
