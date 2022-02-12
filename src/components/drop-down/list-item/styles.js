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
};

export default styles;
