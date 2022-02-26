const styles = {
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid gray",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: (props) => props.palette.grey["200"],
    },
    position: "relative",
  },
  image: {
    width: "80px",
    borderRadius: "50%",
    padding: "10px",
  },
  text: {
    marginRight: "10px",
    fontSize: "14px",
  },
  strike: {
    textDecoration: "line-through",
  },
  badge: {
    position: "absolute",
    top: 0,
    right: 0,
    marginRight: 10,
    marginTop: 5,
    backgroundColor: (theme) => theme.palette.error.light,
    color: (theme) => theme.palette.error.contrastText,
    fontSize: "0.8rem",
    width: 20,
    height: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    boxShadow: (theme) => theme.shadows[3],
  },
};

export default styles;
