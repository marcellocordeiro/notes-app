import { classnames } from "@/lib/utils";

export type DialogHeaderProps = React.HTMLAttributes<HTMLDivElement>;

export const DialogHeader = ({ className, ...props }: DialogHeaderProps) => {
  return (
    <div
      className={classnames(
        "flex flex-col space-y-1.5 text-center sm:text-left",
        className,
      )}
      {...props}
    />
  );
};
