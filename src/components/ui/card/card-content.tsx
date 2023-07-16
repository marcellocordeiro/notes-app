import { classnames } from "@/lib/utils";

export type CardContentProps = React.ComponentPropsWithoutRef<"div">;

export function CardContent({ className, ...props }: CardContentProps) {
  return <div className={classnames("p-6 pt-0", className)} {...props} />;
}
