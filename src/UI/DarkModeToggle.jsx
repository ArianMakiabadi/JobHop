import { FiMoon, FiSun } from "react-icons/fi";
import { useDarkMode } from "../context/DarkModeContext";

function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  return (
    <button onClick={toggleDarkMode}>
      {isDarkMode ? (
        <FiSun className="w-5 h-5 text-primary-700" />
      ) : (
        <FiMoon className="w-5 h-5 text-primary-700" />
      )}
    </button>
  );
}

export default DarkModeToggle;
