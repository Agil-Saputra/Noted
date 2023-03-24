import React, { useState } from "react";
import { TextField, Typography, Button, Box } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";


export default function create() {
  const [error, setError] = useState(false)
  return (
      <Box component="form" >
      <TextField
        id="outlined-basic"
        label="Add Your Title"
        variant="outlined"
        fullWidth
        sx={{mb: 5, mt: 3}}
      />
      <TextField
        id="outlined-basic"
        label="Write Your Note"
        variant="outlined"
        fullWidth
        multiline
        rows={5}
        sx={{mb: 3}}
      />
      <Button type="submit">
        <AddBoxIcon />
        <Typography>Add Note</Typography>
      </Button>
      </Box>
  );
}
