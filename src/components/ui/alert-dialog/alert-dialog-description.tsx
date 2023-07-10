import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { forwardRef } from "react";

import { classnames } from "@/lib/utils";

type Ref = React.ElementRef<typeof AlertDialogPrimitive.Description>;

export type AlertDialogDescriptionProps = React.ComponentPropsWithoutRef<
  typeof AlertDialogPrimitive.Description
>;

export const AlertDialogDescription = forwardRef<
  Ref,
  AlertDialogDescriptionProps
>(({ className, ...props }, ref) => {
  return (
    <AlertDialogPrimitive.Description
      ref={ref}
      className={classnames("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
});

AlertDialogDescription.displayName =
  AlertDialogPrimitive.Description.displayName;
