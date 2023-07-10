import * as DialogPrimitive from "@radix-ui/react-dialog";
import { forwardRef } from "react";

import { classnames } from "@/lib/utils";

type Ref = React.ElementRef<typeof DialogPrimitive.Title>;

export type DialogTitleProps = React.ComponentPropsWithoutRef<
  typeof DialogPrimitive.Title
>;

export const DialogTitle = forwardRef<Ref, DialogTitleProps>(
  ({ className, ...props }, ref) => {
    return (
      <DialogPrimitive.Title
        ref={ref}
        className={classnames(
          "text-lg font-semibold leading-none tracking-tight",
          className,
        )}
        {...props}
      />
    );
  },
);

DialogTitle.displayName = DialogPrimitive.Title.displayName;
