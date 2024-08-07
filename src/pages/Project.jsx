import React from "react";
import { Box, Button, Container, Typography, Grid } from "@mui/material";
import ArticleIcon from "@mui/icons-material/Article";
import FoodBankIcon from "@mui/icons-material/FoodBank";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import Forward30Icon from "@mui/icons-material/Forward30";
import ThreeDRotationIcon from "@mui/icons-material/ThreeDRotation";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { apiBase } from "../../config";
import LogoutBtn from "../common/LogoutBtn";
// Import more icons as needed

const items = [
  {
    icon: <ArticleIcon sx={{ fontSize: 40 }} />,
    label1: "Auto Desk",
    label2: "360 view",
  },
  {
    icon: <FoodBankIcon sx={{ fontSize: 40 }} />,
    label1: "Auto Desk",
    label2: "360 view",
  },

  {
    icon: <DirectionsCarIcon sx={{ fontSize: 40 }} />,
    label1: "Auto Desk",
    label2: "360 view",
  },
  // Add more items as needed
];

const Project = () => {
  const userString = localStorage.getItem("user");
  const user = JSON.parse(userString);
  const token = user.token;
  console.log(token);
  const navigate = useNavigate();
  const handleClick = () => {
    window.location.href =
      "https://1816-1.s3.ap-northeast-1.amazonaws.com/Output+3/index.htm";
  };
  const handleLogout = async () => {
    let headersList = {
      Accept: "*/*",
      "x-access-token": token,
    };
    let reqOptions = {
      url: `${apiBase}/auth/logout`,
      method: "POST",
      headers: headersList,
    };
    try {
      let response = await axios.request(reqOptions);
      // Cookies.remove("sessionToken");
      alert("Logged out successfully");
      localStorage.removeItem("user");
      navigate("/");
      window.location.reload();
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container maxWidth="'lg'">
      <Box
        display={"flex"}
        sx={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 1,
          borderBottom: 1,
        }}
      >
        <Box>
          <LogoutBtn />
        </Box>
      </Box>
      <Box sx={{ mt: 2 }}>
        <Typography variant="h5" color="initial" sx={{ mb: 1 }}>
          Project 1
        </Typography>
        <Grid container spacing={1}>
          <Grid item md={4}>
            <Box
              onClick={() => navigate("/forgeviewer")}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#f3f3f3",
                gap: "20px",
                padding: "10px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                borderRadius: "12px",
                cursor: "pointer",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "scale(1.005)",
                  boxShadow: "0 6px 12px rgba(0,0,0,0.2)",
                },
              }}
            >
              <ThreeDRotationIcon sx={{ fontSize: 40 }} />
              <Typography variant="body1" color="initial">
                Auto Desk
              </Typography>
            </Box>
          </Grid>
          <Grid item md={4}>
            <Box
              component="a"
              onClick={() => navigate("/View360")}
              target="_blank"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#f3f3f3",
                padding: "10px",
                gap: "20px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                borderRadius: "12px",
                cursor: "pointer",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0 6px 12px rgba(0,0,0,0.2)",
                },
                textDecoration: "none",
              }}
            >
              <Forward30Icon sx={{ fontSize: 40 }} />
              <Typography variant="body1" color="initial">
                360^0 image
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Project;
