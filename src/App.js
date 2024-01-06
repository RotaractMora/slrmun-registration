import Layout from "./containers/layout/Layout";

import { BrowserRouter as Router } from "react-router-dom";

import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateAdapter from "@mui/lab/AdapterDateFns";

import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import theme_config from "./config/Theme";
import "./App.css";

import { AuthProvider } from "./firebase/Auth";


import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const bas_theme = createTheme();
  const styles = theme_config(bas_theme);
  const theme = createTheme(styles);
  return (
    <AuthProvider>
      <Router>
        <ThemeProvider theme={theme}>
          {/* for the date time pickers. You need to install the date-fns package from NPM using npm install --save date-fns */}
          <LocalizationProvider dateAdapter={DateAdapter}>
            <Layout />
          </LocalizationProvider>
        </ThemeProvider>
      </Router>
    </AuthProvider>
  );
}

export default App;
