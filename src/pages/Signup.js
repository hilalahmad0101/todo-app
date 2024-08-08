import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  Divider,
  styled,
  Link,
  CircularProgress,
  InputAdornment,
  IconButton,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import AppleIcon from "@mui/icons-material/Apple";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import CustomInput from "../common/TextFeild";
import { apiBase } from "../config";
import TransitionAlerts from "../common/Alert";
import MsgAlert from "../admin/scenes/global/MsgAlert";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Signup = () => {
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters long")
      .required("Password is required"),
  });

  const [message, setMessage] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [inputDisabled, setInputDisabled] = useState(false); // New state for disabling input

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setLoading(true);
      const response = await axios.post(`${apiBase}/auth/register`, {
        email: values.email,
        password: values.password,
        name: values.name,
      });
      console.log("Response:", response.data);
      setMessage(response.data.message);
      setAlertType("success");
      navigate("/");
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setMessage(error.response.data.message || "An error occurred");
      setAlertType("error");
      setLoading(false);
    }
    setAlertOpen(true);
    setSubmitting(false);
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (
    <Container maxWidth="lg">
      {alertOpen && (
        <TransitionAlerts
          type={alertType}
          message={message}
          onClose={handleCloseAlert}
        />
      )}
      <Container
        maxWidth="md"
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CustomContainer>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              alignItems: "center",
            }}
          >
            <Typography variant="h3" color="initial" sx={{ mb: 2 }}>
              Create Your account
            </Typography>

            <StyledButton>
              <FacebookIcon />
              Continue with Facebook
            </StyledButton>

            <StyledButton>
              <AppleIcon />
              Continue with Apple
            </StyledButton>
            <StyledButton>
              <GoogleIcon />
              Continue with Google
            </StyledButton>

            <Divider sx={{ width: "100%", mb: 2, mt: 3 }}>
              <Typography variant="body2">Or</Typography>
            </Divider>

            <Formik
              initialValues={{ name: "", email: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, errors }) => (
                <Form style={{ width: "100%" }}>
                  <Field name="name">
                    {({ field, meta }) => (
                      <>
                        <CustomInput
                          {...field}
                          placeholder="Name"
                          type="text"
                          fullWidth
                        />
                        {meta.touched && meta.error ? (
                          <Typography variant="body2" color="error">
                            {meta.error}
                          </Typography>
                        ) : null}
                      </>
                    )}
                  </Field>
                  <Field name="email">
                    {({ field, meta }) => (
                      <>
                        <CustomInput
                          {...field}
                          placeholder="Email Address"
                          type="email"
                          fullWidth
                          color={"primary"}
                          sx={{ mt: 1 }}
                        />
                        {meta.touched && meta.error ? (
                          <Typography variant="body2" color="error">
                            {meta.error}
                          </Typography>
                        ) : null}
                      </>
                    )}
                  </Field>
                  <Field name="password">
                    {({ field, meta }) => (
                      <>
                        <CustomInput
                          {...field}
                          placeholder="Password"
                          type={showPassword ? "text" : "password"}
                          fullWidth
                          sx={{ mt: 1 }}
                          autoComplete="off"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end" sx={{ mr: 1 }}>
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowPassword}
                                  edge="end"
                                >
                                  {showPassword ? (
                                    <Visibility color="primary" />
                                  
                                  ) : (
                                    <VisibilityOff color="primary" />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                            disabled: inputDisabled, // Apply disabled state
                          }}
                        />
                        {meta.touched && meta.error ? (
                          <Typography variant="body2" color="error">
                            {meta.error}
                          </Typography>
                        ) : null}
                      </>
                    )}
                  </Field>
                  {errors.api && (
                    <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                      {errors.api}
                    </Typography>
                  )}
                  <StyledButton
                    bgColor={"#E5E5E5"}
                    sx={{ mt: 2 }}
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {loading ? (
                      <CircularProgress color="secondary" />
                    ) : (
                      "Sign up"
                    )}
                  </StyledButton>
                </Form>
              )}
            </Formik>

            <Box
              sx={{
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
                flexDirection: "row",
                gap: 1,
              }}
            >
              <Typography variant="h5">Already have an Account?</Typography>
              <Link
                component="button"
                variant="h5"
                onClick={() => {
                  navigate("/");
                }}
              >
                Sign In
              </Link>
            </Box>
          </Box>
        </CustomContainer>
      </Container>
    </Container>
  );
};

const CustomContainer = styled(Box)(({ theme }) => ({
  width: 544,
  height: "auto",
  boxShadow: `0px 0px 25px 10px #F8F8FB`,
  display: "flex",
  padding: 30,
  flexDirection: "column",
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
}));

const StyledButton = styled(Button)(({ theme, bgColor }) => ({
  backgroundColor: bgColor ? bgColor : "",
  border: "1px solid",
  borderRadius: 25,
  padding: bgColor ? "8px 8px" : "10px 10px",
  textTransform: "none",
  fontSize: "1rem",
  width: "100%",
  justifyContent: "center",
  gap: "10px",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

export default Signup;
