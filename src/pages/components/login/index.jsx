"use client";
//packgae imports
import React, { useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Avatar,
  Button,
  TextField,
  Typography,
  CssBaseline,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Link from "next/link";
import loginImage from "../../../../public/login.jpg";
import { useEffect } from "react";
import RMImage from "../recipe-manager-image/RMImage";
import { useForm } from "react-hook-form";
import { notifyError, notifySuccess } from "../../../utils/toast";
import { setCookie } from "cookies-next";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import axios from "axios";

axios.defaults.withCredentials = true;

// Axios Interceptor to add X-XSRF-TOKEN to each request header
axios.interceptors.request.use(
  (config) => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("XSRF-TOKEN="));
    if (token) {
      config.headers["X-XSRF-TOKEN"] = decodeURIComponent(token.split("=")[1]);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const Login = () => {
  const [formData, setFormData] = useState({});
  const router = useRouter();

  const getCsrfToken = async () => {
    try {
      const response = await axios.get(
        "https://api.circlescrm.net/sanctum/csrf-cookie",
        { withCredentials: true }
      );
      console.log("CSRF token fetched successfully", response);
      return response;
    } catch (error) {
      console.error("Error fetching CSRF token:", error);
    }
  };

  // Fetch CSRF token on component mount
  useEffect(() => {
    getCsrfToken().then(() => {
      console.log("CSRF token has been fetched and should be set now.");
    });
  }, []);

  const schema = yup.object().shape({
    email: yup
      .string()
      .label("Email")
      .required("Email is required")
      .email("Invalid email address")
      .matches(/^\S+@\S+\.\S{2,}$/i, "Invalid Email Format"),
    password: yup.string().label("Password").required("Password is required"),
  });

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
    getValues,
  } = useForm({ mode: "onChange", resolver: yupResolver(schema) });

  const onSubmit = async (data, e) => {
    e.preventDefault();
    if (e.key === "Enter") {
      setFormData(formData);
    }

    const data2 = {
      email: data?.email,
      password: data?.password,
    };

    try {
      // Proceed with login
      const response = await axios.post(
        "https://api.circlescrm.net/api/login",
        { email: data2.email, password: data2.password },
        { withCredentials: true }
      );
      if (response?.data?.user) {
        notifySuccess("Successfully Logged In");
        setCookie("userInfo", JSON.stringify(response.data.user));
        router.push("/");
      } else if (response?.data?.errors) {
        notifyError(response.data.message);
      }
    } catch (error) {
      notifyError(error.toString());
      console.error("Login error:", error);
    }
  };

  return (
    <Box>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid item xs={false} sm={6} md={7}>
          <RMImage src={loginImage}></RMImage>
        </Grid>
        <Grid item xs={12} sm={6} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form
              onSubmit={handleSubmit(onSubmit)}
              style={{
                width: "90%",
              }}
            >
              <Box sx={{ mt: 1 }}>
                <TextField
                  {...register("email")}
                  name="email"
                  id="email"
                  type="email"
                  margin="normal"
                  fullWidth
                  label="Email Address"
                  autoComplete="email"
                  autoFocus
                />
                {errors.email && (
                  <Typography color={"red"} fontSize={"13px"}>
                    Email is required
                  </Typography>
                )}
                <TextField
                  {...register("password")}
                  name="password"
                  id="password"
                  type="password"
                  margin="normal"
                  fullWidth
                  label="Password"
                  autoComplete="current-password"
                  onChangeCapture={(e) => {
                    const trimmedValue = e.currentTarget.value
                      ?.trimStart()
                      ?.trimEnd()
                      ?.replace(/ +(?= )/g, "");

                    if (trimmedValue !== undefined) {
                      setValue("password", trimmedValue);
                    }
                  }}
                />
                {errors.password && (
                  <Typography color={"red"} fontSize={"13px"}>
                    Password is required
                  </Typography>
                )}

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onKeyDown={(e) => onSubmit(getValues, e)}
                  disabled={Object.keys(errors).length > 0 ? true : false}
                >
                  Sign In
                </Button>
                <Grid container>
                  {/* <Grid item xs>
                    <Link href="/forgot-password" style={{ color: "blue" }}>
                      Forgot password?
                    </Link>
                  </Grid> */}
                  <Grid item>
                    <Link
                      href="/signup"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      {"Don't have an account?"}{" "}
                      <span style={{ color: "blue" }}>{"Sign Up"}</span>
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </form>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;
