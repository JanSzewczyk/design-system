import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, vi } from "vitest";

import ButtonComponent from "./Button";

import { IconTrash } from "../../icons";

const mockedFn = vi.fn();

describe("Component > Button", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("renders correctly", async () => {
    render(<ButtonComponent onClick={mockedFn}>Text</ButtonComponent>);
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
      <ButtonComponent onClick={mockedFn} disabled>
        Text
      </ButtonComponent>
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
      <ButtonComponent as="a" href="" onClick={mockedFn}>
        Link
      </ButtonComponent>
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
      <ButtonComponent as="a" disabled href="" onClick={mockedFn}>
        Link
      </ButtonComponent>
    );
    const button = screen.getByRole("button");

    expect(button).not.toHaveAttribute("type", "button");
    expect(button).toHaveAttribute("aria-disabled");
    expect(button).toHaveAttribute("href", "");
    expect(button).toHaveTextContent(/link/i);
  });

  test("replace start icon with loading icon", async () => {
    render(
      <ButtonComponent startIcon={<IconTrash />} loading>
        Label
      </ButtonComponent>
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
