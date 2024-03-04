import { Button, styled } from "@mui/material";
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
  handleFileChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const FileUploadButton: React.FC<IFileUploadButtonProps> = ({
  title,
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
      >
        {title}
        <VisuallyHiddenInput type="file" onChange={handleFileChange} />
      </Button>
    </React.Fragment>
  );
};

export default FileUploadButton;
