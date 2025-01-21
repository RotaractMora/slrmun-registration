const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "auto",
    padding: "10px 30px",
    boxShadow: "0px 0px 5px gray",
    backgroundImage: "url('https://images.unsplash.com/photo-1482784160316-6eb046863ece?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')", // Add this line
    backgroundSize: "cover", // Optional: cover the entire container
    backgroundPosition: "center", // Optional: center the image
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