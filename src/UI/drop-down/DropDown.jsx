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
  let selectedObj = {};
  if (list) {
    selectedObj = list[selectedId];
  }
  let temp_img_url = "/images/country-flags/default-flag.jpg";
  let temp_text = "None";
  const [selectedImageUrl, setSelectedImageUrl] = useState(temp_img_url);
  const [selectedText, setSelectedText] = useState(temp_text);

  // re-rendering for the committee selection
  if (selectedObj && selectedText === "None" && selectedId !== undefined) {
    if (selectedObj.imageUrl !== undefined) {
      setSelectedImageUrl(selectedObj.imageUrl);
    }
    setSelectedText(selectedObj.text);
  }
  // re-rendering for the country selection. Mokada wenne kiyala nan danne naa xD
  if (
    list &&
    selectedText === undefined &&
    selectedObj &&
    selectedId !== undefined
  ) {
    if (selectedObj.imageUrl !== undefined) {
      setSelectedImageUrl(selectedObj.imageUrl);
    }
    setSelectedText(selectedObj.text);
  }

  const [visibleList, setVisibleList] = useState(list);
  useEffect(() => {
    setVisibleList(list);
  }, [list]);

  const handleListItemClick = (key, available) => {
    if (available) {
      setSelectedId(key);
      setImageAndText(key);
      setExpanded(false);
    }
  };

  const setImageAndText = (key) => {
    if (list) {
      let selectedObj = list[selectedId];
      if (key) {
        selectedObj = list[key];
      }
      if (selectedObj) {
        setSelectedText(selectedObj.text);
        setSelectedImageUrl(selectedObj.imageUrl);
      }
    }
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
