import { useEffect, useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { tokens } from "../../../theme/theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
// import profile from "../../assets/user.png";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import DescriptionIcon from "@mui/icons-material/Description";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import PreviewIcon from "@mui/icons-material/Preview";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
const Item = ({ title, to, icon, selected, setSelected, onClick }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const Navigate = useNavigate();
  return (
    <Button
      variant="text"
      onClick={() => Navigate(to)}
      sx={{ textTransform: "capitalize", width: "100%" }}
    >
      <MenuItem
        active={selected === title}
        style={{
          color: colors.grey[100],
        }}
        onClick={() => setSelected(title)}
        icon={icon}
      >
        <Typography>{title}</Typography>
      </MenuItem>
    </Button>
  );
};

function SideBar() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Sidebar
      collapsed={isCollapsed}
      backgroundColor={colors.primary[400]}
      rootStyles={{
        borderRight: 0,
      }}
    >
      <Menu
        iconShape="square"
        menuItemStyles={{
          button: ({ level, active, disabled }) => {
            if (level === 0) {
              return {
                color: disabled ? "#eee" : "#455A64",
                backgroundColor: active ? "#6870fa" : undefined,
                "&:hover": {
                  backgroundColor: "#335B8C !important",
                  color: "white !important",
                },
              };
            }
          },
        }}
      >
        {/* LOGO AND MENU ICON */}
        <MenuItem
          onClick={() => setIsCollapsed(!isCollapsed)}
          icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
          style={{
            margin: "10px 0 20px 0",
            color: colors.grey[100],
          }}
        >
          {!isCollapsed && (
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              ml="15px"
            >
              <Typography variant="h3" color={colors.grey[100]}>
                ADMINS
              </Typography>
              <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                <MenuOutlinedIcon />
              </IconButton>
            </Box>
          )}
        </MenuItem>

        {/* menu items */}
        <Box paddingLeft={isCollapsed ? undefined : "10%"}>
          <Item
            title="Dash Board"
            to="/admin/dashboard"
            icon={<HomeOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />

          <Typography
            variant="h6"
            color={colors.grey[300]}
            sx={{ m: "15px 20px 5px 20px" }}
          >
            Content
          </Typography>

          <Item
            title="Upload Content"
            to="/admin/uploadContent"
            icon={<CloudUploadIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="View Content"
            to="/admin/viewContent"
            icon={<PreviewIcon />}
            selected={selected}
            setSelected={setSelected}
          />

          <Item
            title="Create User"
            to="/admin/createUsers"
            icon={<GroupAddIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Users List"
            to="/admin/usersList"
            icon={<DescriptionIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="User Projects"
            to="/admin/userProjects"
            icon={<DescriptionIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          {/* <Item
            title=""
            to="/admin/commentsList"
            // icon={<DescriptionIcon />}
            selected={selected}
            setSelected={setSelected}
          /> */}
        </Box>
      </Menu>
    </Sidebar>
  );
}

export default SideBar;
