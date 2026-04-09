import * as React from "react";

export type PaginationItemProps = React.ComponentProps<"li">;

export function PaginationItem({ ...props }: PaginationItemProps) {
  return <li data-slot="pagination-item" {...props} />;
}
