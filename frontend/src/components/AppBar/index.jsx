import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import Auth from "../Auth/Auth";
import { useEffect } from "react";
import { useState } from "react";

function ResponsiveAppBar() {
  const pages = [
    <Link to="/client">Client</Link>,
    <Link to="/admin">Admin</Link>,
    <Link to="/logout">Log out</Link>,
  ];

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <>
      <AppBar position="static">
        <Container>
          <Toolbar disableGutters>
            <Typography
              variant="h5"
              // noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                // display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "Segoe UI",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Croki
            </Typography>
            {pages.map((page, key) => (
              <MenuItem key={key} onClick={handleCloseNavMenu}>
                <Typography textAlign="center">{page}</Typography>
              </MenuItem>
            ))}
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
export default ResponsiveAppBar;
