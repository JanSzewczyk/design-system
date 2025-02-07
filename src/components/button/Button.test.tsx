import "@testing-library/jest-dom";
import { expect, vi } from "vitest";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { TrashIcon } from "../../icons";

import { Button } from "./Button";

const mockedFn = vi.fn();

describe("Component > Button", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("renders correctly", async () => {
    render(<Button onClick={mockedFn}>Text</Button>);
    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("type", "button");
    expect(button).toHaveTextContent(/text/i);

    // Check if button is clickable
    await userEvent.click(button);
    expect(mockedFn).toHaveBeenCalled();
  });

  test("renders disabled", async () => {
    render(
      <Button onClick={mockedFn} disabled>
        Text
      </Button>
    );
    const button = screen.getByRole("button");

    expect(button).toHaveAttribute("type", "button");
    expect(button).toHaveAttribute("aria-disabled");
    expect(button).toBeDisabled();
    expect(button).toHaveTextContent(/text/i);

    // Check if button is not clickable
    await userEvent.click(button);
    expect(mockedFn).not.toHaveBeenCalled();
  });

  test("renders as link", async () => {
    render(
      <Button asChild onClick={mockedFn}>
        <a href="">Link</a>
      </Button>
    );
    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument();
    expect(button).not.toHaveAttribute("type", "button");
    expect(button).toHaveAttribute("href", "");
    expect(button).toHaveTextContent(/link/i);

    // Check if button is clickable
    await userEvent.click(button);
    expect(mockedFn).toHaveBeenCalled();
  });

  test("renders as disabled link", async () => {
    render(
      <Button disabled asChild onClick={mockedFn}>
        <a href="">Link</a>
      </Button>
    );
    const button = screen.getByRole("button");

    expect(button).not.toHaveAttribute("type", "button");
    expect(button).toHaveAttribute("aria-disabled");
    expect(button).toHaveAttribute("href", "");
    expect(button).toHaveTextContent(/link/i);
  });

  test("replace start icon with loading icon", async () => {
    render(
      <Button startIcon={<TrashIcon />} loading>
        Label
      </Button>
    );

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("type", "button");
    expect(button).toHaveAttribute("aria-disabled");
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("data-state", "loading");

    const loadingContainer = screen.getByRole("progressbar");
    expect(loadingContainer).toBeInTheDocument();
    expect(button).toContainElement(loadingContainer);

    const loadingIcon = screen.getByLabelText("Loading");
    expect(loadingIcon).toBeInTheDocument();
    expect(loadingContainer).toContainElement(loadingIcon);
  });
});
