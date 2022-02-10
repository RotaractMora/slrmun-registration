const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "auto",
    padding: "10px 30px",
    boxShadow: "0px 0px 5px gray",
  },
  container: {
    borderRadius: "10px",
    padding: "40px",
    boxShadow: "0px 0px 5px gray",
    textAlign: "center",
  },
  h2: {
    color: (props) => props.palette.primary.main,
    marginBottom: "30px",
  },
  button: {
    margin: "20px auto",
  },
  link: {
    color: "#0000FF",
    textDecoration: "underline",
    cursor: "pointer",
  },
};

export default styles;
