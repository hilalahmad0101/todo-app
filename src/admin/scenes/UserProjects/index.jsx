import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import {
  Box,
  Grid,
  Button,
  useTheme,
  Typography,
  CircularProgress,
  IconButton,
  Modal,
  Select,
  MenuItem,
  Alert,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { tokens } from "../../../theme/theme";
import ShareSharpIcon from "@mui/icons-material/ShareSharp";
import axios from "axios";
import { apiBase } from "../../../../config";
import FolderIcon from "@mui/icons-material/Folder";
import { useNavigate } from "react-router-dom";
function UserProjects() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const userString = localStorage.getItem("user");
  const user = JSON.parse(userString);
  const token = user.token;
  console.log(token);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      let headersList = {
        Accept: "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        "x-access-token": token,
      };
      let reqOptions = {
        url: `${apiBase}/admin/user/projects`,
        method: "GET",
        headers: headersList,
      };
      try {
        let response = await axios.request(reqOptions);
        setProjects(response?.data.data);
        console.log("data.data", response?.data.data);
        setLoading(false);
      } catch (error) {}
    };
    fetchData();
  }, []);
  const handleClick = (userId, modelUrn) => {
    navigate("/admin/commentsList", { state: { userId, modelUrn } });
  };
  return (
    <Box m="20px">
      <Header title="Users Project" subtitle="List of assign projects" />

      <Box
        display="flex"
        sx={{
          overflow: "auto",
          flexDirection: "column",
          height: "100vh",
        }}
      >
        {projects.length === 0 ? (
          <Typography variant="h4" color="secondary" sx={{ ml: 1, mt: 2 }}>
            No Projects Found
          </Typography>
        ) : (
          <>
            <Grid container spacing={1}>
              {loading ? (
                <Box sx={{ display: "flex", m: "20px" }}>
                  <CircularProgress color="secondary" />
                  <Typography variant="body1" color="secondary">
                    loading...
                  </Typography>
                </Box>
              ) : (
                <>
                  {projects.map((item, index) => (
                    <Grid item md={4} sm={12}>
                      <Box backgroundColor={colors.primary[400]} display="flex">
                        <Box
                          sx={{
                            width: "100%",
                            padding: 1,
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Box sx={{ m: 2 }}>
                            <Typography variant="body1" color="secondary">
                              {item.user.name}
                            </Typography>
                            {item.projects.map((proj, index) => (
                              // <Typography variant="body1" color="secondary">
                              //     {proj.modelName}
                              // </Typography>
                              <Box
                                onClick={() =>
                                  handleClick(proj.userId, proj.modelUrn)
                                }
                                sx={{ cursor: "pointer" }}
                              >
                                <ListItem>
                                  <ListItemIcon>
                                    <FolderIcon />
                                  </ListItemIcon>
                                  <ListItemText
                                    primary={proj.modelName}
                                    // secondary={secondary ? 'Secondary text' : null}
                                  />
                                </ListItem>
                              </Box>
                            ))}
                          </Box>
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </>
              )}
            </Grid>
          </>
        )}
      </Box>
    </Box>
  );
}

export default UserProjects;
