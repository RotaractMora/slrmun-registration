import React, { useState } from "react";

import { makeStyles, useTheme, TextField } from "@material-ui/core";
import styles from "./styles";

import ListItem from "./list-item/ListItem";
import { useEffect } from "react";

import { BASE_URL, DEFAULT_FLAG } from "../../constants/routes";

const useStyles = makeStyles(styles);

const DropDown = ({ list, selectedId, setSelectedId }) => {
  // styling
  const theme = useTheme();
  const classes = useStyles(theme);
  let listClass = classes.list;

  //states
  const [expanded, setExpanded] = useState(false);
  const [selectedObj, setSelectedObj] = useState({});
  const [visibleList, setVisibleList] = useState({});

  // console.log(selectedId);

  // handler functions
  const handleListItemClick = (key, available) => {
    if (available) {
      setSelectedId(key);
      setSelectedObj(list[key]);
      setExpanded(false);
    }
  };
  const handleSelectedTileClick = () => {
    setExpanded(!expanded);
  };

  const handleTextBoxClick = (event) => {
    if (expanded) {
      event.stopPropagation();
    }
  };
  const updateVisibleList = (starting_value) => {
    const localVisibleList = {};
    for (const key in list) {
      if (Object.hasOwnProperty.call(list, key)) {
        const element = list[key];
        if (
          element.text.toLowerCase().startsWith(starting_value.toLowerCase())
        ) {
          localVisibleList[key] = element;
        }
      }
    }
    setVisibleList(localVisibleList);
  };
  const handleChangeText = (event) => {
    const input_text = event.target.value;
    setSelectedObj({ ...selectedObj, text: input_text });
    updateVisibleList(input_text);
  };

  // state update
  useEffect(() => {
    if (list) {
      setVisibleList(list);
      setSelectedObj(list[selectedId]);
    }
  }, [list]);
  useEffect(() => {
    if (list) setSelectedObj(list[selectedId]);
  }, [selectedId]);

  // styling
  if (expanded) {
    listClass = [classes.list, classes.visible].join(" ");
  }

  return (
    <div className={classes.root}>
      <div className={classes.selectedTile} onClick={handleSelectedTileClick}>
        <img
          className={[classes.image, classes.selectedImage].join(" ")}
          src={
            selectedObj
              ? selectedObj.imageUrl
                ? BASE_URL + selectedObj.imageUrl
                : BASE_URL + DEFAULT_FLAG
              : BASE_URL + DEFAULT_FLAG
          }
        />
        <TextField
          disabled={!expanded}
          value={
            selectedObj
              ? selectedObj.text
                ? selectedObj.text
                : "None"
              : "None"
          }
          InputProps={{ disableUnderline: true, className: classes.text_field }}
          onClick={handleTextBoxClick}
          onChange={handleChangeText}
        />
      </div>
      <div className={listClass}>
        {visibleList
          ? Object.entries(visibleList).map((arr) => (
              <ListItem
                key={arr[0]}
                object={arr[1]}
                onClick={() => handleListItemClick(arr[0], arr[1].available)}
              />
            ))
          : null}
      </div>
    </div>
  );
};

export default DropDown;
