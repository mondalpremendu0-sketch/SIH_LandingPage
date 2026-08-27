import React, { useEffect, useState } from "react";
import { RouterProvider } from "react-router";
import { createAppRouter, getInitialTheme } from './app.routes';

function App() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("nexus-theme", theme);
  }, [theme]);

  const router = createAppRouter(theme, setTheme);

  return <RouterProvider router={router} />;
}

export default App;
