import { Alert, Box, Button, Card } from "@mui/material";

import React from "react";
import { Link } from "react-router-dom";

export default function Error() {
  return (
    <Box
      sx={{
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
        //   m: 4,
      }}
    >
      <Card sx={{ minWidth: 500, mt: 15 }}>
        <Box
          sx={{
            margin: "auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <Alert severity="warning" sx={{ m: 3 }}>
            Looks like you have to Sign Up/ Log In in order to access Dashboard/
            Data Page
          </Alert>
          <Button variant="outlined" sx={{ m: 3 }}>
            <Link
              to="/SignUp"
              style={{ textDecoration: "none", textDecorationColor: "black" }}
            >
              Go Back to Sign Up
            </Link>
          </Button>
        </Box>
      </Card>
    </Box>
  );
}
