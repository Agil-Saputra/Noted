import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Divider,
  Avatar,
  IconButton,
  Box
} from "@mui/material";
import { blue, green, red, yellow } from "@mui/material/colors";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

import EditModal from "../modal/editModal";
import DeleteModal from "../modal/deleteModal";
import { Troubleshoot } from "@mui/icons-material";


export default function card({details, title, category, id}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openDelete, setOpenDelete] = useState(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);

  const [hovered, setHovered] = useState(false)

  function color() {
    switch(category){
      case('Work'): {
        return yellow[600]
      }
      case('Money'): {
        return red[700]
      }
      case('Others'): {
        return green[600]
      }
      default :{
       return blue[400]
      }
    }
  }

  const icon = {
    sx : {fontSize: {sm: '1.6rem', xs: '1.2rem'}},
  }

  console.log(hovered);


  return (
    <>
    <EditModal open={open} close={handleClose} id={id} title={title} details={details} category={category}/>
    <DeleteModal open={openDelete} close={handleCloseDelete} id={id}/>
    <Card onMouseOver={() => setHovered(true)} onMouseOut={() => setHovered(false)} variant="outlined" sx={{
      backgroundColor: color(),
      overflowWrap : 'break-word',
      transition: 'all 0.1s ease-in-out',

      }}>
      <CardHeader
        sx={{
          overflowWrap : 'break-word',
        }}
        title={
          <Typography sx={{
            fontWeight: '600', 
            maxWidth : '10ch',
            fontSize : {xs:'14px', sm: '1rem'}
            }}>{title}</Typography>
        }
        subheader={
          <Typography sx={{
            fontSize : {xs:'14px', sm: '1rem'},
            fontFamily:'poppins',
          }}>{category}</Typography>
        }
        avatar={
          <Avatar alt="category avatar" sx={{backgroundColor: color()}}>
          {category[0].toUpperCase()}</Avatar>}
          action={
              <Box display={hovered ? 'block' : 'none'}>
            <IconButton aria-label="edit" onClick={handleOpen}>
              <ModeEditIcon {...icon}/>
            </IconButton>
                <IconButton aria-label="settings" onClick={handleOpenDelete}>
              <DeleteRoundedIcon {...icon}/>
            </IconButton> 
              </Box>
          }
      />
      <Divider />
      <CardContent sx={{maxWidth : '40ch'}}>
        <Typography sx={{
          fontSize : {xs:'14px', sm: '1rem'}
        }}>
        {details}
        </Typography>
      </CardContent>
    </Card>
    </>
  );
}

