import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Divider,
  Avatar,
  IconButton,
} from "@mui/material";
import { blue, green, red, yellow } from "@mui/material/colors";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

import { db } from "../api/client";
import { doc, deleteDoc } from "firebase/firestore";

export default function card({details, title, category, id}) {

  async function deleteNote(noteId) {
    const userDoc = doc(db, "Notes", noteId)
    deleteDoc(userDoc)
  }

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

  return (
    <Card variant="outlined" sx={{minWidth: '220px', maxWidth: '320px'}}>
      <CardHeader
        title={title}
        subheader={category}
        avatar={
          <Avatar alt="category avatar" sx={{backgroundColor: color()}}>
          {category[0].toUpperCase()}</Avatar>}
          action={
              <IconButton aria-label="settings" onClick={() => {
                  deleteNote(id);
                }}>
              <DeleteRoundedIcon/>
            </IconButton> 
          }
      />
      <Divider />
      <CardContent>
        <Typography variant="subtitle1">
        {details}
        </Typography>
      </CardContent>
    </Card>
  );
}
