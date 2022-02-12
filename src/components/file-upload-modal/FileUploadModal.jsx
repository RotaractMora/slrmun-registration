import React, { useRef } from "react";

import { makeStyles, useTheme, Typography, Button } from "@material-ui/core";

import styles from "./styles";

import CircularProgressWithLabel from "../circular-progress-with-label/CircularProgressWithLabel";

const useStyles = makeStyles(styles);

const FileUploadModal = ({ onFileUpload, closeModal, progress }) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const inputRef = useRef(null);

  //   handler functions
  const onBtnClick = () => {
    inputRef.current.click();
  };

  const onChange = (e) => {
    onFileUpload(e);
  };

  return (
    <div className={classes.root} onClick={closeModal}>
      <div className={classes.container} onClick={(e) => e.stopPropagation()}>
        <div className={classes.drop_area}>
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
