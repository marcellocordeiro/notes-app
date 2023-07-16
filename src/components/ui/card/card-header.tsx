import { classnames } from "@/lib/utils";

export type CardHeaderProps = React.ComponentPropsWithoutRef<"div">;

export function CardHeader({ className, ...props }: CardHeaderProps) {
  return (
    <div
      className={classnames("flex flex-col space-y-1.5 p-6", className)}
      {...props}
    />
  );
}
