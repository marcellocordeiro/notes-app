import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { forwardRef } from "react";

import { classnames } from "@/lib/utils";

type Ref = React.ElementRef<typeof AlertDialogPrimitive.Title>;

export type AlertDialogTitleProps = React.ComponentPropsWithoutRef<
  typeof AlertDialogPrimitive.Title
>;

export const AlertDialogTitle = forwardRef<Ref, AlertDialogTitleProps>(
  ({ className, ...props }, ref) => {
    return (
      <AlertDialogPrimitive.Title
        ref={ref}
        className={classnames("text-lg font-semibold", className)}
        {...props}
      />
    );
  },
);

AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;
