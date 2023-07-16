import { forwardRef } from "react";

import { classnames } from "@/lib/utils";

type Ref = React.ElementRef<"tr">;

export type TableRowProps = React.ComponentPropsWithoutRef<"tr">;

export const TableRow = forwardRef<Ref, TableRowProps>(
  ({ className, ...props }, ref) => {
    return (
      <tr
        ref={ref}
        className={classnames(
          "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
          className,
        )}
        {...props}
      />
    );
  },
);

TableRow.displayName = "TableRow";
