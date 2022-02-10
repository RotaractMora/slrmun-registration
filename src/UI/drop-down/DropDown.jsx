import React, { useState } from "react";

import { makeStyles, useTheme, TextField } from "@material-ui/core";
import styles from "./styles";

import ListItem from "./list-item/ListItem";
import { useEffect } from "react";

const useStyles = makeStyles(styles);

const DropDown = ({ list, selectedId, setSelectedId }) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const [expanded, setExpanded] = useState(false);
  const selectedObj = list[selectedId];
  const [selectedImageUrl, setSelectedImageUrl] = useState(
    selectedObj.imageUrl
  );
  const [selectedText, setSelectedText] = useState(selectedObj.text);
  const [visibleList, setVisibleList] = useState(list);

  const handleListItemClick = (key, available) => {
    if (available) {
      setSelectedId(key);
      setImageAndText(key);
      setExpanded(false);
    }
  };

  const setImageAndText = (key) => {
    let selectedObj = list[selectedId];
    if (key) {
      selectedObj = list[key];
    }
    setSelectedImageUrl(selectedObj.imageUrl);
    setSelectedText(selectedObj.text);
  };

  const handleSelectedTileClick = () => {
    if (expanded) {
      setImageAndText();
      setVisibleList(list);
    }
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
    setSelectedText(event.target.value);
    updateVisibleList(event.target.value);
  };

  useEffect(() => {
    setImageAndText();
  }, [selectedId]);

  let listClass = classes.list;
  if (expanded) {
    listClass = [classes.list, classes.visible].join(" ");
  }

  return (
    <div className={classes.root}>
      <div className={classes.selectedTile} onClick={handleSelectedTileClick}>
        <img
          className={[classes.image, classes.selectedImage].join(" ")}
          src={selectedImageUrl}
        />
        <TextField
          disabled={!expanded}
          value={selectedText}
          InputProps={{ disableUnderline: true }}
          onClick={handleTextBoxClick}
          onChange={handleChangeText}
        />
      </div>
      <div className={listClass}>
        {Object.entries(visibleList).map((arr) => (
          <ListItem
            key={arr[0]}
            object={arr[1]}
            onClick={() => handleListItemClick(arr[0], arr[1].available)}
          />
        ))}
      </div>
    </div>
  );
};

export default DropDown;
