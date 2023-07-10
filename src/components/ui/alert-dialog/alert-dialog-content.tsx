"use client";

import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { forwardRef } from "react";

import { classnames } from "@/lib/utils";

type Ref = React.ElementRef<typeof AlertDialogPrimitive.Content>;

export type AlertDialogContentProps = React.ComponentPropsWithoutRef<
  typeof AlertDialogPrimitive.Content
>;

export const AlertDialogContent = forwardRef<Ref, AlertDialogContentProps>(
  ({ className, ...props }, ref) => {
    return (
      <AlertDialogPortal>
        <AlertDialogOverlay />
        <AlertDialogPrimitive.Content
          ref={ref}
          className={classnames(
            "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg md:w-full",
            className,
          )}
          {...props}
        />
      </AlertDialogPortal>
    );
  },
);

AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;

const AlertDialogPortal = ({
  className,
  ...props
}: AlertDialogPrimitive.AlertDialogPortalProps) => {
  return (
    <AlertDialogPrimitive.Portal className={classnames(className)} {...props} />
  );
};

AlertDialogPortal.displayName = AlertDialogPrimitive.Portal.displayName;

const AlertDialogOverlay = forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ className, ...props }, ref) => {
  return (
    <AlertDialogPrimitive.Overlay
      className={classnames(
        "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className,
      )}
      {...props}
      ref={ref}
    />
  );
});

AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;
