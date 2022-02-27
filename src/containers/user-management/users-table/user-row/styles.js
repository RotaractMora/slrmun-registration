const styles = {
  name_cell: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  no_bottom_border: {
    borderBottom: "none",
  },
  profile_picture: {
    height: "50px",
    width: "50px",
    borderRadius: "50%",
  },
  admin_area_row: {
    backgroundColor: (theme) => theme.palette.grey[300],
  },
  bank_slip_img: {
    height: "50px",
  },
  btn: {
    margin: 3,
  },
  smallTableCell: {
    padding: 0,
  },
  table: {
    margin: 10,
  },
  numberCell: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    "& img": {
      width: 20,
      margin: 0,
      marginRight: 5,
      padding: 0,
    },
  },
};

export default styles;
