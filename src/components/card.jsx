import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Divider,
  Avatar,
  IconButton
} from "@mui/material";
import { yellow } from "@mui/material/colors";
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function card() {
  

  return (
    <Card variant="outlined" width={320}>
      <CardHeader
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
        avatar={
          <Avatar alt="category avatar" sx={{
            backgroundColor: yellow[700]
          }}>W</Avatar>}
          action={
            <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
          }
      />
      <Divider />
      <CardContent>
        <Typography variant="subtitle1">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia quia
          cupiditate corrupti itaque sapiente esse animi non fugit sit earum
          ipsam, dolor architecto odio expedita atque voluptas quaerat velit
          aspernatur.˝
        </Typography>
      </CardContent>
    </Card>
  );
}
