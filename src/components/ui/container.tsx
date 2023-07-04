import { cn } from "@/lib/utils";

export type ContainerProps = {
  className?: string;
  children?: React.ReactNode;
};

export function Container({ className, children }: ContainerProps) {
  return <div className={cn("container", className)}>{children}</div>;
}
