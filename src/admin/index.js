import React from 'react';
import { Outlet } from 'react-router-dom';
import { ColorModeContext, useMode } from ".././theme/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./scenes/global/Topbar";
import ProSideBar from "./scenes/global/SideBar";
import "./admin.css";

function AdminLayout() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <ProSideBar />
          <main className="content">
            <Topbar />
            {/* This is where the child routes will be rendered */}
            <Outlet />
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default AdminLayout;
