const localStyles = {
  wrapper: {
    fontSize: "0.8rem",
    backgroundColor: (theme) => theme.palette.grey[100],
    padding: 10,
    transition: "0.3s",
    margin: "10px auto",
  },
  wrapperColapsed: {
    height: 0,
    padding: 0,
    overflow: "hidden",
  },
  oldDescription: {
    fontSize: "0.8rem",
  },
  clickable: {
    backgroundColor: (theme) => theme.palette.grey[300],
    padding: 2,
    borderRadius: 3,
    cursor: "pointer",
    boxShadow: (theme) => theme.shadows[1],
  },
};

export default localStyles;
