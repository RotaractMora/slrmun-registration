import bgImage from '../../assets/images/bg_image_03.jpg';

const styles = {
  root : {
    display: "flex",
    flexDirection: "column",
    // justifyContent: "center",
    //alignItems: "center",
    margin: "auto",
    padding: "10px 30px",
    boxShadow: "0px 0px 5px gray",
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('${bgImage}')`,
    height: "100vh",
    width: "100%",
  },

  h1: {
    margin: "20px",
  },

  green: {
    backgroundColor: (theme) => theme.palette.success.light,
  },

  red: {
    backgroundColor: (theme) => theme.palette.error.light,
  },
};

export default styles;
