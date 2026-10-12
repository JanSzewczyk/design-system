import { CircleCheckIcon, InfoIcon, OctagonXIcon, TriangleAlertIcon } from "lucide-react";
import { type ToasterProps as ReactToasterProps, Toaster as ReactToster, toast } from "sonner";

import { Spinner } from "~/components/spinner";

export type ToasterProps = ReactToasterProps;

export const Toaster = ({ theme = "system", ...props }: ToasterProps) => {
  return (
    <ReactToster
      className="group"
      icons={{
        error: <OctagonXIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        loading: <Spinner />,
        success: <CircleCheckIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />
      }}
      theme={theme}
      toastOptions={{
        classNames: {
          description: "!text-muted-foreground",
          toast: "!bg-popover !text-popover-foreground !border !border-border !rounded"
        }
      }}
      {...props}
    />
  );
};

export { toast };
