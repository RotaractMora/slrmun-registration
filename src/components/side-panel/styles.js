const styles = {
  root: {
    height: "100vh",
    width: "30vw",
    position: "sticky",
    top: 0,
    "@media screen and (max-width: 768px)": {
      height: "100%",
      zIndex: 2,
    },
  },
  body: {
    transition: "0.3s",
    paddingLeft: "10px",
    backgroundColor: (theme) => theme.palette.grey["200"],
    width: "30vw",
    maxWidth: "250px",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    transform: "translateX(0)",
    "@media screen and (max-width: 768px)": {
      position: "absolute",
      width: "220px",
      height: "500px",
      transform: "translateX(-240px)",
      boxShadow: "0px 0px 5px gray",
    },
  },
  body_collapsed: {
    width: "55px",
  },
  body_in: {
    transform: "translateX(0)",
  },
  listItems: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "90%",
  },
  arrowContainer: {
    display: "flex",
    justifyContent: "flex-end",
  },
  backArrowBg: {
    backgroundColor: (theme) => theme.palette.grey[400],
    padding: 10,
    margin: 10,
    cursor: "pointer",
    transition: "0.3s",
    "&:hover": {
      boxShadow: (theme) => theme.shadows[3],
    },
  },
  backArrow: {
    color: "white",
    transition: "0.3s",
  },
  backArrow_collapsed: {
    transition: "0.3s",
    transform: "rotate(180deg)",
  },
};

export default styles;
