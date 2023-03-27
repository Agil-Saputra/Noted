import { IconButton, Box, Typography  } from "@mui/material"
import { useNavigate } from "react-router-dom"
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import NoteImg from "../assets/twemoji_spiral-notepad.svg"

export default function loading() {
    const navigate = useNavigate();
  return (
    <Box sx={{display: 'grid', placeItems: 'center', width: '100%', textAlign: 'center'}}>
    <img src={NoteImg} alt="Note Illustration" style={{objectFit: 'contain', width: '100%', height:'122px'}}/>
    <Typography variant="h6">Sorry you dont have any notes,<br />Create your first note..</Typography>
    <IconButton onClick={() => {navigate("/create")}}>
    <AddCircleRoundedIcon fontSize="large" sx={{color: "primary.main"}}/>
    </IconButton>


    </Box>
  )
}
