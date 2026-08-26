import { Monitor, Moon, Sun } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const themeOptions = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
];

export function ThemeToggle({ drawer = false, theme, onChange }) {
  const reduceMotion = useReducedMotion();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [systemTheme, setSystemTheme] = useState(() =>
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light",
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const updateSystemTheme = (event) =>
      setSystemTheme(event.matches ? "dark" : "light");
    mediaQuery.addEventListener("change", updateSystemTheme);
    return () => mediaQuery.removeEventListener("change", updateSystemTheme);
  }, []);

  const activeTheme = theme === "system" ? systemTheme : theme;
  const ActiveIcon =
    themeOptions.find(({ value }) => value === activeTheme)?.icon ?? Monitor;

  const chooseMobileTheme = (value) => {
    onChange(value);
    setIsMobileOpen(false);
  };

  return (
    <>
      <div
        className={`theme-toggle desktop-theme-toggle ${drawer ? "drawer-theme-toggle" : ""}`}
        aria-label="Theme preference"
        role="group"
      >
        {themeOptions.map(({ value, label, icon: Icon }) => (
          <button
            aria-label={`${label} theme`}
            aria-pressed={theme === value}
            className={`theme-option ${theme === value ? "is-selected" : ""}`}
            key={value}
            onClick={() => onChange(value)}
            type="button"
          >
            <motion.span
              className="theme-icon"
              animate={{
                opacity: theme === value ? 1 : 0.72,
                rotate: theme === value ? 0 : -8,
                scale: theme === value ? 1 : 0.94,
              }}
              transition={{
                duration: reduceMotion ? 0.01 : 0.36,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Icon aria-hidden="true" size={18} strokeWidth={1.8} />
            </motion.span>
            <span>{label}</span>
          </button>
        ))}
      </div>

      <div className="mobile-theme-control">
        <button
          aria-expanded={isMobileOpen}
          aria-haspopup="menu"
          aria-label="Change theme"
          className="mobile-theme-button"
          onClick={() => setIsMobileOpen((open) => !open)}
          type="button"
        >
          <motion.span
            animate={{ opacity: 1, rotate: isMobileOpen ? -8 : 0, scale: 1 }}
            transition={{
              duration: reduceMotion ? 0.01 : 0.28,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <ActiveIcon aria-hidden="true" size={18} strokeWidth={1.8} />
          </motion.span>
        </button>
        <AnimatePresence>
          {isMobileOpen && (
            <motion.div
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="theme-popover"
              exit={{ opacity: 0, y: -4, scale: 0.98 }}
              initial={{ opacity: 0, y: -4, scale: 0.98 }}
              role="menu"
              transition={{
                duration: reduceMotion ? 0.01 : 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <span className="theme-popover-title">Appearance</span>
              {themeOptions.map(({ value, label, icon: Icon }) => (
                <button
                  aria-checked={theme === value}
                  className={`theme-popover-option ${theme === value ? "is-selected" : ""}`}
                  key={value}
                  onClick={() => chooseMobileTheme(value)}
                  role="menuitemradio"
                  type="button"
                >
                  <Icon aria-hidden="true" size={17} strokeWidth={1.8} />
                  <span>{label}</span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
