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
import { AccountBox, ArrowDropDownTwoTone, Logout, Note, Search, Settings, Today} from "@mui/icons-material";
import MenuIcon from '@mui/icons-material/Menu';
// import the router dependencies
import { useNavigate } from "react-router-dom";
import avatar from "../assets/Group 11.png";

export default function layout({ children }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

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


  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerWidth = 220;

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

  const drawer = (
    <>
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
              color: 'primary.main',
            }}
          >
          <ArrowDropDownTwoTone fontSize="large"/>
            {/* <ArrowDropDownRoundedIcon fontSize="large"/> */}
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

      </List>
    </>
  )

  return (
    <Box sx={{ display: "flex", position: 'relative'}}>
      {/* make drawer for links */}
      <Drawer
        anchor="left"
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, 
        }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          display: { xs: 'block', sm: 'none' },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        
      >
      {drawer}
      </Drawer>

      <Drawer
      anchor="left"
      variant="permanent"
      sx={{
        width: drawerWidth,
        display: { xs: 'none', sm: 'block' },
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
      }}
      >
      {drawer}
      </Drawer>
      {/* create top appbar  */}
      <Box sx={{ display: "flex", width:'100%', height:'100%'}}>
        <CssBaseline />
        <AppBar
          component="nav"
          sx={{
            width: {
              xs: '100%',
              sm: `calc(100% - ${drawerWidth}px)`,
            },
            p: 1.17,
            bgcolor: "#fff",
            boxShadow: 'none',
            borderBottom: 'solid rgba(0, 0, 0, 0.12)',
            borderBottomWidth: 'thin',
            position:'absolute'
          }}
        >
        <Toolbar component="div" sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>

            <Typography variant="h5" sx={{ color: "primary.main" }}>
              <span>{greet()}</span>, Agil!
            </Typography>

        <Box display='flex' alignItems='center' >
          <IconButton>
            <Search/>
          </IconButton>

          <IconButton
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            sx={{ display: { sm: 'none' }, color: 'primary.main'}}
          >
            <MenuIcon/>
          </IconButton>

          </Box>

        </Toolbar>
        </AppBar>

        <Box component="main" sx={{ p: 3, width:'100%'}}>
         <Toolbar/>
         <Box sx={{px: 1, py: 3}}>
         {children}
         </Box>
        </Box>
      </Box>
    </Box>
  );
}




// <Drawer
// container={container}
// variant="temporary"
// open={mobileOpen}
// onClose={handleDrawerToggle}
// ModalProps={{
//   keepMounted: true, // Better open performance on mobile.
// }}
// sx={{
//   display: { xs: 'block', sm: 'none' },
//   '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
// }}
// >
// {drawer}
// </Drawer>


