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
    margin: "20px",
  },
  breaker: {
    height: "2px",
    width: "100%",
    backgroundColor: "gray",
    margin: "30px auto",
  },
  bank_slip_img: {
    width: "300px",
    maxWidth: "80vw",
  },
  uploaded_image_container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
};

export default styles;
