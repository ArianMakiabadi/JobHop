import type { IconType } from "react-icons";

export interface SelectOption<V extends string | number = string> {
  value: V;
  label: string;
}

/** Label + badge class for a status value (see the status maps in the tables). */
export interface StatusBadge {
  label: string;
  className: string;
}

export interface NavItem {
  to: string;
  icon: IconType;
  label: string;
}
