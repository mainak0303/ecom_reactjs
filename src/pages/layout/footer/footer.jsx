import React from "react";
import { AppBar, Toolbar, Typography, Container, Box } from "@mui/material";
import { Facebook, Twitter, Instagram } from "@mui/icons-material";

const Footer = () => {
  return (
    <AppBar position="static" color="primary" sx={{ mt: 4, py: 2 }}>
      <Container maxWidth="lg">
        <Toolbar sx={{ flexDirection: "column", alignItems: "center" }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
          エ-KaRt
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Facebook sx={{ cursor: "pointer" }} />
            <Twitter sx={{ cursor: "pointer" }} />
            <Instagram sx={{ cursor: "pointer" }} />
          </Box>
          <Typography variant="body2" sx={{ mt: 1 }}>
            &copy; {new Date().getFullYear()} エ-KaRt. All rights reserved.
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Footer;
