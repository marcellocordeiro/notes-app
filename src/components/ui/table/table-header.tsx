import { forwardRef } from "react";

import { classnames } from "@/lib/utils";

type Ref = React.ElementRef<"thead">;

export type TableHeaderProps = React.ComponentPropsWithoutRef<"thead">;

export const TableHeader = forwardRef<Ref, TableHeaderProps>(
  ({ className, ...props }, ref) => {
    return (
      <thead
        ref={ref}
        className={classnames("[&_tr]:border-b", className)}
        {...props}
      />
    );
  },
);

TableHeader.displayName = "TableHeader";
