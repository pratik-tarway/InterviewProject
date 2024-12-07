import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        width: "100%",
        padding: "16px",
        backgroundColor: "#fff", // White background
        textAlign: "center",
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      <Typography
        variant="body2"
        sx={{
          color: "#333", // Dark text color for visibility against white background
          fontSize: "14px",
          fontWeight: 300, // Light weight for elegance
        }}
      >
        © 2024 The Shop. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
