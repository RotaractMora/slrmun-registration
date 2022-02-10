const styles = {
  list_item: {
    cursor: "pointer",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    "&:hover": {
      backgroundColor: (props) => props.palette.grey["300"],
    },
  },
  list_item_bar: {
    borderLeft: (props) => "1px solid " + props.palette.primary.main,
    height: "50px",
    width: "5px",
  },
  list_item_item: {
    padding: "5px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    color: "black",
  },
};

export default styles;
