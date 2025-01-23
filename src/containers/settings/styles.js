import bgImage from '../../assets/images/bg_image_03.jpg';
const styles = {
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
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "20px auto",
    padding: "10px 30px",
    boxShadow: "0px 0px 5px gray",
    width: "fit-content",
    borderRadius: "20px",
    backgroundColor: "white",
  },

  h1: {
    paddingBottom: 40,
  },
  btn_container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  btn: {
    width: 150,
    margin: 20,
  },
};

export default styles;
