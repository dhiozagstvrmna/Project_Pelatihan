import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

// useContext: membuat "saluran data" yang bisa dibaca komponen mana pun tanpa lewat props
const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function temaAwal(): Theme {
  try {
    const tersimpan = localStorage.getItem("pmb-theme");
    if (tersimpan === "light" || tersimpan === "dark") return tersimpan;
  } catch {
    /* localStorage tidak tersedia, abaikan */
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(temaAwal); // useState dengan lazy initializer

  // useEffect: efek samping (mengubah atribut <html> dan menyimpan pilihan) setiap theme berubah
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("pmb-theme", theme);
    } catch {
      /* abaikan */
    }
  }, [theme]);

  // useCallback: fungsi tetap sama antar render, jadi aman dipakai sebagai dependency/props
  const toggleTheme = useCallback(() => setTheme((t) => (t === "dark" ? "light" : "dark")), []);

  // useMemo: objek value tidak dibuat ulang kalau theme tidak berubah
  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme harus dipakai di dalam <ThemeProvider>");
  return ctx;
}
