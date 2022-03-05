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
  active_list_item: {
    backgroundColor: "white",
    "& $list_item_bar": {
      backgroundColor: (props) => props.palette.primary.main,
    },
  },
  list_item_bar: {
    borderLeft: (props) => "1px solid " + props.palette.primary.main,
    height: "50px",
    width: "5px",
  },
  list_item_icon: {
    color: (theme) => theme.palette.primary.main,
    marginLeft: 5,
  },
  list_item_text: {
    padding: "5px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    color: "black",
  },
  list_item_text_collapsed: {
    display: "none",
  },
};

export default styles;
