import React, { useRef, useState } from "react";

import { makeStyles, useTheme, Typography, Button } from "@material-ui/core";

import styles from "./styles";

import CircularProgressWithLabel from "../circular-progress-with-label/CircularProgressWithLabel";

const useStyles = makeStyles(styles);

const FileUploadModal = ({ onFileUpload, closeModal, progress }) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const [dropAreaClass, setDropAreaClass] = useState(classes.drop_area);

  const inputRef = useRef(null);

  //   handler functions
  const onBtnClick = () => {
    inputRef.current.click();
  };
  const handleOnDragOver = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const newDropAreaClass = [classes.drop_area, classes.drop_area_active].join(
      " "
    );
    setDropAreaClass(newDropAreaClass);
  };
  const handleOnDragLonDragLeave = () => {
    setDropAreaClass(classes.drop_area);
  };
  const handleOnDrop = (e) => {
    e.preventDefault();
    onFileUpload(e);
  };

  const onChange = (e) => {
    onFileUpload(e);
  };

  return (
    <div className={classes.root} onClick={closeModal}>
      <div
        className={classes.container}
        onClick={(e) => e.stopPropagation()}
        onDragOver={handleOnDragOver}
        onDragLeave={handleOnDragLonDragLeave}
        onDrop={handleOnDrop}
      >
        <div className={dropAreaClass}>
          {progress > 0 ? (
            <CircularProgressWithLabel value={progress} />
          ) : (
            <div className={classes.contents}>
              <Typography variant="body2">Drag and Drop Image Here</Typography>
              <Typography variant="body2">---OR---</Typography>
              <input type="file" hidden ref={inputRef} onChange={onChange} />
              <Button color="primary" variant="contained" onClick={onBtnClick}>
                Select File
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUploadModal;
