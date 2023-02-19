import React, { useEffect, useReducer, useState } from "react";

import {
  Card,
  Box,
  Typography,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Alert,
  Button,
  InputAdornment,
  IconButton,
} from "@mui/material";

import validator from "validator";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function Login() {
  const [formInput, setFormInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      email: "",
      password: "",
      confirmPassword: "",
    }
  );
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setPasswordValue] = useState(false);
  const { logIn, setLogin } = useAuth();
  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setPasswordValue(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleInput = (evt) => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setFormInput({ [name]: newValue });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setEmailError("");
    setPasswordError("");

    if (!validator.isEmail(formInput.email)) {
      return setEmailError("Enter Valid Email :(");
    }

    try {
      setError("");
      setEmailError("");
      setPasswordError("");
      setLoading(true);
      await logIn(formInput.email, formInput.password);
      setLogin(true);
      navigate("/Dashboard");
    } catch {
      setError("Cannot Sign in");
    }

    setLoading(false);

    setFormInput({
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          justifyContent: "center",
          //   m: 4,
        }}
      >
        <Card
          sx={{
            width: {
              xs: 400,
              sm: 500,
              md: 600,
              lg: 700,
              xl: 800,
            },
            mx: "auto",
            mt: 15,
          }}
        >
          <Box
            component="form"
            sx={{
              m: 4,
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
            onSubmit={handleSubmit}
          >
            <Box sx={{ mb: 3 }}>
              {" "}
              <Typography variant="h3">Login</Typography>
            </Box>
            {emailError && <Alert severity="error">{emailError}</Alert>}
            {error && <Alert severity="error">{error}</Alert>}

            {passwordError && <Alert severity="warning">{passwordError}</Alert>}
            <FormControl variant="standard">
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input
                id="email"
                name="email"
                value={formInput.email}
                onChange={handleInput}
              />
            </FormControl>
            <FormControl variant="standard">
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formInput.password}
                onChange={handleInput}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              sx={{ mt: 3 }}
            >
              Login
            </Button>
            <Box sx={{ m: "auto" }}>
              {" "}
              <Typography variant="subtitle1">
                <Link
                  to="/forgot-password"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  {" "}
                  Forgot Password?{" "}
                </Link>
              </Typography>
            </Box>
          </Box>
        </Card>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Typography variant="subtitle1" sx={{ margin: "auto" }}>
            Need an account? <Link to="/SignUp"> Signup </Link>
          </Typography>
        </Box>
      </Box>
    </>
  );
}
