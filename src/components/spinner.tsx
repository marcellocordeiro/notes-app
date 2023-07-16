import { LuLoader2 } from "react-icons/lu";

import { classnames } from "@/lib/utils";

export interface SpinnerProps {
  className?: string;
}

export function Spinner({ className }: SpinnerProps) {
  return <LuLoader2 className={classnames("animate-spin", className)} />;
}
