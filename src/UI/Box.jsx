import { Box } from "@mui/material";
import React from "react";

export default function UtilityBox({ children }) {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
          flexDirection: "column",
          //   m: 4,
        }}
      >
        {children}
      </Box>
    </>
  );
}
