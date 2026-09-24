import type { IconType } from "react-icons";

export interface SelectOption<V extends string | number = string> {
  value: V;
  label: string;
}

export interface NavItem {
  to: string;
  icon: IconType;
  label: string;
}
