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
          height: "130vh",
          width: "100%",
        },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "20px auto",
    padding: "10px 30px",
    boxShadow: "0px 0px 5px gray",
    backgroundSize: "cover",
    width: "fit-content",
    borderRadius: "20px",
    backgroundColor: "white",
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
