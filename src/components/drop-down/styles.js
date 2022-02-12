const styles = {
  root: {
    position: "relative",
  },
  selectedTile: {
    maxWidth: "450px",
    borderRadius: "75px",
    boxShadow: "0px 0px 5px gray",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
  },
  image: {
    borderRadius: "50%",
  },
  selectedImage: {
    margin: "10px",
    width: "130px",
  },
  text_field: {
    width: "280px",
    maxWidth: "30vw",
    marginRight: "20px",
  },
  list: {
    backgroundColor: "white",
    boxShadow: "0px 0px 5px gray",
    margin: "0px 60px",
    position: "absolute",
    width: "calc(100% - 120px)",
    zIndex: 5,
    display: "none",
  },
  visible: {
    display: "block",
  },
};

export default styles;
