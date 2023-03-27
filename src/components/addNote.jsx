import {
    Box,
    Typography,
    IconButton,
  } from "@mui/material";
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';

import { useNavigate } from "react-router-dom";

export default function addNote() {
    const navigate = useNavigate()

  return (
    <Box sx={{transform: "translateY(30px)", textAlign: 'center'}}>
    <Box>
    <IconButton onClick={() => {navigate('/create')}}>
        <AddCircleRoundedIcon fontSize="large" sx={{color: "primary.main"}}/>
    </IconButton>
        <Typography variant="subtitle1">Add Note</Typography>
    </Box>
    </Box>
  )
}
