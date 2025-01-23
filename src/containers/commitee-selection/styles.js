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
      height: "200vh",
      width: "120%",
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
    margin: "20px",
  },
  body1: {
    color: "gray",
    marginTop: 30,
    maxWidth: "350px",
    textAlign: "justify",
  },
  reservation: {
    //color: "white",
    backgroundColor: "#b2bec3",
    padding: "25px",
    borderRadius: "5px",
    boxShadow: "4px 4px 4px gray",
    paddingTop : "8px",
  },

};

export default styles;
