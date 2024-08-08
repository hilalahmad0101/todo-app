import React from "react";
import { Box, Button, useTheme, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../theme/theme";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { apiBase, userToken } from "../../../config";
import axios from "axios";

const UsersList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [rowsData, setRowsData] = useState([]);

  const columns = [
    { field: "id", headerName: "ID", headerAlign: "center", align: "center" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      headerAlign: "center",
      align: "center",
      cellClassName: "name-column--cell",
    },
    {
      field: "email",
      headerName: "Email",
      type: "email",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "role",
      headerName: "Role",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => (
        <>
          <Button
            variant="contained"
            color="primary"
            sx={{ backgroundColor: colors.greenAccent[600] }}
          >
            Edit
          </Button>

          <Button
            variant="contained"
            color="primary"
            sx={{ ml: 1, backgroundColor: "red" }}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  const fetchData = async () => {
    let headersList = {
      Accept: "*/*",
      "x-access-token": userToken,
    };
    let reqOptions = {
      url: `${apiBase}/admin/user`,
      method: "GET",
      headers: headersList,
    };
    try {
      let response = await axios.request(reqOptions);
      setRowsData(response.data.users);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box m="20px">
      <Header title="All USER" subtitle="Users List With Their Assigned Role" />

      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
            textAlign: "center", // Ensure text is centered
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid
          // checkboxSelection
          rows={rowsData}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5, 10, 20]}
        />
      </Box>
    </Box>
  );
};

export default UsersList;
