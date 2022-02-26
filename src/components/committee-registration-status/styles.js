const styles = (theme, color) => {
  // color selection
  return {
    root: {
      maxWidth: "450px",
      textAlign: "center",
      margin: "20px auto",
      border: "1px solid " + color,
    },
    heading: {
      padding: "10px",
      color: color,
    },
    banner: {
      padding: "20px",
      color: "white",
      backgroundColor: color,
    },
  };
};

export default styles;
