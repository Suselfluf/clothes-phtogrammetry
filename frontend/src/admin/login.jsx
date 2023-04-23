import React, { useState } from "react";
import tokenInstance from "../../api/tokens/axios";

//MaterialUI
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Avatar } from "@mui/material";
import {
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Typography,
  Container,
} from "@mui/material";
import Auth from "../components/Auth/Auth";
import ResponsiveAppBar from "../components/AppBar";


import { VRButton, ARButton, XR, Controllers, Hands } from '@react-three/xr'
import { Canvas } from '@react-three/fiber'
import { XRButton } from '@react-three/xr'
import { WebGLRenderer } from 'three'



export default function SignIn() {
  const navigate = useNavigate();
  const initialFormData = Object.freeze({
    email: "",
    password: "",
  });

  useEffect(() => {
    return () => {
      // if (localStorage.getItem("refresh_token")) {         // Need to be fixed to log in automatically
      //   try {
      //     tokenInstance
      //       .post(`admin-auth/token/verify/`, {
      //         token: localStorage.getItem("refresh_token"),
      //       })
      //       .then((res) => {
      //         console.log(res);
      //         if (res.status === 200) {
      //           console.log("ss");
      //           localStorage.setItem("is_auth", "True");
      //           // Auth.login();
      //           // // Auth.trylogin(res);
      //           // if (Auth.isAuthenticated()) {
      //           //   navigate("/welcome");
      //           // }
      //         }
      //       });
      //   } catch (error) {
      //     console.error(error);
      //   }
      // }
    };
  }, []);

  const [formData, updateFormData] = useState(initialFormData);

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    tokenInstance
      .post(`admin-auth/token/`, {
        email: formData.email,
        password: formData.password,
      })
      .then((res) => {
        localStorage.setItem("access_token", res.data.access);
        localStorage.setItem("refresh_token", res.data.refresh);
        tokenInstance.defaults.headers["Authorization"] =
          "JWT " + localStorage.getItem("access_token");
        Auth.trylogin(res);
        if (Auth.isAuthenticated()) {
          navigate("/welcome");
        }
      });
  };

  return (
    <>
      {/* <ResponsiveAppBar></ResponsiveAppBar> */}
      
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div>
          <Avatar></Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </>
  );
}



