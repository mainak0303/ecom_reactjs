import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CircularProgress from "@mui/material/CircularProgress";
import { Link, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false); 
  const location = useLocation();
  const token = localStorage.getItem("token");

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logout = () => {
    setIsLoading(true); // Start loader
    setTimeout(() => {
      localStorage.removeItem("token");
      setIsLoading(false); // Stop loader
      window.location.href = "/";
    }, 2000); // Simulating a logout delay
    toast.success("User logout successfully")
  };

  const pages = token
    ? [
        <Link to="profile" style={{ color: "inherit", textDecoration: "none" }}>Profile</Link>,
        <Link to="product_list" style={{ color: "inherit", textDecoration: "none" }}>Product List</Link>,
      ]
    : [];

  const settings = token
    ? [
        <Link to="/profile" style={{ color: "inherit", textDecoration: "none" }}>Profile</Link>,
        <Link to="/create_product" style={{ color: "inherit", textDecoration: "none" }}>Create</Link>,
        <Link to="product_list" style={{ color: "inherit", textDecoration: "none" }}>List</Link>,
        <span
          onClick={logout}
          style={{
            color: "inherit",
            textDecoration: "none",
            cursor: "pointer",
          }}
        >
          Logout
        </span>,
      ]
    : [];

  return (
    <>
      {isLoading && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1300,
          }}
        >
          <CircularProgress size={60} color="secondary" />
        </Box>
      )}
      <AppBar
        position="static"
        sx={{
          bgcolor: "#f3e5f5",
          boxShadow: 4,
          mt: 1,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <ShoppingCartIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1, color: "#6a1b9a" }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: "bold",
                letterSpacing: ".3rem",
                color: "#6a1b9a",
                textDecoration: "none",
                fontSize: { xs: "1rem", sm: "1.5rem" },
              }}
            >
              エ-KaRt
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                sx={{ color: "#6a1b9a" }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: "block", md: "none" } }}
              >
                {pages.map((page, index) => (
                  <MenuItem key={index} onClick={handleCloseNavMenu}>
                    <Typography sx={{ textAlign: "center", color: "#6a1b9a" }}>{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <ShoppingCartIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1, color: "#6a1b9a" }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: "bold",
                letterSpacing: ".3rem",
                color: "#6a1b9a",
                textDecoration: "none",
                fontSize: { xs: "1.2rem", sm: "1.8rem" },
              }}
            >
              エ-KaRt
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page, index) => (
                <Button
                  key={index}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: "#6a1b9a",
                    display: "block",
                    textTransform: "capitalize",
                    fontSize: "1rem",
                    "&:hover": {
                      color: "#4a148c",
                    },
                  }}
                >
                  {page}
                </Button>
              ))}
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              {token && (
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
                  </IconButton>
                </Tooltip>
              )}
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting, index) => (
                  <MenuItem key={index} onClick={handleCloseUserMenu}>
                    <Typography sx={{ textAlign: "center", color: "#6a1b9a" }}>{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}

export default ResponsiveAppBar;
