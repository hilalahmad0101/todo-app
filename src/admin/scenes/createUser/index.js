import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  TextField,
  Button,
  Box,
  MenuItem,
  Grid,
  useTheme,
  styled,
  Alert,
} from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../../theme/theme";
import axios from "axios"; // Import axios
import { apiBase } from "../../../config";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  role: yup.string().required("Role is required"),
});

const roles = ["ADMIN", "USER"];

const CreateUser = () => {
  const navigate = useNavigate();

  const [alert, setAlert] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const secondaryColor = colors.greenAccent[500];
  const userString = localStorage.getItem("user");
  const user = JSON.parse(userString);
  const token = user.token;
  console.log(token);
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      role: "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      setLoading(true);
      console.log(values, "data");
      let requestHeader = {
        "x-access-token": token,
        "Content-Type": "application/json",
      };
      let reqOptions = {
        url: `${apiBase}/admin/user/create`,
        method: "POST",
        headers: requestHeader,
        data: JSON.stringify(values),
      };
      try {
        let response = await axios.request(reqOptions);
        setAlert({ type: "success", message: "User Added Success fully" });
        formik.resetForm();
        // navigate('/usersList')
        console.log(response.data);
      } catch (error) {
        setAlert({
          type: "error",
          message:
            error.response?.data?.message ||
            "An error occurred. Please try again.",
        });
        setLoading(false);
        console.log(error.message);
      }
    },
  });

  return (
    <Box m="20px">
      <Header
        title="CREATE USERS"
        subtitle="Create a new user and assign them roles"
      />
      {alert.message && (
        <Alert severity={alert.type} sx={{ mb: 2 }}>
          {alert.message}
        </Alert>
      )}
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item md={6}>
            <Box sx={{ mt: 1 }}>
              <CustomInput
                label="Name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                fullWidth
                type="text"
                secondaryColor={secondaryColor}
              />
            </Box>
          </Grid>
          <Grid item md={6}>
            <Box sx={{ mt: 1 }}>
              <CustomInput
                label="Email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                fullWidth
                type="text"
                secondaryColor={secondaryColor}
              />
            </Box>
          </Grid>
          <Grid item md={6}>
            <Box sx={{ mt: 1 }}>
              <CustomInput
                label="Role"
                name="role"
                select
                value={formik.values.role}
                onChange={formik.handleChange}
                error={formik.touched.role && Boolean(formik.errors.role)}
                helperText={formik.touched.role && formik.errors.role}
                fullWidth
                secondaryColor={secondaryColor}
              >
                {roles.map((role) => (
                  <MenuItem key={role} value={role}>
                    {role}
                  </MenuItem>
                ))}
              </CustomInput>
            </Box>
          </Grid>
        </Grid>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            sx={{ mt: 2 }}
          >
            Submit
          </Button>
        </Box>
      </form>
    </Box>
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

export default CreateUser;
