import * as DialogPrimitive from "@radix-ui/react-dialog";
import { forwardRef } from "react";

import { classnames } from "@/lib/utils";

type Ref = React.ElementRef<typeof DialogPrimitive.Description>;

export type DialogDescriptionProps = React.ComponentPropsWithoutRef<
  typeof DialogPrimitive.Description
>;

export const DialogDescription = forwardRef<Ref, DialogDescriptionProps>(
  ({ className, ...props }, ref) => {
    return (
      <DialogPrimitive.Description
        ref={ref}
        className={classnames("text-sm text-muted-foreground", className)}
        {...props}
      />
    );
  },
);

DialogDescription.displayName = DialogPrimitive.Description.displayName;
