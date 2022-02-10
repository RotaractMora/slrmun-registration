const styles = {
  root: {
    display: "flex",
    height: "100vh",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    maxWidth: "400px",
    borderRadius: "10px",
    padding: "40px",
    boxShadow: "0px 0px 5px gray",
    textAlign: "center",
  },
  h2: {
    color: (props) => props.palette.primary.main,
    marginBottom: "30px",
  },
  link: {
    color: "#0000FF",
    textDecoration: "underline",
    cursor: "pointer",
  },
  button: {
    margin: "20px auto",
  },
  modalIcon: {
    color: (props) => props.palette.primary.main,
    width: "100px",
  },
};

export default styles;
