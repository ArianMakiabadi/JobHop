import type { ReactNode } from "react";
import type { IconType } from "react-icons";

interface PillProps {
  icon: IconType;
  children: ReactNode;
}

export default function Pill({ icon: Icon, children }: PillProps) {
  return (
    <span className="inline-flex items-center gap-2 rounded-lg border bg-secondary-0 px-3 py-2 text-sm text-secondary-700">
      <Icon className="h-4 w-4" />
      {children}
    </span>
  );
}
