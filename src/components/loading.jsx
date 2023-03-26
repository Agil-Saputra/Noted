import { IconButton, Box  } from "@mui/material"
import { useNavigate } from "react-router-dom"
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';


export default function loading() {
    const navigate = useNavigate();
  return (
    <Box>
    Sorry you dont have any notes, please create one..
    <IconButton onClick={() => {navigate("/create")}}>
    <AddCircleRoundedIcon fontSize="large"/>
    </IconButton>
    </Box>
  )
}
