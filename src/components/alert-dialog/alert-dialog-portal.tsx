import * as React from "react";

import { AlertDialog as ReactAlertDialog } from "radix-ui";

export type AlertDialogPortalProps = React.ComponentProps<typeof ReactAlertDialog.Portal>;

export function AlertDialogPortal(props: AlertDialogPortalProps) {
  return <ReactAlertDialog.Portal data-slot="alert-dialog-portal" {...props} />;
}
