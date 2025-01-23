import bgImage from '../../assets/images/bg_image_02.png';
const styles = {
  // root: {
    // display: "flex",
    // flexDirection: "column",
    // alignItems: "center",
    // margin: "auto",
    // padding: "10px 30px",
    // boxShadow: "0px 0px 5px gray",
    // backgroundImage: `url('${bgImage}')`, // Add this line
    // backgroundSize: "cover", // Optional: cover the entire container
    // backgroundPosition: "center", // Optional: center the image
    root: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      margin: "auto",
      padding: "10px 30px",
      boxShadow: "0px 0px 5px gray",
      backgroundImage:
        `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('${bgImage}')`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      height: "115vh",
      width: "100%",
    },


  container: {
    borderRadius: "10px",
    padding: "40px",
    boxShadow: "0px 0px 5px gray",
    textAlign: "center",
    backgroundColor: "rgba(255, 255, 255, 0.94)", // Optional: add a semi-transparent background to the form
  },
  h1: {
    marginBottom: "30px",
  },
  button: {
    width: "100px",
    margin: "20px 10px",
  },
  link: {
    color: "#0000FF",
    textDecoration: "underline",
    cursor: "pointer",
  },
};

export default styles;