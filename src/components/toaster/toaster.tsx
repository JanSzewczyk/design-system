import * as React from "react";

import { CircleCheckIcon, InfoIcon, OctagonXIcon, TriangleAlertIcon } from "lucide-react";
import { Toaster as ReactToster, type ToasterProps as ReactToasterProps, toast } from "sonner";

import { Spinner } from "~/components";

export type ToasterProps = ReactToasterProps;

export const Toaster = ({ theme = "system", ...props }: ToasterProps) => {
  return (
    <ReactToster
      className="group"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Spinner />
      }}
      toastOptions={{
        classNames: {
          toast: "!bg-popover !text-popover-foreground !border !border-border !rounded",
          description: "!text-muted-foreground"
        }
      }}
      theme={theme}
      {...props}
    />
  );
};

export { toast };
