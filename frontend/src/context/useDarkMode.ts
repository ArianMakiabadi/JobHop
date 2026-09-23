import { createContext, useContext } from "react";

export interface DarkModeContextValue {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const DarkModeContext = createContext<DarkModeContextValue | undefined>(
  undefined
);

export function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined)
    throw new Error("Dark mode context was used outside of DarkModeProvider");
  return context;
}
