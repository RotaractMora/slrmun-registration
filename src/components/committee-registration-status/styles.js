const styles = (theme, stat) => {
  // color selection
  let banner_color = theme.palette.error.main;
  let text_color = theme.palette.error.contrastText;
  if (stat === 1 || stat === 2) {
    banner_color = theme.palette.orange.main;
    text_color = theme.palette.orange.contrastText;
  } else if (stat === 3) {
    banner_color = theme.palette.yellow.main;
    text_color = theme.palette.yellow.contrastText;
  } else if (stat === 4) {
    banner_color = theme.palette.success.main;
    text_color = theme.palette.success.contrastText;
  }
  return {
    root: {
      maxWidth: "450px",
      textAlign: "center",
      margin: "20px auto",
    },
    heading: {
      padding: "10px",
      color: banner_color,
    },
    banner: {
      padding: "20px",
      color: text_color,
    },
    reg_stat_2: {
      border: "1px solid " + banner_color,
      "& $banner": {
        backgroundColor: banner_color,
      },
    },
  };
};

export default styles;
