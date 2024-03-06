import { Button, CircularProgress, styled } from "@mui/material";
import React, { ChangeEvent } from "react";
import UploadIcon from "@mui/icons-material/Upload";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

interface IFileUploadButtonProps {
  title: string;
  isUploading?: boolean;
  handleFileChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const FileUploadButton: React.FC<IFileUploadButtonProps> = ({
  title,
  isUploading = false,
  handleFileChange,
}) => {
  return (
    <React.Fragment>
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<UploadIcon />}
        sx={{ display: isUploading ? "none" : "flex" }}
      >
        {title}
        <VisuallyHiddenInput
          type="file"
          accept=".csv"
          onChange={handleFileChange}
        />
      </Button>
      {isUploading && <CircularProgress color="primary" />}
    </React.Fragment>
  );
};

export default FileUploadButton;
