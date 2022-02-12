import React from "react";

import { Link } from "react-router-dom";

import { makeStyles, useTheme } from "@material-ui/core";
import styles from "./styles";

const useStyles = makeStyles(styles);

const ListItem = ({ text, link, active, onClick }) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  let list_item_class = classes.list_item;
  if (active) {
    list_item_class = [classes.list_item, classes.active_list_item].join(" ");
  }

  return link ? (
    <Link to={link} style={{ textDecoration: "none" }} onClick={onClick}>
      <div className={list_item_class}>
        <div className={classes.list_item_bar}></div>
        <div className={classes.list_item_item}>{text}</div>
      </div>
    </Link>
  ) : (
    <div onClick={onClick} className={list_item_class}>
      <div className={classes.list_item_bar}></div>
      <div className={classes.list_item_item}>{text}</div>
    </div>
  );
};

export default ListItem;
