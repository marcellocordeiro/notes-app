import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { forwardRef } from "react";

import { buttonVariants } from "@/components/ui/button";
import { classnames } from "@/lib/utils";

type Ref = React.ElementRef<typeof AlertDialogPrimitive.Action>;

export type AlertDialogActionProps = React.ComponentPropsWithoutRef<
  typeof AlertDialogPrimitive.Action
>;

export const AlertDialogAction = forwardRef<Ref, AlertDialogActionProps>(
  ({ className, ...props }, ref) => {
    return (
      <AlertDialogPrimitive.Action
        ref={ref}
        className={classnames(buttonVariants(), className)}
        {...props}
      />
    );
  },
);

AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;
