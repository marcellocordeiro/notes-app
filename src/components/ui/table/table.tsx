import { forwardRef } from "react";

import { classnames } from "@/lib/utils";

type Ref = React.ElementRef<"table">;

export type TableProps = React.ComponentPropsWithoutRef<"table">;

export const Table = forwardRef<Ref, TableProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className="w-full overflow-auto">
        <table
          ref={ref}
          className={classnames("w-full caption-bottom text-sm", className)}
          {...props}
        />
      </div>
    );
  },
);

Table.displayName = "Table";
