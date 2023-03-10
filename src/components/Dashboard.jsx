import React, { useState } from "react";
import { Alert, Box, Button, Card, Typography } from "@mui/material";

import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import UtilityCard from "../UI/Card";
import UtilityBox from "../UI/Box";

export default function Dashboard() {
  const { currentUser, logOut, setLogin } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleLogout() {
    setError("");

    try {
      await logOut();
      setLogin(false);
      navigate("/login");
    } catch {
      setError("Cannot Logout");
    }
  }

  return (
    <>
      <UtilityBox>
        {" "}
        <UtilityCard>
          <Box
            sx={{
              margin: "auto",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignContent: "center",
              gap: 4,
            }}
          >
            {" "}
            <Typography variant="h3" m="auto">
              {" "}
              Profile
            </Typography>
            <Typography variant="body1" m="auto">
              {" "}
              Email: {currentUser && currentUser.email}
            </Typography>
            <Button variant="outlined" sx={{ mx: 3 }}>
              <Link
                to="/update-profile"
                style={{ textDecoration: "none", textDecorationColor: "black" }}
              >
                Update Profile
              </Link>
            </Button>
            <Button
              variant="outlined"
              color="error"
              sx={{ m: 3 }}
              onClick={handleLogout}
            >
              Log Out
            </Button>
            {error && <Alert severity="error">{error}</Alert>}
          </Box>
        </UtilityCard>
      </UtilityBox>
    </>
  );
}
