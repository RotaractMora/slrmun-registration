const styles = {
  root: {
    position: "fixed",
    top: 0,
    left: 0,
    backgroundColor: (theme) => theme.palette.background.transparentBlack,
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 5,
  },
  container: {
    backgroundColor: "white",
    padding: "50px",
    borderRadius: "10px",
  },
  heading: {
    textAlign: "center",
    margin: "10px 0px",
  },
  buttonPanel: {
    textAlign: "center",
  },
  btn: {
    width: 150,
    margin: 10,
  },
};

export default styles;
