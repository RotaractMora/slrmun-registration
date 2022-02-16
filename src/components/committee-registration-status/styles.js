const styles = (theme, stat) => {
  // color selection
  let banner_color = theme.palette.error.main;
  if (stat === 1) {
    banner_color = theme.palette.orange.main;
  } else if (stat === 2) {
    banner_color = theme.palette.yellow.main;
  } else if (stat === 3) {
    banner_color = theme.palette.success.main;
  }
  return {
    root: {
      maxWidth: "450px",
      textAlign: "center",
      margin: "20px auto",
      border: "1px solid " + banner_color,
    },
    heading: {
      padding: "10px",
      color: banner_color,
    },
    banner: {
      padding: "20px",
      color: "white",
      backgroundColor: banner_color,
    },
  };
};

export default styles;
