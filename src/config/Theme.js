const theme_config = (base_theme) => ({
  typography: {
    h1: {
      fontSize: "4rem",
      color: base_theme.palette.primary.main,
      "@media screen and (max-width: 768px)": {
        fontSize: "2rem",
      },
    },
    h2: {
      fontSize: "1.5rem",
    },
  },
  palette: {
    background: {
      transparentBlack: "#0004",
    },
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
