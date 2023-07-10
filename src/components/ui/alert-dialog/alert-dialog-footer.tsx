import { classnames } from "@/lib/utils";

export type AlertDialogFooterProps = React.HTMLAttributes<HTMLDivElement>;

export const AlertDialogFooter = ({
  className,
  ...props
}: AlertDialogFooterProps) => {
  return (
    <div
      className={classnames(
        "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
        className,
      )}
      {...props}
    />
  );
};
