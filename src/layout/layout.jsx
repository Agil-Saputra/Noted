import React, { useState } from "react";
import {
  Drawer,
  Box,
  Typography,
  Divider,
  Avatar,
  Button,
  MenuItem,
  Menu,
  AppBar,
  Toolbar,
} from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import HomeIcon from '@mui/icons-material/Home';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';

import { Link } from "react-router-dom";

import avatar from "../assets/Group 11.png";

export default function layout({ children }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);

  };

  const drawerWidth = 240;

  return (
    <Box sx={{ display: "flex" }}>
      {/* make drawer for links */}
      <Drawer
        anchor="left"
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        {/* avatar section and menus  */}
        <Box sx={{ display: "flex", alignItems: "center", }}>
          <Avatar src={avatar} sx={{m:1 }}/>
          <Typography variant="h6">Agil deltons</Typography>
          <Button
            id="arrow-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            sx={{
              p: 0,
              px: 0,
              borderRadius: "100px",
              minWidth: "30px",
              color: "prima",
            }}
          >
            <ArrowDropDownRoundedIcon fontSize="large"/>
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </Box>
        <Divider />
       
      </Drawer>
      {/* create top appbar  */}
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          component="nav"
          sx={{
            width: `calc(100% - ${drawerWidth}px)`,
            p: 1.17,
            bgcolor: "#fff",
          }}
        >
          <Toolbar sx={{ flexDirection: "column", alignItems: "start" }}>
            <Typography variant="h5" sx={{ color: "primary.main" }}>
              Good Morning, Agil!
            </Typography>
            <Typography variant="subtitle1">Friday, 24 March 2023</Typography>
          </Toolbar>
        </AppBar>
        <Box component="main" sx={{ p: 3 }}>
         <Toolbar/>
         <Box sx={{px: 1, py: 3}}>
         {children}
         </Box>
        </Box>
      </Box>
    </Box>
  );
}
