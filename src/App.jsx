import React from "react"
import Layout from "./layout/layout"
import { Routes, Route } from "react-router-dom"

import Home from "./pages/home"
import Create from "./pages/create"
import Todo from "./pages/todo"
import Settings from "./pages/settings"
import MyAccount from "./pages/myaccount"

import { ThemeProvider, createTheme } from "@mui/material"

function App() {

const theme = createTheme({
  typography: {
    fontFamily: [
      'poppins',
      'Sans Serif',
    ].join(','),
  },
  palette: {
    primary: {
      main: "#329DFF",
    },
  },
});

  return (
    <ThemeProvider theme={theme}>
    <Layout>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="create" element={<Create/>}/>
        <Route path="todo" element={<Todo/>}/>
        <Route path="settings" element={<Settings />}/>
        <Route path="myaccount" element={<MyAccount />}/>
      </Routes>
    </Layout>
    </ThemeProvider>
  )
}

export default App
