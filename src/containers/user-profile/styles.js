const styles = {
  root: {
    width: "100%",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "20px auto",
    padding: "10px 30px",
    boxShadow: "0px 0px 5px gray",
    width: "fit-content",
    borderRadius: "20px",
  },
  profile_img: {
    position: "relative",
    borderRadius: "50%",
    width: "200px",
    height: "200px",
  },
  img_overlay: {
    position: "absolute",
    borderRadius: "50%",
    width: "200px",
    opacity: 0,
    transition: "0.3s",
    cursor: "pointer",
    "&:hover": {
      opacity: 0.9,
    },
  },
  marginL: {
    marginLeft: "5px",
  },
  marginR: {
    marginRight: "5px",
  },
  h1: {
    margin: "20px",
  },
};

export default styles;
