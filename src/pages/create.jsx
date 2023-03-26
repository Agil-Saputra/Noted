import React, { useState } from "react";
import { useForm } from 'react-hook-form';
import { 
  TextField, 
  Typography, 
  Button, 
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
 } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";

import { addDoc, collection } from "firebase/firestore";
import { db } from "../api/client";

import { useNavigate } from "react-router-dom";

export default function create() {
  const [title, setTitle] = useState('')
  const [details, setDetails] = useState('')
  const [category, setCategory] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const navigate = useNavigate()
  const colRef = collection(db, "Notes");

  async function createUser ( data)  {
    navigate("/")
    // Add a new document with a generated id.
    await addDoc(colRef, {
      title: data.title,
      details: data.details,
      category : data.category,
    });
  };



  return (
    <Box component="form" onSubmit={handleSubmit((data) =>{
      createUser(data);
      reset()
       console.log(data)})}>
      <TextField
        id="outlined-basic"
        label="Add Your Title"
        variant="outlined"
        fullWidth
        sx={{ mb: 3 }}
        {...register('title', { required: true })}
        error={errors.details}
      />
      <TextField
        id="outlined-basic"
        label="Write Your Note"
        variant="outlined"
        fullWidth
        multiline
        rows={5}
        sx={{ mb: 3 }}
        {...register('details', { required: true })}
        error={errors.details}
      />

        <FormControl fullWidth sx={{mb: 3}}>
          <InputLabel id="demo-simple-select-label">Select Your Note Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Select Your Note Category"
            {...register('category', { required: true })}
            error={errors.category}
          >
          {
            ['Work', 'Money', 'Todo', 'Others'].map((item, i) => (
            <MenuItem value={item} key={i}>{item}</MenuItem>
            ))
          }
          </Select>
        </FormControl>

      <Button type="submit">
        <AddBoxIcon />
        <Typography>Add Note</Typography>
      </Button>
      
      
    </Box>
  );
}
