import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { forwardRef } from "react";

import { buttonVariants } from "@/components/ui/button";
import { classnames } from "@/lib/utils";

type Ref = React.ElementRef<typeof AlertDialogPrimitive.Cancel>;

export type AlertDialogCancelProps = React.ComponentPropsWithoutRef<
  typeof AlertDialogPrimitive.Cancel
>;

export const AlertDialogCancel = forwardRef<Ref, AlertDialogCancelProps>(
  ({ className, ...props }, ref) => {
    return (
      <AlertDialogPrimitive.Cancel
        ref={ref}
        className={classnames(
          buttonVariants({ variant: "outline" }),
          "mt-2 sm:mt-0",
          className,
        )}
        {...props}
      />
    );
  },
);

AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;
