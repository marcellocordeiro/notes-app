import { classnames } from "@/lib/utils";

export type CardTitleProps = React.ComponentPropsWithoutRef<"h3">;

export function CardTitle({ className, children, ...props }: CardTitleProps) {
  return (
    <h3
      className={classnames(
        "font-semibold leading-none tracking-tight",
        className,
      )}
      {...props}
    >
      {children}
    </h3>
  );
}
