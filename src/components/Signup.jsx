import React, { useReducer, useState } from "react";

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
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import UtilityCard from "../UI/Card";
import UtilityBox from "../UI/Box";

export default function Signup() {
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
  const { signUp } = useAuth();
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
    if (formInput.password !== formInput.confirmPassword) {
      return setPasswordError("Passwords do not match");
    }

    try {
      setEmailError("");
      setPasswordError("");
      setLoading(true);
      await signUp(formInput.email, formInput.password);
      navigate("/login");
    } catch {
      setError("Cannot create an account");
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
      <UtilityBox>
        <UtilityCard>
          <Box
            component="form"
            sx={{
              m: 4,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignContent: "center",
              gap: 4,
            }}
            onSubmit={handleSubmit}
          >
            <Box sx={{ mb: 3 }}>
              {" "}
              <Typography variant="h3">Signup Form</Typography>
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
            <FormControl variant="standard">
              <InputLabel htmlFor="confirmPassword">
                Confirm Password
              </InputLabel>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                value={formInput.confirmPassword}
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
              sx={{ mt: 3 }}
              disabled={loading}
            >
              SignUp
            </Button>
            <Typography variant="subtitle1" sx={{ margin: "auto" }}>
              Already have an account? <Link to="/login"> Login </Link>
            </Typography>
          </Box>
        </UtilityCard>
      </UtilityBox>
    </>
  );
}
