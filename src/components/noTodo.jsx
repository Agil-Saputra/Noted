
import { IconButton, Box, Typography  } from "@mui/material"
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import TodoImg from "../assets/todo.svg"

export default function loading() {

  return (
    <Box sx={{display: 'grid', placeItems: 'center', width: '100%', textAlign: 'center'}}>
    <img src={TodoImg} alt="Note Illustration" style={{objectFit: 'contain', width: '100%', height:'122px'}}/>
    <Typography variant="h6">Sorry you dont have any Todo's,<br />Create your first todo..</Typography>
    <IconButton>
    <AddCircleRoundedIcon fontSize="large" sx={{color: "primary.main"}}/>
    </IconButton>


    </Box>
  )
}
