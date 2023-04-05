import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from '@firebase/auth'
import { auth} from '../config/client';
import { AuthContext } from "../context/authContext";

import { Box, TextField, Button, Container, Typography, IconButton, InputAdornment, Link} from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';



export default function SignUp() {
  const [showPwd, setShowPwd] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();
  const { dispatch } = useContext(AuthContext)
  const navigate = useNavigate()


  function handleShowPwd() {
    setShowPwd(!showPwd)
  }
  async function signUp(email, password) {
    await createUserWithEmailAndPassword(auth, email, password)
   .then((userCredential) => {
     const user = userCredential.user;
     dispatch({type: "LOGIN", payload: user})
     navigate('/home')
   })
   .catch((err) => {
     console.log(err.message);
     // ..
   });
}



  return (
  <Container
  sx={{
      display: 'grid',
      placeItems : 'center',
      // mt: '10rem'
      minHeight: '100vh'
    }}>
      <Box 
      component="form" 
      sx={{
      display: 'grid',
      placeItems : 'center',
      width: {xs: '95%', sm:'25rem'},
      // bgcolor: 'primary.main',
      // padding: '4rem',
      // color: '#fff'
     
    }} 
      onSubmit={handleSubmit((data) => {
      signUp(data.email, data.password,)
      reset()
      })}
      >
  
      <Box sx={{
        mb: '2rem',
        placeSelf: 'start'
      }}>
      <Typography sx={{
        fontSize : {xs: '1.6rem', sm: '2rem' }
      }}>Welcome!</Typography>
      <Typography variant='subtitle2'>Please Register to get unlimited access.</Typography>
      </Box>


      {/* <TextField
        label="Your Username"
        variant="outlined"
        fullWidth
        sx={{ 
          mb: 3,
          }}
        {...register("username", { required : true, }
        )}
        error={!!errors.username}
        helperText={errors.username && errors.username?.message}
        /> */}

      <TextField
        label="Your Email"
        variant="outlined"
        fullWidth
        sx={{ 
          mb: 3,
          }}
        {...register("email", { 
        required : "Please, add your Email!", 
        pattern: {
            value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
            message: "Whoops, make sure it's an email"
          }}
        )}
        error={!!errors.email}
        helperText={errors.email && errors.email.message}
        />

      <TextField
        label="Your Password"
        variant="outlined"
        fullWidth
        sx={{ mb: 3 }}
        {...register('password', { 
        required : "Add Your Password",
        pattern: {
          value : /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[#?!@$ %^&*-]).{8,}$/g,
          message : "Minimum 8 Characters with Uppercase and Special character"
        },
        
         })}
        type={showPwd ? "text" : "password"}
        error={!!errors.password}
        helperText={errors.password && errors.password.message}
        InputProps={{endAdornment: (
        <InputAdornment position="end">
         <IconButton onClick={handleShowPwd}>
         {
          showPwd ? <VisibilityIcon/> : <VisibilityOffIcon/>
         }
         </IconButton>
        </InputAdornment>
        )}}
      />

<Button 
type='submit'
variant='contained'
fullWidth
>Submit</Button>
<Typography sx={{
  my: 2,
  fontSize : {xs: '12px', sm: '15px'}
}}>
Already have an account? <Link href='/' underline='always'>Login here</Link>
</Typography>
    </Box>
  </Container>
  )
}
