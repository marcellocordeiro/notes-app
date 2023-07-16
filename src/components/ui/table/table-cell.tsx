import { forwardRef } from "react";

import { classnames } from "@/lib/utils";

type Ref = React.ElementRef<"td">;

export type TableCellProps = React.ComponentPropsWithoutRef<"td">;

export const TableCell = forwardRef<Ref, TableCellProps>(
  ({ className, ...props }, ref) => {
    return (
      <td
        ref={ref}
        className={classnames(
          "p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
          className,
        )}
        {...props}
      />
    );
  },
);

TableCell.displayName = "TableCell";
