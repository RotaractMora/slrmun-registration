const styles = {
  root: {
    position: "absolute",
    backgroundColor: "#0004",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 5,
  },
  container: {
    backgroundColor: "white",
    maxWidth: "450px",
    padding: "30px",
    borderRadius: "20px",
    boxShadow: "0px 0px 25px #999",
  },
  h3: {
    fontSize: "3rem",
    color: (props) => props.palette.primary.main,
    padding: "10px",
  },
  bodyText: {
    padding: "10px 0px",
    color: "gray",
  },
  button: {
    margin: "10px 0px",
  },
};

export default styles;
