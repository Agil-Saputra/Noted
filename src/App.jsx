import React from "react"
import Layout from "./layout/layout"
import { Routes, Route } from "react-router-dom"

import Home from "./pages/home"
import Create from "./pages/create"

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
      </Routes>
    </Layout>
    </ThemeProvider>
  )
}

export default App
