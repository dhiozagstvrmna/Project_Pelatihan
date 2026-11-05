import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme(); // useContext lewat custom hook
  return (
    <button className="theme-toggle" onClick={toggleTheme} aria-label="Ganti tema terang atau gelap">
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
}
