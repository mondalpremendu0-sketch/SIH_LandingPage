import { createBrowserRouter } from "react-router";
import { LandingPage } from "./features/LandingPage/pages/LandingPage";
import Dashboard from "./features/DashboardPage/pages/Dashboard";

export const getInitialTheme = () => {
  const savedTheme = window.localStorage.getItem("nexus-theme");
  return savedTheme === "light" ||
    savedTheme === "dark" ||
    savedTheme === "system"
    ? savedTheme
    : "system";
}

export const createAppRouter = (theme, onThemeChange) => {
  return createBrowserRouter([
    {
      path: "/",
      element: <LandingPage theme={theme} onThemeChange={onThemeChange} />,
    },
    {
        path: "/dashboard",
        element:<Dashboard />
    }
  ]);
};
