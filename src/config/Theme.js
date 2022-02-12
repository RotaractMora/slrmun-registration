const theme_config = (base_theme) => ({
  typography: {
    h1: {
      fontSize: "4rem",
      color: base_theme.palette.primary.main,
    },
    h2: {
      fontSize: "1.5rem",
    },
  },
  palette: {
    orange: {
      main: "#ffa600",
      contrastText: "#fff",
    },
    yellow: {
      main: "#ffee00",
      contrastText: "#000",
    },
  },
});

export default theme_config;