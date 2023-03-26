import React, { useState } from "react";
// import all material UI components
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
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemIcon,
  IconButton,
} from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';
// import all icons
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import HomeIcon from '@mui/icons-material/Home';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';

// import the router dependencies
import { useNavigate } from "react-router-dom";

import avatar from "../assets/Group 11.png";
import { AccountBox, Logout, Note, NotesTwoTone, Search, Settings, Today } from "@mui/icons-material";



export default function layout({ children }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);

  };
  const handleAccount = () => {
    setAnchorEl(null);
    navigate("/myaccount");
  };

  const drawerWidth = 240;

  const navigate = useNavigate()

  const icon = {
    sx : {color: 'primary.main'}
  }

  const menus = [
    {
      title : 'Notes',
      path: "/",
      icon: <Note {...icon}/>
    },
    {
      title : 'Todo',
      path: "/todo",
      icon: <Today {...icon}/>
    },
    {
      title : 'Create',
      path: "/create",
      icon: <AddCircleRoundedIcon {...icon}/>
    },
    {
      title : 'Settings',
      path: "/settings",
      icon: <Settings {...icon}/>
    },
  ]

  const date = new Date();

  function greet() {
    if (date.getHours() <= 10){
     return "Good Morning"
    }
    if (date.getHours() <= 18 ){
     return  "Good Afternoon"
    } 
    {
     return 'Good Evening'
    }
  }

  return (
    <Box sx={{ display: "flex", position: 'relative'}}>
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
            <MenuItem onClick={handleAccount}>
            <AccountBox sx={{mr: 1}}/>
            My account</MenuItem>
            <MenuItem onClick={handleClose}>
            <Logout sx={{mr: 1}}/>
            Logout</MenuItem>
          </Menu>
        </Box>
        <Divider />
        {/* create link for navigation between pages */}
        <List>

        {
          menus.map((menu, i) => (
            <ListItem disablePadding key={i}>
              <ListItemButton 
              onClick={() => navigate(menu.path)}
              >
               <ListItemIcon>{menu.icon}</ListItemIcon>
               <ListItemText>{menu.title}</ListItemText>
              </ListItemButton>
            </ListItem>
          ))
        }


          {/* <ListItem disablePadding>
            <ListItemButton>
            <ListItemText>
            <Link to="/">

              Home
            </Link>
            </ListItemText>
            </ListItemButton>
          </ListItem> */}

      </List>
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
        <Box component="div" sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
          <Toolbar sx={{ flexDirection: "column", alignItems: "start" }}>
            <Typography variant="h5" sx={{ color: "primary.main" }}>
              <span>{greet()}</span>, Agil!
            </Typography>
            <Typography variant="subtitle1">Friday, 24 March 2023</Typography>
          </Toolbar>
    
          <IconButton>
            <Search/>
          </IconButton>

        </Box>
        </AppBar>

        <Box component="main" sx={{ p: 3}}>
         <Toolbar/>
         <Box sx={{px: 1, py: 3}}>
         {children}
         </Box>
        </Box>
      </Box>
    </Box>
  );
}
