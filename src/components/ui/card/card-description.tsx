import { classnames } from "@/lib/utils";

export type CardDescriptionProps = React.ComponentPropsWithoutRef<"p">;

export function CardDescription({ className, ...props }: CardDescriptionProps) {
  return (
    <p
      className={classnames("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}
