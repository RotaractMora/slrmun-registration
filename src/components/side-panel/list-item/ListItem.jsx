import React from "react";

import { Link } from "react-router-dom";

import { makeStyles, useTheme } from "@material-ui/core";
import styles from "./styles";

const useStyles = makeStyles(styles);

const ListItem = ({ text, DispIcon, link, active, collapsed, onClick }) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  let list_item_class = classes.list_item;
  if (active) {
    list_item_class = [classes.list_item, classes.active_list_item].join(" ");
  }

  let list_item_text_class = classes.list_item_text;
  if (collapsed) {
    list_item_text_class = [
      list_item_class,
      classes.list_item_text_collapsed,
    ].join(" ");
  }

  return link ? (
    <Link to={link} style={{ textDecoration: "none" }} onClick={onClick}>
      <div className={list_item_class}>
        <div className={classes.list_item_bar}></div>
        {DispIcon ? <DispIcon className={classes.list_item_icon} /> : null}
        <div className={list_item_text_class}>{text}</div>
      </div>
    </Link>
  ) : (
    <div onClick={onClick} className={list_item_class}>
      <div className={classes.list_item_bar}></div>
      {DispIcon ? <DispIcon className={classes.list_item_icon} /> : null}
      <div className={list_item_text_class}>{text}</div>
    </div>
  );
};

export default ListItem;
