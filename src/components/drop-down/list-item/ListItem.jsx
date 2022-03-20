import React from "react";

import { makeStyles, useTheme, Typography } from "@material-ui/core";
import styles from "./styles";

import { BASE_URL } from "../../../constants/general";

const useStyles = makeStyles(styles);

const ListItem = ({
  object,
  injectingCount,
  showRequestCounts,
  onClick,
  isSelectedItem,
}) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  let textClass = classes.text;
  if (!object.availability && !isSelectedItem) {
    textClass = [classes.text, classes.strike].join(" ");
  }
  return (
    <div className={classes.root} onClick={onClick}>
      <img className={classes.image} src={BASE_URL + object.imageUrl} />
      <Typography className={textClass} variant="body1">
        {object.text}
      </Typography>
      {(object.req_count > 0 || object.req_count + injectingCount > 0) &&
      showRequestCounts ? (
        <span className={classes.badge}>
          {injectingCount
            ? injectingCount + object.req_count
            : object.req_count}
        </span>
      ) : null}
    </div>
  );
};

export default ListItem;
