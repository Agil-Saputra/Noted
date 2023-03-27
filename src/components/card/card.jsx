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


import EditModal from "./editModal";
import DeleteModal from "./deleteModal";





export default function card({details, title, category, id}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openDelete, setOpenDelete] = useState(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);

  function color() {
    if (category == "Work"){
     return yellow[700]
    }
    if (category == "Money" ){
     return green[700] 
    } 
    if (category == "Todo" ){
     return  red[700]
    } 
    {
     return  blue[700]
    }
  }

  const icon = {
    sx : {color: red[400]}
  }

  return (
    <>
    <EditModal open={open} close={handleClose} id={id} title={title} details={details} category={category}/>
    <DeleteModal open={openDelete} close={handleCloseDelete} id={id}/>
    <Card variant="outlined" >
      <CardHeader 
        title={
          <Typography variant="subtitle1" sx={{fontWeight: '600'}}>{title}</Typography>
        }
        subheader={
          <Typography variant="subtitel2">{category}</Typography>
        }
        avatar={
          <Avatar alt="category avatar" sx={{backgroundColor: color()}}>
          {category[0].toUpperCase()}</Avatar>}
          action={
              <Box>
            <IconButton aria-label="edit" onClick={handleOpen}>
              <ModeEditIcon />
            </IconButton>
                <IconButton aria-label="settings" onClick={handleOpenDelete}>
              <DeleteRoundedIcon {...icon}/>
            </IconButton> 
              </Box>
          }
      />
      <Divider />
      <CardContent>
        <Typography variant="subtitle1">
        {details}
        </Typography>
      </CardContent>
    </Card>
    </>
  );
}

