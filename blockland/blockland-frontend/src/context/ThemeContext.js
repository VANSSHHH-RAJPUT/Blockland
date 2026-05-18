import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext({ dark: true, toggle: () => {} });

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(() => {
    try { return localStorage.getItem("blockland-theme") !== "light"; }
    catch { return true; }
  });

  useEffect(() => {
    if (dark) {
      document.body.setAttribute("data-theme", "dark");
      document.body.style.background = "#050508";
      document.body.style.color = "#ffffff";
    } else {
      document.body.setAttribute("data-theme", "light");
      document.body.style.background = "#ffffff";
      document.body.style.color = "#0a0a0f";
    }
    try { localStorage.setItem("blockland-theme", dark ? "dark" : "light"); }
    catch {}
  }, [dark]);

  return (
    <ThemeContext.Provider value={{ dark, toggle: () => setDark(d => !d) }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  return ctx || { dark: true, toggle: () => {} };
}