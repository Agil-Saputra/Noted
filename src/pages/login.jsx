import React, { useContext, useState } from 'react'
import { Box, TextField, Button, Container, Typography, Divider, IconButton, InputAdornment, Icon, Link } from '@mui/material'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword , signInWithPopup } from '@firebase/auth'
import { AuthContext } from "../context/authContext";
import { auth, provider } from '../config/client';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Google from '../assets/logos_google-icon.svg';


export default function login() {
  const [showPwd, setShowPwd] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();
  const { dispatch } = useContext(AuthContext)
  const navigate = useNavigate()

  async function signIn(email, password) {
      await  signInWithEmailAndPassword (auth, email, password)
     .then((userCredential) => {
       const user = userCredential.user;
       navigate('/home')
       dispatch({type: "LOGIN", payload:user})
     })
     .catch((err) => {
      //  setError(true)
      console.log(err);
       // ..
     });
  }


  async function signInWithGoogle() {
     await signInWithPopup(auth, provider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
        dispatch({type: "LOGIN", payload:user})
        navigate('/home')
      }).catch((error) => {
        // Handle Errors here.
        const errorMessage = error.message;
        console.log(errorMessage);
      }); 
  }

  function handleShowPwd() {
    setShowPwd(!showPwd)
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
      signIn(data.email, data.password)
      reset()
      })}
      >
  
      <Box sx={{
        mb: '2rem',
        placeSelf: 'start'
      }}>
      <Typography variant='h4'>Welcome back!</Typography>
      <Typography variant='subtitle2'>Enter to get unlimited access to data & information.</Typography>
      </Box>

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
>Sign In</Button>
<Divider sx={{
  width: '100%',
  my: 2,
  fontFamily: 'poppins',
  fontSize: '13px'
  }}>Or, Login with</Divider>
<Button 
variant='outlined'
fullWidth
sx={{
  p:1
}}
onClick={signInWithGoogle}
startIcon={
  <Icon
  sx={{
    width: '100%',
    height: '100%',
    fontSize: 0
  }}
  >
  <Box
    component='img'
    src={Google}
    width={20}
    height={20}
  />
    </Icon>
}
>Sign in With Google
</Button>

<Typography sx={{
  my: 2
}}>
Don't have an account? <Link href='/signup' underline='always'>Register here</Link>
</Typography>
    </Box>
  </Container>
  )
}
