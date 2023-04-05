import React from "react";
import Layout from "../layout/layout"
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
  Icon
 } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";

import { addDoc, collection } from "firebase/firestore";
import { db } from "../config/client";
import { categories } from "../api/categories";

import { useNavigate } from "react-router-dom";

export default function create() {

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const navigate = useNavigate()
  const colRef = collection(db, "Notes");

  async function createUser ( data)  {
    navigate("/home")
    // Add a new document with a generated id.
    await addDoc(colRef, {
      title: data.title,
      details: data.details,
      category : data.category,
    });
  };

  return (
    <Layout>
    <Box
    component="form" 
    onSubmit={handleSubmit((data) => {
      createUser(data);
      reset()
     })}
     sx={{
      width: {sm: '70%', xs: '100%'}
     }}
     >
      <TextField
        id="outlined-basic"
        label="Add Your Title"
        variant="outlined"
        fullWidth
        sx={{ mb: 3 }}
        {...register('title', { required: true })}
        error={errors.title}
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
            sx={{
              '& .css-qiwgdb.css-qiwgdb.css-qiwgdb': {
                display: 'flex',
                gap : 2,
              }
            }}
          >
          {
            categories.map((item, i) => (
            <MenuItem value={item.title} key={i} sx={{
              display: 'flex',
              alignItems: 'center',
              gap : 2
            }}>
            <Icon>{item.icon}</Icon>
            <Typography>{item.title}</Typography>
            </MenuItem>
            ))
          }
          </Select>
        </FormControl>

      <Button type="submit">
        <AddBoxIcon />
        <Typography>Add Note</Typography>
      </Button>
      
      
    </Box>
    </Layout>
  );
}
