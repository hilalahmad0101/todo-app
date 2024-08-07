import React, { useState } from "react";
import { Box, Button, styled, useTheme } from "@mui/material";
import Header from "../../components/Header";
import TextField from "@mui/material/TextField";
import { tokens } from "../../../theme/theme";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import TransitionAlerts from "../../components/Alert";
import ModelUploader from "../../../components/ModelUploader";
function UploadContent() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const secondaryColor = colors.greenAccent[500]; // Secondary color
  const [fileError, setFileError] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [urn, setUrn] = useState("");
  const [notification, setNotification] = useState("");
  const handleModelUpload = (urn) => {
    setUrn(urn);
    setNotification("Model uploaded successfully!");
  };

  return (
    <Box m="20px">
      <Header title="UPLOAD 3D IMAGE " subtitle="The image formate must be" />
      <TransitionAlerts
        open={alertOpen}
        message={message}
        setAlertOpen={setAlertOpen}
        alertType={alertType}
      />
      <ModelUploader onModelUpload={handleModelUpload} setAlertOpen={setAlertOpen} setMessage={setMessage} setAlertType={setAlertType} />
    </Box>
  );
}

const CustomInput = styled(({ secondaryColor, ...other }) => (
  <TextField {...other} />
))`
  & label.Mui-focused {
    color: ${(props) => props.secondaryColor};
  }
  & .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border-color: ${(props) => props.secondaryColor};
    }
    fieldset {
      border-color: ${(props) => props.secondaryColor};
    }
    &:hover fieldset {
      border-color: ${(props) => props.secondaryColor};
    }
  }
`;

export default UploadContent;
