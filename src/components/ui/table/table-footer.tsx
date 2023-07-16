import { forwardRef } from "react";

import { classnames } from "@/lib/utils";

type Ref = React.ElementRef<"tfoot">;

export type TableFooterProps = React.ComponentPropsWithoutRef<"tfoot">;

export const TableFooter = forwardRef<Ref, TableFooterProps>(
  ({ className, ...props }, ref) => {
    return (
      <tfoot
        ref={ref}
        className={classnames(
          "bg-primary font-medium text-primary-foreground",
          className,
        )}
        {...props}
      />
    );
  },
);

TableFooter.displayName = "TableFooter";
