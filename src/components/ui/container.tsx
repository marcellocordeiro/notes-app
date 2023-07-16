import { classnames } from "@/lib/utils";

export interface ContainerProps {
  className?: string;
  children?: React.ReactNode;
}

export function Container({ className, children }: ContainerProps) {
  return <div className={classnames("container", className)}>{children}</div>;
}
