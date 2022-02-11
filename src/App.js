import Layout from "./UI/layout/Layout";

import { BrowserRouter as Router } from "react-router-dom";

import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import theme_config from "./UI/Theme";
import "./App.css";
import { AuthProvider } from "./auth/Auth";

function App() {
  const base_theme = createTheme();
  const styles = theme_config(base_theme);
  const theme = createTheme(styles);
  return (
    <AuthProvider>
      <Router>
        <ThemeProvider theme={theme}>
          <Layout />
        </ThemeProvider>
      </Router>
    </AuthProvider>
  );
}

export default App;
