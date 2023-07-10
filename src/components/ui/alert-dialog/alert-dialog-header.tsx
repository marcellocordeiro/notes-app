import { classnames } from "@/lib/utils";

export type AlertDialogHeaderProps = React.HTMLAttributes<HTMLDivElement>;

export const AlertDialogHeader = ({
  className,
  ...props
}: AlertDialogHeaderProps) => {
  return (
    <div
      className={classnames(
        "flex flex-col space-y-2 text-center sm:text-left",
        className,
      )}
      {...props}
    />
  );
};
