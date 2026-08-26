import { useEffect, useState } from "react";
import { LandingPage } from "./features/LandingPage/pages/LandingPage";
import { Dashboard } from "./features/Dashboard/Dashboard";

function getInitialTheme() {
  const savedTheme = window.localStorage.getItem("nexus-theme");
  return savedTheme === "light" ||
    savedTheme === "dark" ||
    savedTheme === "system"
    ? savedTheme
    : "system";
}

export default function App() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("nexus-theme", theme);
  }, [theme]);

  return window.location.pathname.startsWith("/dashboard") ? (
    <Dashboard theme={theme} onThemeChange={setTheme} />
  ) : (
    <LandingPage theme={theme} onThemeChange={setTheme} />
  );
}
