import React, { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  styled,
  TextField,
  useTheme,
} from "@mui/material";
import { tokens } from "../theme/theme";
import { apiBase } from "../config";
import axios from "axios";

const ModelUploader = ({
  onModelUpload,
  setAlertOpen,
  setMessage,
  setAlertType,
}) => {
  const [file, setFile] = useState(null);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const secondaryColor = colors.greenAccent[500]; // Secondary color
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;
    let data = new FormData();
    data.append("model-file", file);
    try {
      setLoading(true);
      const response = await axios.post(apiBase + "/api/models", data);
      console.log(response.data);
      setAlertType("success");
      setMessage("Model uploaded successfully!");
      setAlertOpen(true);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Failed to upload model:", error);
      setAlertType("error");
      setMessage("Model uploaded Error!");
      setAlertOpen(true);
    }
  };

  return (
    <>
      <CustomInput
        fullWidth
        id="file"
        type="file"
        onChange={handleFileChange}
        // error={Boolean(fileError)}
        // helperText={fileError}
        secondaryColor={secondaryColor}
      />
      <Box
        display="flex"
        sx={{
          width: "100%",
          justifyContent: "flex-end",
          mt: { sm: 2, md: 3, lg: 4, xl: 5 },
        }}
      >
        <Button
          type="submit"
          onClick={handleUpload}
          color="secondary"
          variant="contained"
        >
          {loading ? <CircularProgress /> : "Submit"}
        </Button>
      </Box>
    </>
  );
};

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
export default ModelUploader;
