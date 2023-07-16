import { forwardRef } from "react";

import { classnames } from "@/lib/utils";

type Ref = React.ElementRef<"tbody">;

export type TableBodyProps = React.ComponentPropsWithoutRef<"tbody">;

export const TableBody = forwardRef<Ref, TableBodyProps>(
  ({ className, ...props }, ref) => {
    return (
      <tbody
        ref={ref}
        className={classnames("[&_tr:last-child]:border-0", className)}
        {...props}
      />
    );
  },
);

TableBody.displayName = "TableBody";
