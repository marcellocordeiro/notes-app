import { forwardRef } from "react";

import { classnames } from "@/lib/utils";

type Ref = React.ElementRef<"caption">;

export type TableCaptionProps = React.ComponentPropsWithoutRef<"caption">;

export const TableCaption = forwardRef<Ref, TableCaptionProps>(
  ({ className, ...props }, ref) => {
    return (
      <caption
        ref={ref}
        className={classnames("mt-4 text-sm text-muted-foreground", className)}
        {...props}
      />
    );
  },
);

TableCaption.displayName = "TableCaption";
