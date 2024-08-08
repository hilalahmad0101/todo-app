import React, { useState } from "react";
import ModelSelector from "../components/ModelSelector";
// import Viewer from "../components/Viewer";
import Notification from "../components/Notification";
import "./main.css";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LogoutBtn from "../common/LogoutBtn";

const ForgeViewer = () => {
  const [urn, setUrn] = useState("");
  const [notification, setNotification] = useState("");
  const navigate = useNavigate();
  const handleModelSelect = (urn) => {
    setUrn(urn);
    setNotification("");
    console.log(urn);
  };

  // const handleLogout = async () => {
  //   let headersList = {
  //     Accept: "*/*",
  //     "x-access-token": token,
  //   };
  //   let reqOptions = {
  //     url: `${apiBase}/auth/logout`,
  //     method: "POST",
  //     headers: headersList,
  //   };
  //   try {
  //     let response = await axios.request(reqOptions);
  //     // Cookies.remove("sessionToken");
  //     alert("Logged out successfully");
  //     localStorage.removeItem("user");
  //     navigate("/");
  //     window.location.reload();
  //     console.log(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  console.log("urn", urn);
  return (
    <>
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
        <Box>
          <ModelSelector onSelect={handleModelSelect} />
          {/* <Notification message={notification} /> */}
        </Box>
      </Box>
      <Box sx={{ height: "100vh" }}>
        {/* <Viewer urn={urn} /> */}
      </Box>
    </>
  );
};

export default ForgeViewer;
