import { Box, Card } from "@mui/material";
import React from "react";

export default function UtilityCard({ children }) {
  return (
    <>
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
        {children}
      </Card>
    </>
  );
}
