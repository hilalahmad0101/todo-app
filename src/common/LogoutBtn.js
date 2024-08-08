import { Button } from "@mui/material";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { apiBase } from "../../config";

function LogoutBtn() {
  const navigate = useNavigate();
  const userString = localStorage.getItem("user");
  const user = JSON.parse(userString);
  const uid = user.id;
  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      let headersList = {
        Accept: "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        "Content-Type": "application/json",
      };

      let bodyContent = JSON.stringify({
        id: uid,
      });

      let reqOptions = {
        url: apiBase + "/auth/logout",
        method: "POST",
        headers: headersList,
        data: bodyContent,
      };

      try {
        let response = await axios.request(reqOptions);
        // Cookies.remove("sessionToken");
        alert("Logged out successfully");
        localStorage.removeItem("user");
        navigate("/");
        // window.location.reload();
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <Button
      variant="contained"
      color="primary"
      // onClick={() => {
      //   localStorage.removeItem("user");
      //   navigate("/");
      // }}
      onClick={handleLogout}
    >
      log out
    </Button>
  );
}

export default LogoutBtn;
