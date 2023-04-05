import React, { useState, useContext } from "react";
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
  Stack,
} from "@mui/material";
// import all icons
import { AccountBox, ArrowDropDownTwoTone, Logout, Note, Search, Settings, Today} from "@mui/icons-material";
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import MenuIcon from '@mui/icons-material/Menu';
// import the router dependencies
import { useNavigate } from "react-router-dom";
import avatar from "../assets/Group 11.png";
// import context from AuthContext
import { AuthContext } from "../context/authContext";
// import auth from firebase config 
import { auth } from "../config/client.js"
// import SignOut method from firebase 
import { signOut } from 'firebase/auth'

export default function layout({ children }) {
  // state for toggle account menu modal 
  const [anchorEl, setAnchorEl] = useState(null);
    // state for toggle the drawer menu on mobile
  const [mobileOpen, setMobileOpen] = useState(false);
  // get dispatch function from AuthContext using UseContext for send Payload to change reducer state
  // get current user from AuthContext for get user data and display it ti user interface
  const { dispatch, currentUser } =  useContext(AuthContext)


  // initializing navigate function
  const navigate = useNavigate()
  // declaring width variable for reusable purpose
  const drawerWidth = 220;
    // initializing getDate function to get current date
  const date = new Date();

// function for open account menu modal
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  // function for close account menu modal
  const handleClose = () => {
    setAnchorEl(null);
  };
 // function to navigate to myAccount page
  const handleAccount = () => {
    navigate("/myaccount");
  };
  // function to handle drawer navigation on mobile
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  // create function to logout user from page
  const logOut = () => {
    signOut(auth).then(() => {
      dispatch({type: "LOGOUT", payload : null})
      navigate('/')
    }).catch(err => {
      console.log(err)
    })
  }

// declaring icon style variables for reusable components
  const icon = {
    sx : {color: 'primary.main'}
  }
// add array of menu for drawer navigation
  const menus = [
    {
      title : 'Notes',
      path: "/home",
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

  // create a function that will return a value according to 
  // the time the user used the application
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

  // declaring drawer components for it can be used 
  // without to hardcode manually on mobile view
  const drawer = (
    <>
              {/* avatar section and menus  */}
              <Box sx={{ display: "flex", alignItems: "center", p: 0 }}>
          <Avatar src={avatar} sx={{m:1 }}/>
          <Typography variant="subtitle1">Agil deltons</Typography>
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
            <MenuItem onClick={handleAccount} >
            <ListItemIcon>
            <AccountBox {...icon}/>
            </ListItemIcon>
            <ListItemText>
            My account
            </ListItemText>
            </MenuItem>
            <MenuItem onClick={logOut}>
            <ListItemIcon>
            <Logout  {...icon}/>
            </ListItemIcon>
            <ListItemText>
             Logout
            </ListItemText>
            </MenuItem>
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
      <Box sx={{ width:'100%', height:'100%'}}>

        <AppBar
          component="nav"
          sx={{
            width: '100%',
            bgcolor: "#fff",
            boxShadow: 'none',
            borderBottom: 'solid rgba(0, 0, 0, 0.12)',
            borderBottomWidth: 'thin',
          }}
          position="sticky"
        >
        <Toolbar component="div" sx={{display: "flex", justifyContent: "space-between", alignItems: "center" }}>

            <Typography sx={{ 
              color: "primary.main",
              fontSize: {xs: "13px", sm: '1.5rem'}
               }}>
              <span>{greet()}</span>, Agil!
            </Typography>

        <Stack direction="row" spacing={2}> 

          <IconButton onClick={() => {navigate('/create')}}>
          <AddCircleRoundedIcon sx={{color: "primary.main"}}/>
          </IconButton>

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

          </Stack>

        </Toolbar>
        </AppBar>

        <Box component="main" sx={{ width:'100%', height: '100%'}}>
         <Box sx={{py: 3, px: 1}}>
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


