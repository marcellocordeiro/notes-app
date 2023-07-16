import { classnames } from "@/lib/utils";

export type CardFooterProps = React.ComponentPropsWithoutRef<"div">;

export function CardFooter({ className, ...props }: CardFooterProps) {
  return (
    <div
      className={classnames(" flex items-center p-6 pt-0", className)}
      {...props}
    />
  );
}
