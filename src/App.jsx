import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import Create from "./pages/create";
import Kanban from "./pages/kanban";
import Settings from "./pages/settings";
import MyAccount from "./pages/myaccount";
import Login from "./pages/login";
import SignUp from "./pages/signUp";

import { ThemeProvider, createTheme } from "@mui/material";
import { blue, green } from "@mui/material/colors";

import RequireAuth from "./secure/requireAuth";

function App() {
  const theme = createTheme({
    typography: {
      fontFamily: ["poppins", "Sans Serif"].join(","),
    },
    palette: {
      primary: {
        main: blue[500],
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route
          path="home"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />
        <Route
          path="create"
          element={
            <RequireAuth>
              <Create />
            </RequireAuth>
          }
        />
        <Route
          path="kanban"
          element={
            <RequireAuth>
             <Kanban />
            </RequireAuth>
          }
        />
        <Route
          path="settings"
          element={
            <RequireAuth>
              <Settings />
            </RequireAuth>
          }
        />
        
        <Route
          path="myaccount"
          element={
            <RequireAuth>
            <MyAccount />
            </RequireAuth>
          }
        />
        
      </Routes>
    </ThemeProvider>
  );
}

export default App;
