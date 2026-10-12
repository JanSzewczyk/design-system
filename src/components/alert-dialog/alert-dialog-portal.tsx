import { AlertDialog as ReactAlertDialog } from "radix-ui";
import * as React from "react";

export type AlertDialogPortalProps = React.ComponentProps<typeof ReactAlertDialog.Portal>;

export function AlertDialogPortal(props: AlertDialogPortalProps) {
  return <ReactAlertDialog.Portal data-slot="alert-dialog-portal" {...props} />;
}
