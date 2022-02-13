const styles = {
  header: {
    position: "fixed",
    width: "100%",
    zIndex: 5,
    backgroundColor: (props) => props.palette.primary.main,
    padding: "5px",
    borderBottom: "1px solid gray",
    display: "none",
    "@media screen and (max-width: 768px)": {
      display: "block",
    },
  },
  burger: {
    margin: "10px",
    padding: "5px",
    width: "fit-content",
    cursor: "pointer",
    transition: "0.3s",
    borderRadius: "5px",
    "&:hover": {
      backgroundColor: "#fff4",
      boxShadow: "0px 0px 5px black",
    },
  },
  line: {
    width: "30px",
    height: "2px",
    margin: "6px 0px",
    backgroundColor: "white",
    transition: "0.3s",
  },
  line1: {
    transform: "translateY(8px) rotate(45deg)",
  },
  line2: {
    opacity: 0,
  },
  line3: {
    transform: "translateY(-8px) rotate(-45deg)",
  },
};

export default styles;
