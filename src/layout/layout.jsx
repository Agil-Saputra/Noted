import React, { useState, useContext } from "react";
// import all material UI components
import {
  Drawer,
  Box,
  Typography,
  Divider,
  Avatar,
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
import { AccountBox, Logout, Note, Search, Settings, Today} from "@mui/icons-material";
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import MenuIcon from '@mui/icons-material/Menu';
// import the router dependencies
import { useNavigate } from "react-router-dom";
import avatar from "../assets/Group 11.png";
// import all components 
import SignOutConfirmModal from "../components/modal/signOutConfirmModal";
// import context to get current user information
import { AuthContext } from "../context/authContext";

export default function layout({ children }) {
    // state for toggle the drawer menu on mobile
  const [mobileOpen, setMobileOpen] = useState(false);
  // state for toggle the modal logout confirmation
  const [open, setOpen] = useState(false);
  // get currentUser from AuthContext using UseContext for data information
  const { currentUser } = useContext(AuthContext)


  // initializing navigate function
  const navigate = useNavigate()
  // declaring width variable for reusable purpose
  const drawerWidth = 210;
    // initializing getDate function to get current date
  const date = new Date();


  // function to handle drawer navigation on mobile
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  // function to Show/hide the modal for logout confirmation
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

// declaring icon style variables for reusable components
  const icon = {
    sx : {color: 'primary.main', fontSize: {sm: '1.6rem', xs: '1.2rem'}},
  }
// add array of menu for drawer navigation
  const menus = [
    {
      title : 'Notes',
      path: "/home",
      icon: <Note {...icon}/>
    },
    {
      title : 'Kanban',
      path: "/kanban",
      icon: <Today {...icon}/>
    },
    {
      title : 'Settings',
      path: "/settings",
      icon: <Settings {...icon}/>
    },
    {
      title : 'My Account',
      path: "/myaccount",
      icon: <AccountBox {...icon}/>
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
         <Avatar src={currentUser.photoURL} sx={{m:1 }}/>
         <Typography variant="subtitle1">{currentUser.displayName}</Typography>
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
               <ListItemIcon sx={{minWidth : '30px'}}>{menu.icon}</ListItemIcon>
               <ListItemText>{menu.title}</ListItemText>
              </ListItemButton>
            </ListItem>
          ))
        }
        <ListItemButton onClick={handleOpen}>
               <ListItemIcon sx={{minWidth : '30px'}}>
                <Logout {...icon}/>
               </ListItemIcon>
               <ListItemText>Log Out</ListItemText>
        </ListItemButton>
      </List>
   <SignOutConfirmModal open={open} close={handleClose}/>
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
        <Box component="div" sx={{display: "flex", justifyContent: "space-between", alignItems: "center", minHeight: '56px', px: 3 }}>

            <Typography sx={{ 
              color: "primary.main",
              fontSize: {xs: "1.3rem", sm: '1.5rem'}
               }}>
              {greet()}!
            </Typography>

        <Stack direction="row"> 

          <IconButton onClick={() => {navigate('/create')}}>
          <AddCircleRoundedIcon {...icon}/>
          </IconButton>

          <IconButton>
            <Search {...icon}/>
          </IconButton>

          <IconButton
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            sx={{ display: { sm: 'none' }}}
          >
            <MenuIcon {...icon}/>
          </IconButton>

          </Stack>

        </Box>
        </AppBar>

        <Box component="main" sx={{ maxWidth:'100%', }}>
         <Box sx={{py: 3, px: 1}}>
         {children}
         </Box>
        </Box>
        
      </Box>
    </Box>
  );
}




{/* <Drawer
container={container}
variant="temporary"
open={mobileOpen}
onClose={handleDrawerToggle}
ModalProps={{
  keepMounted: true, // Better open performance on mobile.
}}
sx={{
  display: { xs: 'block', sm: 'none' },
  '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
}}
>
{drawer}
</Drawer> */}


