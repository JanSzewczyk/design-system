import * as React from "react";

import { AlertDialog as ReactAlertDialog } from "radix-ui";

export type AlertDialogTriggerProps = React.ComponentProps<typeof ReactAlertDialog.Trigger>;

export function AlertDialogTrigger(props: AlertDialogTriggerProps) {
  return <ReactAlertDialog.Trigger data-slot="alert-dialog-trigger" {...props} />;
}
