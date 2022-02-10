import React from "react";

import { Link } from "react-router-dom";

import { makeStyles, useTheme } from "@material-ui/core";
import styles from "./styles";

const useStyles = makeStyles(styles);

const ListItem = ({ text, link }) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  return (
    <Link to={link} style={{ textDecoration: "none" }}>
      <div className={classes.list_item}>
        <div className={classes.list_item_bar}></div>
        <div className={classes.list_item_item}>{text}</div>
      </div>
    </Link>
  );
};

export default ListItem;
