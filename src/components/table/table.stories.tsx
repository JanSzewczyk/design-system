import { MoreHorizontalIcon } from "lucide-react";

import { Button } from "dist/components";
import { expect } from "storybook/test";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "../dropdown-menu";

import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "./";

import preview from "~/.storybook/preview";

const meta = preview.meta({
  title: "Components/Table",
  component: Table
});

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card"
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal"
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer"
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card"
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal"
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer"
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card"
  }
];

export const BasicTable = meta.story({
  name: "Basic Table",
  render() {
    return (
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.invoice}>
              <TableCell className="font-medium">{invoice.invoice}</TableCell>
              <TableCell>{invoice.paymentStatus}</TableCell>
              <TableCell>{invoice.paymentMethod}</TableCell>
              <TableCell className="text-right">{invoice.totalAmount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    );
  }
});

BasicTable.test("Renders table with correct data-slot", async ({ canvas }) => {
  const table = canvas.getByRole("table");
  await expect(table).toHaveAttribute("data-slot", "table");
});

BasicTable.test("Renders table container with data-slot", async ({ canvas }) => {
  const table = canvas.getByRole("table");
  const container = table.closest("[data-slot='table-container']");
  await expect(container).not.toBeNull();
});

BasicTable.test("Renders header with data-slot", async ({ canvas }) => {
  const table = canvas.getByRole("table");
  const header = table.querySelector("thead");
  await expect(header).not.toBeNull();
  await expect(header).toHaveAttribute("data-slot", "table-header");
});

BasicTable.test("Renders column headers", async ({ canvas }) => {
  const headers = canvas.getAllByRole("columnheader");
  await expect(headers).toHaveLength(3);
  await expect(headers[0]).toHaveTextContent("Name");
  await expect(headers[1]).toHaveTextContent("Email");
  await expect(headers[2]).toHaveTextContent("Role");
});

BasicTable.test("Headers have data-slot attribute", async ({ canvas }) => {
  const headers = canvas.getAllByRole("columnheader");
  for (const header of headers) {
    await expect(header).toHaveAttribute("data-slot", "table-head");
  }
});

BasicTable.test("Renders rows with data-slot", async ({ canvas }) => {
  const rows = canvas.getAllByRole("row");
  for (const row of rows) {
    await expect(row).toHaveAttribute("data-slot", "table-row");
  }
});

BasicTable.test("Renders cells with data-slot", async ({ canvas }) => {
  const cells = canvas.getAllByRole("cell");
  await expect(cells).toHaveLength(6);
  for (const cell of cells) {
    await expect(cell).toHaveAttribute("data-slot", "table-cell");
  }
});

BasicTable.test("Custom className is applied to header cell", async ({ canvas }) => {
  const roleHeader = canvas.getByRole("columnheader", { name: /role/i });
  await expect(roleHeader).toHaveClass("text-right");
});

BasicTable.test("Custom className is applied to cell", async ({ canvas }) => {
  const cell = canvas.getByText("Alice").closest("td");
  await expect(cell).toHaveClass("font-medium");
});

