import bgImage from '../../assets/images/bg_image_02.png';
const styles = {
  // root: {
  //   display: "flex",
  //   height: "100vh",
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: "auto",
        padding: "10px 30px",
        boxShadow: "0px 0px 5px gray",
        backgroundImage:
          `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('${bgImage}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        width: "100%",
      },
  container: {
    maxWidth: "400px",
    borderRadius: "10px",
    padding: "40px",
    boxShadow: "0px 0px 5px gray",
    textAlign: "center",
    backgroundColor: "white",
  },
  h1: {
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