export const WithCaption = meta.story({
  name: "With Caption",
  render() {
    return (
      <Table>
        <TableCaption>A list of recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  }
});

WithCaption.test("Renders caption with data-slot", async ({ canvas }) => {
  const caption = canvas.getByText("A list of recent invoices.");
  await expect(caption).toHaveAttribute("data-slot", "table-caption");
});

WithCaption.test("Caption is visible", async ({ canvas }) => {
  const caption = canvas.getByText("A list of recent invoices.");
  await expect(caption).toBeVisible();
});

export const WithFooter = meta.story({
  name: "With Footer",
  render() {
    return (
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.slice(0, 3).map((invoice) => (
            <TableRow key={invoice.invoice}>
              <TableCell className="font-medium">{invoice.invoice}</TableCell>
              <TableCell>{invoice.paymentStatus}</TableCell>
              <TableCell>{invoice.paymentMethod}</TableCell>
              <TableCell className="text-right">{invoice.totalAmount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    );
  }
});

WithFooter.test("Renders footer with data-slot", async ({ canvas }) => {
  const table = canvas.getByRole("table");
  const footer = table.querySelector("[data-slot='table-footer']");
  await expect(footer).not.toBeNull();
});

WithFooter.test("Footer displays total", async ({ canvas }) => {
  const totalCell = canvas.getByRole("cell", { name: /total/i });
  await expect(totalCell).toBeVisible();
  const amountCell = canvas.getByRole("cell", { name: /\$30\.00/i });
  await expect(amountCell).toBeVisible();
});

export const Actions = meta.story({
  render() {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Wireless Mouse</TableCell>
            <TableCell>$29.99</TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="size-8">
                    <MoreHorizontalIcon />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Duplicate</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="error">Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Mechanical Keyboard</TableCell>
            <TableCell>$129.99</TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="size-8">
                    <MoreHorizontalIcon />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Duplicate</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="error">Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">USB-C Hub</TableCell>
            <TableCell>$49.99</TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="size-8">
                    <MoreHorizontalIcon />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Duplicate</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="error">Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  }
});

export const FullTable = meta.story({
  name: "Full Table",
  render() {
    const invoices = [
      { id: "INV001", status: "Paid", method: "Credit Card", amount: "$250.00" },
      { id: "INV002", status: "Pending", method: "PayPal", amount: "$150.00" },
      { id: "INV003", status: "Unpaid", method: "Bank Transfer", amount: "$350.00" }
    ];

    return (
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell className="font-medium">{invoice.id}</TableCell>
              <TableCell>{invoice.status}</TableCell>
              <TableCell>{invoice.method}</TableCell>
              <TableCell className="text-right">{invoice.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$750.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    );
  }
});

FullTable.test("Renders all sub-components with correct data-slots", async ({ canvas, step }) => {
  const table = canvas.getByRole("table");

  await step("Table and container have data-slots", async () => {
    await expect(table).toHaveAttribute("data-slot", "table");
    const container = table.closest("[data-slot='table-container']");
    await expect(container).not.toBeNull();
  });

  await step("Header, body, footer have data-slots", async () => {
    await expect(table.querySelector("[data-slot='table-header']")).not.toBeNull();
    await expect(table.querySelector("[data-slot='table-body']")).not.toBeNull();
    await expect(table.querySelector("[data-slot='table-footer']")).not.toBeNull();
  });

  await step("Caption has data-slot", async () => {
    await expect(table.querySelector("[data-slot='table-caption']")).not.toBeNull();
  });
});

FullTable.test("Renders correct number of rows", async ({ canvas }) => {
  const rows = canvas.getAllByRole("row");
  // 1 header + 3 body + 1 footer = 5
  await expect(rows).toHaveLength(5);
});

FullTable.test("Renders all invoice data", async ({ canvas }) => {
  await expect(canvas.getByText("INV001")).toBeVisible();
  await expect(canvas.getByText("INV002")).toBeVisible();
  await expect(canvas.getByText("INV003")).toBeVisible();
  await expect(canvas.getByText("Paid")).toBeVisible();
  await expect(canvas.getByText("Pending")).toBeVisible();
  await expect(canvas.getByText("Unpaid")).toBeVisible();
});

FullTable.test("Footer shows total amount", async ({ canvas }) => {
  await expect(canvas.getByText("$750.00")).toBeVisible();
});

export const CustomClassName = meta.story({
  name: "Custom Class Name",
  render() {
    return (
      <Table className="border">
        <TableHeader className="bg-muted">
          <TableRow className="border-b-2">
            <TableHead className="text-primary">Column</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-sm">
          <TableRow className="bg-accent">
            <TableCell className="p-4">Value</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  }
});

CustomClassName.test("Custom className merges with table", async ({ canvas }) => {
  const table = canvas.getByRole("table");
  await expect(table).toHaveClass("border");
});

CustomClassName.test("Custom className merges with row", async ({ canvas }) => {
  const rows = canvas.getAllByRole("row");
  await expect(rows[0]).toHaveClass("border-b-2");
});

CustomClassName.test("Custom className merges with cell", async ({ canvas }) => {
  const cell = canvas.getByRole("cell", { name: /value/i });
  await expect(cell).toHaveClass("p-4");
});
